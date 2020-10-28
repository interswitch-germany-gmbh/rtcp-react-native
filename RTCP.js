import RTCPApi from "./RTCPApi.js";

import PushNotification from "react-native-push-notification";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import DefaultPreference from "react-native-default-preference";

// custom logging - prepend module name in log output
function log() {
    Array.prototype.unshift.call(arguments, "[rtcp-react-native] ");
    console.log.apply(this, arguments);
}
RTCPApi.log = log; // also use custom log for api module

class RTCP {
    async init(options) {
        log("Initializing rtcp-react-native");

        // module settings
        if (typeof options.appID === "undefined") {
            throw 'Unable to initialize RTCP! Mandatory parameter "appID" is missing in options!';
        }
        RTCPApi.appID = options.appID;

        let production = typeof options.production !== "undefined" ? options.production : false;
        RTCPApi.baseurl = production ? RTCPApi.RTCP_BASE_URL_PROD : RTCPApi.RTCP_BASE_URL_TEST;
        this.enableDeliveryReceipt = typeof options.enableDeliveryReceipt !== "undefined" ? options.enableDeliveryReceipt : true;

        // get device id
        this.hardware_id = DeviceInfo.getUniqueId();

        // initialize storage
        let appgroup = "group." + DeviceInfo.getBundleId() + ".rtcp";  // use this structure for sharing settings with iOS Notification Service Extension
        await DefaultPreference.setName(appgroup);
        
        // iOS only: store app and device info in UserDefaults for Notification Service Extension
        if (Platform.OS === "ios") {
            log("Storing app parameters in UserDefaults, appgroup:", appgroup);
            await DefaultPreference.set("rtcp_base_url", RTCPApi.baseUrl);
            await DefaultPreference.set("rtcp_app_id", RTCPApi.appID);
            await DefaultPreference.set("rtcp_hardware_id", this.hardware_id);
        }

        // initialize push notifications module
        PushNotification.configure({
            onRegister: (token) => {
                this._onRegister(token);
            },
            onNotification: (notification) => {
                this._onNotification(notification);
            },
        });

        // create notification channel (required for Android)
        PushNotification.createChannel({
            channelId: "push-channel",
            channelName: "Push Notifications",
            soundName: "default",
            importance: 4,
            vibrate: true,
        });
    }

    async _onRegister(token) {
        log("Registered with FCM/APNs. hardware_id:", this.hardware_id, "token:", token.token);

        // check if token has changed. if not, do not register again to reduce server load
        const storedToken = await DefaultPreference.get("rtcp_push_token");
        if (storedToken === null || storedToken !== token.token) {
            // create device registration data
            let device = {
                hardware_id: this.hardware_id,
                push_token: token.token,
                platform_type: Platform.OS === "ios" ? "IosPlatform" : "AndroidPlatform",
                device_type: "phone",
                api_version: "2", // TODO: make adjustable global constant
                // TODO: add more values (configurable)
            };

            // send registration to RTCP
            if (await RTCPApi.register(device)) {
                // store token for later comparison
                await DefaultPreference.set("rtcp_push_token", token.token);
            }
        } else {
            log("Token is unchanged, not sending registration to RTCP Server");
        }
    }

    async _onNotification(notification) {
        // TODO: distinguish between iOS and Android and if triggered by tapping or not

        // check if a valid notification has been received from RTCP
        var app_data = notification.data.app_data ? notification.data.app_data : {};
        // on android additional data seems to be present as String
        if (typeof app_data === "string") {
            app_data = JSON.parse(app_data);
        }

        if (app_data.push_id) {
            log("Received push notification: ", notification);

            // update notification's remote status to "received" if enabled
            if (this.enableDeliveryReceipt) RTCPApi.updateNotificationRemoteStatus(this.hardware_id, app_data.push_id, "received");

            // show notification if a message is available
            if (typeof notification.data.message === "string") {
                PushNotification.localNotification({
                    channelId: "push-channel",
                    title: notification.data.title || false,
                    message: notification.data.message,
                });
            }

            // TODO: provide callback
        } else {
            log('Received an invalid notification (missing "push_id"): ', notification);
        }
    }
}

export default new RTCP();