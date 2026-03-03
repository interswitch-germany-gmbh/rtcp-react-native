import RTCPApi from "./RTCPApi.js";
import RTCPEvents from "./RTCPEvents.js";

import { getAPNSToken, getMessaging, onMessage, setBackgroundMessageHandler, getToken, Messaging } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType, type EventDetail } from '@notifee/react-native';
import DeviceInfo from "react-native-device-info";
import { Platform, AppState, Linking } from "react-native";
import DefaultPreference from "react-native-default-preference";

import { DeviceEventEmitter, PermissionsAndroid } from 'react-native';

import { version as SDK_VERSION } from "./package.json";

const DEFAULTS = {
    /** Whether to connect to RTCP Staging or Production */
    production: false,

    /** If true, log actions to console.log */
    enableLogging: true,

    /** Remove all notifications from the OS's notification center when the app is opened. */
    clearOnStart: false,

    /** Time in milliseconds after which to run clearOnStart if enabled. */
    clearAfter: 2000,

    /** The name of the notification channel as is appears in Androids Notification Settings */
    channelName: 'Push Notifications',

    /** Open URLs attached to the notification when the user opened the app by tapping the notification (uses Linking.openURL()). */
    openURL: true,

    /** Handle Deep Links when a user taps a notification with a Deep Link attached (i.e. emit 'url' event). */
    deepLinking: true,

    /** Automatically register with backend when push token has been received. */
    autoRegister: true,

    /** Request for notification permissions on initialization. If set to false you'll have to call requestNotificationPermissions() manually.*/
    requestPermissions: true,
}
// assign options to RTCP class
type RTCPOptions = typeof DEFAULTS;
interface RTCP extends RTCPOptions {}

type RTCPInitOptions = Partial<typeof DEFAULTS> & {
    // /** The 16 characters hash string of your application in RTCP (mandatory) */
    appID: string;
}

// Device type mapping for registration
const DEVICE_TYPE_MAP: Record<string, string> = {
    Handset: "phone",
    Tablet: "tablet",
    Tv: "other",
    unknown: "other"
};

class RTCP extends RTCPEvents {
    logPrefix = "[RTCP]";

    // Supported event names
    protected readonly _events = ["onRemoteNotification", "onNotificationTapped", "onRegister", "onChangeAppID"] as const;

    hardware_id = "";
    token?: string;
    channelId: string = '';
    _removeNotificationsTimer?: any;

    private messaging: Messaging = getMessaging();

    appID() { return RTCPApi.appID; }

    // Custom logging - prepend module name in log output
    // TODO: this.logPrefix always refers to RTCP, even in RTCPApi.
    log(...args: any[]) {
        if (this.enableLogging) {
            args.unshift(this.logPrefix || "[rtcp-react-native]");
            console.log(...args);
        }
    }

