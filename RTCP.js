import RTCPApi from "./RTCPApi.js";
import RTCPEvents from "./RTCPEvents.js";

import PushNotification from "react-native-push-notification";
import DeviceInfo from "react-native-device-info";
import { Platform, AppState, Linking } from "react-native";
import DefaultPreference from "react-native-default-preference";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const SDK_VERSION = 2;

const DEVICE_TYPE_MAP = {
    'Handset': 'phone',
    'Tablet' : 'tablet',
    'Tv'     : 'other',
    'unknown': 'other'
};

class RTCP extends RTCPEvents {
    logPrefix = "[RTCP]";

    events = ["onRemoteNotification", "onNotificationTapped", "onRegister"];

    hardware_id = "";

    // custom logging - prepend module name in log output
    log() {
        if (RTCP.enableLogging) {
            Array.prototype.unshift.call(arguments, this.logPrefix || "[rtcp-react-native]");
            console.log.apply(this, arguments);
        }
    }

    async init(options) {
        // --- Module configuration ---

        // "appID": string (mandatory)
        if (!options.appID) throw 'Unable to initialize RTCP! Mandatory parameter "appID" is missing in options!';
        RTCPApi.appID = options.appID;

        // "enableLogging": boolean, default: true
        RTCP.enableLogging = typeof options.enableLogging !== "undefined" ? options.enableLogging : true;
        this.log("Initializing rtcp-react-native");
        RTCPApi.log = this.log;

        // "production": boolean, default: false
        let production = typeof options.production !== "undefined" ? options.production : false;
        RTCPApi.baseurl = production ? RTCPApi.RTCP_BASE_URL_PROD : RTCPApi.RTCP_BASE_URL_TEST;

        // "clearOnStart": boolean, default: true
        if (options.clearOnStart) {
            AppState.addEventListener("change", (nextAppState) => {
                if (nextAppState === "active") {
                    PushNotification.removeAllDeliveredNotifications();
                }
            });
        }

        // get device id
        this.hardware_id = DeviceInfo.getUniqueId();

        // create notification channel (required for Android)
        PushNotification.createChannel({
            channelId: "push-channel",
            channelName: typeof options.channelName !== "undefined" ? options.channelName : "Push Notifications",
            soundName: "default",
            importance: 4,
            vibrate: true
        });

        // initialize push notifications module
        PushNotification.configure({
            onRegister: (token) => {
                this._onRegister(token);
            },
            onNotification: (notification) => {
                this._onNotification(notification);
            }
        });

        // iOS only: store app and device info in UserDefaults for Notification Service Extension
        if (Platform.OS === "ios") {
            // initialize storage
            let appgroup = "group." + DeviceInfo.getBundleId() + ".rtcp";  // used for sharing settings with iOS Notification Service Extension
            await DefaultPreference.setName(appgroup);

            this.log("Storing app parameters in UserDefaults, appgroup:", appgroup);
            await DefaultPreference.set("rtcp_base_url", RTCPApi.baseUrl);
            await DefaultPreference.set("rtcp_app_id", RTCPApi.appID);
            await DefaultPreference.set("rtcp_hardware_id", this.hardware_id);
        }
    }

    async sendReadReceipt(push_ids) {
        RTCPApi.updateNotificationRemoteStatus(this.hardware_id, push_ids, "read");
    }

    async getRecentNotifications(count = 10) {
        return RTCPApi.getRecentNotifications(this.hardware_id, count);
    }

    // --- private methods ---

    async _onRegister(token) {
        this.log("Registered with FCM/APNs. hardware_id:", this.hardware_id, "token:", token.token);

        // check if token has changed. if not, do not register again to reduce server load
        const storedToken = await DefaultPreference.get("rtcp_push_token");
        if (storedToken === null || storedToken !== token.token) {
            // create device registration data
            let device = {
                hardware_id: this.hardware_id,
                push_token: token.token,
                platform_type: Platform.OS === "ios" ? "IosPlatform" : "AndroidPlatform",
                device_type: DEVICE_TYPE_MAP[DeviceInfo.getDeviceType()],
                api_version: "2",
                sdk_version: SDK_VERSION,
                tags: { app_version: DeviceInfo.getVersion() },
                // TODO: add more values (configurable)
            };

            // send registration to RTCP
            if (await RTCPApi.registerDevice(device)) {
                // store token for later comparison
                await DefaultPreference.set("rtcp_push_token", token.token);
                this._emitEvent("onRegister");
            }
        } else {
            this.log("Token is unchanged, not sending registration to RTCP Server");
        }
    }

    _onNotification(notification) {
        //this.log("_onNotification triggered with notification:", notification);

        // TODO: distinguish between iOS and Android and if triggered by tapping or not
        //if userInteraction

        if (notification.userInteraction === false) {
            // received a remote notification
            this.log("Received remote push notification: ", notification);

            // on android values are strings only, convert to objects
            if (typeof notification.data.app_data === "string") {
                notification.data.app_data = JSON.parse(notification.data.app_data);
            }

            // compatibility to old RTCP payload when push_id was in app_data
            if (notification.data.app_data?.push_id) {
                if (!notification.data.push_id) notification.data.push_id = notification.data.app_data.push_id;
                delete notification.data.app_data.push_id;
                if (Object.keys(notification.data.app_data).length === 0) notification.data.app_data == null; // set to null if empty for consistency with server inbox style
            }

            // on Android create notification (on iOS notification is created by OS)
            if (Platform.OS === "android") {
                this._handleAndroidNotification(notification.data);
            }

            this._emitEvent("onRemoteNotification", notification);

        } else {
            // user tapped notification
            this.log("User tapped notification: ", notification);
        }

        // TODO: provide callback
    }

    _handleAndroidNotification(data) {
        // only show notification if a message is available
        if (data.message) {

            if (data.revoke) {
                const id = this._intFromPushID(data.revoke);
                if (id) {
                    PushNotification.cancelLocalNotifications({ id: id });
                    return;
                }
            }

            // native call freezes object for later use (e.g. callbacks), create a copy
            data = JSON.parse(JSON.stringify(data));

            PushNotification.localNotification({
                id: this._intFromPushID(data.replace ? data.replace : data.push_id),  // replace existing notification if requested
                channelId: "push-channel",
                title: data.title && data.title !== data.message ? data.title : null,  // don't show a title if it's the same as the message (old RTCP behaviour)
                message: data.message,
                userInfo: data,  // "userInfo" will be in "data" when notification is tapped
                bigPictureUrl: data.media_url || null,
                largeIconUrl: data.large_icon_url || data.media_url || null,
                bigLargeIconUrl: data.big_large_icon_url || null
            });
        }

        // update notification's remote status to "received" (on iOS done in NSE)
        if (data.push_id)
            RTCPApi.updateNotificationRemoteStatus(this.hardware_id, data.push_id, "received");

    }

    // --- helper functions ---

    _intFromPushID(pushID) {
        if (pushID.startsWith("PW")) {
            return parseInt(pushID.substring(2) + "2");
        } else if (pushID.startsWith("P")) {
            return parseInt(pushID.substring(1) + "1");
        }
    }
}

export default new RTCP();