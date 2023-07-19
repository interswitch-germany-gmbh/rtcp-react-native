import RTCPApi from "./RTCPApi.js";
import RTCPEvents from "./RTCPEvents.js";

import PushNotification from "react-native-push-notification";
import DeviceInfo from "react-native-device-info";
import { Platform, AppState, Linking } from "react-native";
import DefaultPreference from "react-native-default-preference";

import { DeviceEventEmitter, PermissionsAndroid } from 'react-native';

import { version as SDK_VERSION } from "./package.json";

const DEVICE_TYPE_MAP = {
    Handset: "phone",
    Tablet: "tablet",
    Tv: "other",
    unknown: "other"
};

class RTCP extends RTCPEvents {
    logPrefix = "[RTCP]";
    debugLog = true;

    _events = ["onRemoteNotification", "onNotificationTapped", "onRegister", "onChangeAppID"];

    hardware_id = "";

    constructor() {
        super();
        Object.assign(this, PushNotification);
    }

    appID() { return RTCPApi.appID; }

    // custom logging - prepend module name in log output
    log() {
        if (RTCP.enableLogging) {
            Array.prototype.unshift.call(arguments, this.logPrefix || "[rtcp-react-native]");
            console.log.apply(this, arguments);
        }
    }

    async init(options) {
        // --- Module configuration ---

        // appID: string (mandatory)
        if (!options.appID) throw 'Unable to initialize RTCP! Mandatory parameter "appID" is missing in options!';
        RTCPApi.appID = options.appID;

        // enableLogging: boolean, default: true
        RTCP.enableLogging = typeof options.enableLogging !== "undefined" ? options.enableLogging : true;
        this.log("Initializing rtcp-react-native");
        RTCPApi.log = this.log;

        // production: boolean, default: false
        let production = typeof options.production !== "undefined" ? options.production : false;
        RTCPApi.baseUrl = production ? RTCPApi.RTCP_BASE_URL_PROD : RTCPApi.RTCP_BASE_URL_TEST;

        // autoRegister: boolean, default: true
        this.autoRegister = typeof options.autoRegister !== "undefined" ? options.autoRegister : true;

        // clearAfter: boolean, default: true
        this.clearAfter = typeof options.clearAfter !== "undefined" ? options.clearAfter : 2000;

        // openURL: boolean, default: true
        this.openURL = typeof options.openURL !== "undefined" ? options.openURL : true;

        // deepLinking: boolean, default: true
        this.deepLinking = typeof options.deepLinking !== "undefined" ? options.deepLinking : true;

        // requestPermission: boolean, default: true
        this.optionRequestPermissions = typeof options.requestPermissions !== "undefined" ? options.requestPermissions : true;

        // --- Initializations ---

        // initialize push notifications module
        // attention: this needs to happen before any blocking functions (await)
        this.configure({
            onRegister: (token) => {
                this._onRTCPRegister(token);
            },
            onNotification: (notification) => {
                this._onRTCPNotification(notification);
            },
            requestPermissions: false  // we'll do this later ourselves with Android >=13 compatibility
        });

        // create notification channel (required for Android)
        this.createChannel({
            channelId: "push-channel",
            channelName: typeof options.channelName !== "undefined" ? options.channelName : "Push Notifications",
            soundName: "default",
            importance: 4,
            vibrate: true
        });

        // get device id
        // not using 'getUniqueIdSync' for two reasons:
        // - it doesn't exist in react-native-device-info < 10.0
        // - it seems to break Chrome debugging (https://github.com/react-native-device-info/react-native-device-info/issues/776)
        this.hardware_id = await DeviceInfo.getUniqueId();

        // Android 13 introduced showing notifications as 'dangerous' permission that requires 'runtime permission'. Check for RN compatibility.
        if ((Platform.OS === "android" && DeviceInfo.getApiLevelSync() >= 33) && !PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) {
            throw 'Unable to initialize RTCP! Using API level >= 33 requires RN >= 0.70.7 for notifications to display.'
            + ' If you cannot update your RN version currently, check the README for a workaround.'
        }
        // requestPermission: boolean, default: true
        if (typeof options.requestPermissions !== "undefined" ? options.requestPermissions : true) {
            this.requestNotificationPermissions();
        }

        // clearOnStart: boolean, default: true
        if (typeof options.clearOnStart !== "undefined" ? options.clearOnStart : false) {
            AppState.addEventListener("change", (nextAppState) => {
                if (nextAppState === "active") {
                    this._removeNotificationsTimer = setTimeout(() => {
                        this.removeAllDeliveredNotifications();
                        this._removeNotificationsTimer = null;
                    }, this.clearAfter);
                } else if (this._removeNotificationsTimer) {
                    clearTimeout(this._removeNotificationsTimer);
                    this._removeNotificationsTimer = null;
                }
            });
        }

        // iOS only: store app and device info in UserDefaults for Notification Service Extension
        if (Platform.OS === "ios") {
            // initialize storage
            let appgroup = "group." + DeviceInfo.getBundleId() + ".rtcp"; // used for sharing settings with iOS Notification Service Extension
            await DefaultPreference.setName(appgroup);

            this.debugLog && this.log("Storing app parameters in UserDefaults, appgroup:", appgroup);
            await DefaultPreference.set("rtcp_base_url", RTCPApi.baseUrl);
            await DefaultPreference.set("rtcp_app_id", RTCPApi.appID);
            await DefaultPreference.set("rtcp_hardware_id", this.hardware_id);
        }
    }