    /**
     * Initialize the RTCP SDK
     * @param options - Configuration options (see README)
     */
    async init(options: RTCPInitOptions): Promise<void> {
        // --- Module configuration ---

        // appID: string (mandatory)
        if (!options.appID) throw 'Unable to initialize RTCP! Mandatory parameter "appID" is missing in options!';
        RTCPApi.appID = options.appID;

        // set provided options as class properties or use default value
        Object.keys(DEFAULTS).forEach(k => {
            const option = k as keyof typeof DEFAULTS;
            (this as any)[option] = options[option] ?? DEFAULTS[option]
        });

        this.log("Initializing rtcp-react-native");
        RTCPApi.log = this.log.bind(this);
        RTCPApi.baseUrl = options.production ? RTCPApi.RTCP_BASE_URL_PROD : RTCPApi.RTCP_BASE_URL_TEST;

        // --- Initializations ---

        // the very first thing: register background message handler to ensure we can receive messages in the background when the app is killed
        setBackgroundMessageHandler(this.messaging, this._onRTCPNotification);
        onMessage(this.messaging, this._onRTCPNotification);

        // request notification permissions if enabled
        if (this.requestPermissions) {
            await notifee.requestPermission();
        }

        // get push token and register device with RTCP
        if (Platform.OS === "android") {
            getToken(this.messaging)
                .then((token: string) => { this._onRTCPRegister(token); })
                .catch((err: Error) => { this.log("Failed to get FCM token", err); });
        } else if (Platform.OS === "ios") {
            getAPNSToken(this.messaging)
                .then((token) => {
                    if (!token) throw new Error("APNs token is null");
                    this._onRTCPRegister(token);
                })
                .catch((err: Error) => { this.log("Failed to get APNs token", err); });
        }

        notifee.onBackgroundEvent(async ({ type, detail }) => {
            // PRESS: User tapped notification
            if (type === EventType.PRESS) {
                await this._onRTCPNotification({ ...detail.notification, userInteraction: true });
            }
        });

        // create notification channel (required for Android)
        this._createChannel();

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

        // clear notifications when app becomes active if enabled
        if (this.clearOnStart) {
            AppState.addEventListener("change", (nextAppState) => {
                if (nextAppState === "active") {
                    this._removeNotificationsTimer = setTimeout(() => {
                        notifee.cancelDisplayedNotifications();
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
            await DefaultPreference.set("rtcp_base_url", RTCPApi.baseUrl);
            await DefaultPreference.set("rtcp_app_id", RTCPApi.appID);
            await DefaultPreference.set("rtcp_hardware_id", this.hardware_id);
        }

        // Listen for Notifee foreground events (currently only PRESS)
        notifee.onForegroundEvent(({ type, detail }: { type: EventType; detail: EventDetail }) => {
            if (type === EventType.PRESS) {
                this._onRTCPNotification({ ...detail.notification, userInteraction: true });
            }
        });
    }

    /**
     * Mark notifications as read on the RTCP server
     * @param push_ids - A single push_id or an array of push_ids to mark as read
     */
    sendReadReceipt = async (push_ids: string | string[]): Promise<void> => {
        RTCPApi.updateNotificationRemoteStatus(this.hardware_id, push_ids, "read");
    }

    /**
     * Fetch recent notifications from the RTCP server
     * @param count - Number of notifications to fetch (default: 10)
     * @returns An array of notifications
     */
    getRecentNotifications = async (count: number = 10): Promise<any[]> => {
        let notifications = await RTCPApi.getRecentNotifications(this.hardware_id, count);
        return notifications.map((item: any) => this._convertFromOld(item));
    }

    /**
     * Delete a notification from the RTCP server
     * @param push_id - The push_id of the notification to delete
     */
    deleteNotification = async (push_id: string): Promise<void> => {
        RTCPApi.deleteNotification(this.hardware_id, push_id);
    }

    /**
     * Delete all notifications from the RTCP server
     */
    deleteAllNotifications = async (): Promise<void> => {
        RTCPApi.deleteAllNotifications(this.hardware_id);
    }

    /**
     * Register the device with the RTCP backend
     * @param app_id - Optional app ID to register for
     */
    registerDevice = async (app_id?: string): Promise<void> => {
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

    /**
     * Unregister the device from the RTCP backend
     */
    unregisterDevice = async (app_id?: string): Promise<void> => {
        if (await RTCPApi.unregisterDevice({ hardware_id: this.hardware_id }, app_id)) {
            DefaultPreference.clear("rtcp_device" + (app_id ? "_" + app_id : ""));
        }
    }

    /**
     * Request notification permissions from the user
     */
    requestNotificationPermissions = async (rationale?: any): Promise<void> => {
        await notifee.requestPermission();
    }

    // --- private methods ---

    _onRTCPRegister = async (token: string): Promise<void> => {
        // get hardware_id in case register event occurred before initialization finished
        if (!this.hardware_id) this.hardware_id = await DeviceInfo.getUniqueId();
        this.log("Registered with FCM/APNs. hardware_id:", this.hardware_id, "token:", token);
        this.token = token;
        if (this.autoRegister) await this.registerDevice();
    }

    _onRTCPNotification = async (notification: any): Promise<void> => {
        // TODO: check notification format on iOS

        // get hardware_id in case register event occurred before initialization finished
        if (!this.hardware_id) this.hardware_id = await DeviceInfo.getUniqueId();

        if (!notification.userInteraction) {
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

    _handleAndroidNotification = async (data: any): Promise<void> => {
        // we need to run and wait for this, for when the app is awoken from killed, or displayNotification will be called too soon and not work
        await this._createChannel();

        if (data.revoke) {
            const id = this._buildNotificationID(data.revoke);
            if (id) await notifee.cancelNotification(id);
        } else if (data.message) {  // only show notification if a message is available
            // Notifee data values must be strings, convert if necessary
            const notifeeData: Record<string, string> = {};
            for (const [key, value] of Object.entries(data)) {
                if (value !== null) {  // discard null values
                    notifeeData[key] = typeof value === 'string' ? value : JSON.stringify(value);
                }
            }
            await notifee.displayNotification({
                id: this._buildNotificationID(data.replace ? data.replace : data.push_id), // replace existing notification if requested
                title: data.title,
                body: data.message,
                android: {
                    channelId: this.channelId,
                    pressAction: { id: "default" },
                    // TODO: add media
                },
                data: notifeeData
            });
        }
    }

    /**
     * Build a notification ID from push ID (for replace/revoke logic)
     */
    _buildNotificationID = (pushID: string): string | "" => {
        if (!pushID) return "";
        if (pushID.startsWith("PW")) {
            return pushID.substring(2) + "2";
        } else if (pushID.startsWith("P")) {
            return pushID.substring(1) + "1";
        }
        return pushID;
    }

    /**
     * Convert legacy notification payloads to new format
     */
    _convertFromOld = (notification: any): any => {
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

    /**
     * Create notification channel on Android
     */
    _createChannel = async () => {
        this.channelId = await notifee.createChannel({
            id: "push-channel",
            name: this.channelName,
            sound: "default",
            importance: AndroidImportance.HIGH,
            vibration: true
        });
    }
}

export default new RTCP();
