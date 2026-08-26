import RTCPEvents from "./RTCPEvents.js";
import { EventType, type EventDetail } from './notifee';
declare const DEFAULTS: {
    /** Whether to connect to RTCP Staging or Production */
    production: boolean;
    /** If true, log actions to console.log */
    enableLogging: boolean;
    /** Remove all notifications from the OS's notification center when the app is opened. */
    clearOnStart: boolean;
    /** Time in milliseconds after which to run clearOnStart if enabled. */
    clearAfter: number;
    /** The name of the notification channel as is appears in Androids Notification Settings */
    channelName: string;
    /** Open URLs attached to the notification when the user opened the app by tapping the notification (uses Linking.openURL()). */
    openURL: boolean;
    /** Handle Deep Links when a user taps a notification with a Deep Link attached (i.e. emit 'url' event). */
    deepLinking: boolean;
    /** Automatically register with backend when push token has been received. */
    autoRegister: boolean;
    /** Request for notification permissions on initialization. If set to false you'll have to call requestNotificationPermissions() manually.*/
    requestPermissions: boolean;
};
type RTCPOptions = typeof DEFAULTS;
interface RTCP extends RTCPOptions {
}
type RTCPInitOptions = Partial<typeof DEFAULTS> & {
    /** The 16 characters hash string of your application in RTCP (mandatory) */
    appID: string;
};
declare class RTCP extends RTCPEvents {
    /** Prefix for log messages */
    readonly logPrefix: string;
    /** Supported event names */
    protected readonly _events: readonly string[];
    /** Device hardware ID */
    hardware_id: string;
    /** Push token */
    token?: string;
    /** Notification channel ID */
    channelId: string;
    /** Timer for removing notifications */
    _removeNotificationsTimer?: ReturnType<typeof setTimeout> | null;
    /** Firebase messaging instance */
    private readonly messaging;
    /** Get current app ID */
    appID(): string;
    log(...args: any[]): void;
    /**
     * Initialize the RTCP SDK
     * @param options - Configuration options (see README)
     */
    /**
     * Initialize the RTCP SDK
     * @param options - Configuration options (see README)
     */
    init(options: RTCPInitOptions): Promise<void>;
    /**
     * Mark notifications as read on the RTCP server
     * @param push_ids - A single push_id or an array of push_ids to mark as read
     */
    sendReadReceipt: (push_ids: string | string[]) => Promise<void>;
    /**
     * Fetch recent notifications from the RTCP server
     * @param count - Number of notifications to fetch (default: 10)
     * @returns An array of notifications
     */
    getRecentNotifications: (count?: number) => Promise<any[]>;
    /**
     * Delete a notification from the RTCP server
     * @param push_id - The push_id of the notification to delete
     */
    deleteNotification: (push_id: string) => Promise<void>;
    /**
     * Delete all notifications from the RTCP server
     */
    deleteAllNotifications: () => Promise<void>;
    /**
     * Register the device with the RTCP backend
     * @param app_id - Optional app ID to register for
     */
    registerDevice: (app_id?: string) => Promise<void>;
    /**
     * Unregister the device from the RTCP backend
     */
    unregisterDevice: (app_id?: string) => Promise<void>;
    /**
     * Request notification permissions from the user
     */
    requestNotificationPermissions: (rationale?: unknown) => Promise<void>;
    _onRTCPRegister: (token: string) => Promise<void>;
    _onRemoteNotification: (notification: Record<string, any>) => Promise<void>;
    _onLocalNotification: (type: EventType, detail: EventDetail) => Promise<void>;
    _handleAndroidNotification: (data: Record<string, any>) => Promise<void>;
    /**
     * Build a notification ID from push ID (for replace/revoke logic)
     */
    _buildNotificationID: (pushID: string) => string;
    /**
     * Convert legacy notification payloads to new format
     */
    _convertFromOld: (notification: Record<string, any>) => Record<string, any>;
    /**
     * Create notification channel on Android
     */
    _createChannel: () => Promise<void>;
}
declare const _default: RTCP;
export default _default;
//# sourceMappingURL=RTCP.d.ts.map