    async sendReadReceipt(push_ids) {
        RTCPApi.updateNotificationRemoteStatus(this.hardware_id, push_ids, "read");
    }

    async getRecentNotifications(count = 10) {
        let notifications = await RTCPApi.getRecentNotifications(this.hardware_id, count);
        return notifications.map((item) => this._convertFromOld(item));
    }

    async deleteNotification(push_id) {
        RTCPApi.deleteNotification(this.hardware_id, push_id);
    }

    async registerDevice(app_id = undefined) {
        let oldAppID = RTCPApi.appID;
        if (app_id) RTCPApi.appID = app_id;  // change appID globally if provided
        let pref_key = "rtcp_device" + (app_id ? "_" + app_id : "");  // store individually for app_id if provided

        if (this.token) {
            // create device registration data
            let device = {
                hardware_id: this.hardware_id,
                push_token: this.token,
                platform_type: Platform.OS === "ios" ? "IosPlatform" : "AndroidPlatform",
                device_type: DEVICE_TYPE_MAP[DeviceInfo.getDeviceType()],
                api_version: "2",
                sdk_version: SDK_VERSION,
                tags: { app_version: DeviceInfo.getVersion() }
            };
            let deviceJson = JSON.stringify(device);

            // check if registration data has changed. if not, do not register again to reduce server load
            const registeredDevice = await DefaultPreference.get(pref_key);
            if (registeredDevice === null || registeredDevice !== deviceJson) {
                // send registration to RTCP
                if (await RTCPApi.registerDevice(device)) {
                    // store device data for later comparison
                    await DefaultPreference.set(pref_key, deviceJson);
                    this._emitEvent("onRegister", RTCPApi.appID);
                }
            } else {
                this.log("Device data and token are unchanged, not sending registration to RTCP Server" + (app_id ? " for appID " + app_id : ""));
            }
        } else {
            this.log("Token is unset, not sending registration.");
        }

        if (app_id && RTCPApi.appID !== oldAppID) this._emitEvent("onChangeAppID", RTCPApi.appID, oldAppID);
    }

    async unregisterDevice(app_id = undefined) {
        if (await RTCPApi.unregisterDevice({ hardware_id: this.hardware_id }, app_id)) {
            DefaultPreference.clear("rtcp_device" + (app_id ? "_" + app_id : ""));
        }
    }

    async requestNotificationPermissions(rationale = undefined) {
        if (Platform.OS === "android" && DeviceInfo.getApiLevelSync() >= 33) {
            try {
                if ((await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, rationale)) !== PermissionsAndroid.RESULTS.GRANTED) {
                    this.log("Permission to show notifications not granted!");
                } else {
                    this._requestPermissions();
                }
            } catch (err) {
                this.log("Error requesting for permission to show notifications.");
            }
        } else {
            this._requestPermissions();
        }
    }

    // --- private methods ---

    async _onRTCPRegister(token) {
        // get hardware_id in case register event occurred before initialization finished
        if (!this.hardware_id) this.hardware_id_id = await DeviceInfo.getUniqueId();
        this.log("Registered with FCM/APNs. hardware_id:", this.hardware_id, "token:", token.token);
        this.token = token.token;
        if (this.autoRegister) await this.registerDevice();
    }

    async _onRTCPNotification(notification) {
        // get hardware_id in case register event occurred before initialization finished
        if (!this.hardware_id) this.hardware_id_id = await DeviceInfo.getUniqueId();

        if (notification.userInteraction === false) {
            // received a remote notification
            if (notification.data.app_data) {
                // on android values are strings only, convert to objects
                if (typeof notification.data.app_data === "string") {
                    notification.data.app_data = JSON.parse(notification.data.app_data);
                }

                notification.data = this._convertFromOld(notification.data);
            }

            this.log("Received remote push notification: ", notification);

            // on Android create notification (on iOS notification is created by OS)
            if (Platform.OS === "android") {
                this._handleAndroidNotification(notification.data);
            }

            if (!(Platform.OS === "ios" && notification.message)) {
                // update notification's remote status to "received" (on iOS done in NSE, except for silent pushes)
                if (notification.data.push_id) RTCPApi.updateNotificationRemoteStatus(this.hardware_id, notification.data.push_id, "received", notification.data.app_id);
            }

            this._emitEvent("onRemoteNotification", notification);
        } else {
            // user tapped notification
            this.log("User tapped notification: ", notification);

            if (notification.data.push_id) RTCPApi.updateNotificationRemoteStatus(this.hardware_id, notification.data.push_id, "tapped", notification.data.app_id);

            this._emitEvent("onNotificationTapped", notification);

            if (this.deepLinking && notification.data.deeplink) {
                DeviceEventEmitter.emit('url', { url: notification.data.deeplink });
            }

            if (notification.data.url && this.openURL) {
                if (await Linking.canOpenURL(notification.data.url)) {
                    Linking.openURL(notification.data.url);
                }
            }
        }
    }

    _handleAndroidNotification(data) {
        if (data.revoke) {
            const id = this._buildNotificationID(data.revoke);
            if (id) this.removeDeliveredNotifications([id]);
        } else if (data.message) {  // only show notification if a message is available
            // native call freezes object for later use (e.g. callbacks), create a copy
            data = JSON.parse(JSON.stringify(data));

            this.localNotification({
                id: this._buildNotificationID(data.replace ? data.replace : data.push_id), // replace existing notification if requested
                channelId: "push-channel",
                title: data.title,
                message: data.message,
                userInfo: data, // "userInfo" will be in "data" when notification is tapped
                bigPictureUrl: data.media_url || null,
                largeIconUrl: data.large_icon_url || data.media_url || null,
                bigLargeIconUrl: data.big_large_icon_url || null
            });
        }
    }

    // --- helper functions ---

    _buildNotificationID(pushID) {
        if (pushID.startsWith("PW")) {
            return pushID.substring(2) + "2";
        } else if (pushID.startsWith("P")) {
            return pushID.substring(1) + "1";
        }
    }

    _convertFromOld(notification) {
        // remove title if it's the same as the message (old RTCP behaviour)
        if (notification.title && notification.title === notification.message) {
            notification.title = null;
        }

        if (notification.app_data) {
            // compatibility to old RTCP payload when push_id was in app_data
            if (notification.app_data.push_id) {
                if (!notification.push_id) notification.push_id = notification.app_data.push_id;
                delete notification.app_data.push_id;
            }

            // compatibility to old RTCP payload when url was in app_data
            if (notification.app_data.url) {
                if (!notification.url) notification.url = notification.app_data.url;
                delete notification.app_data.url;
            }
            if (Object.keys(notification.app_data).length === 0) notification.app_data = null; // set to null if empty for consistency with server inbox style
        }

        return notification;
    }
}

export default new RTCP();
