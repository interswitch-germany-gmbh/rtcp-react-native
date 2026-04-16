interface RTCPDevice {
    hardware_id: string;
    push_token?: string;
    platform_type?: "IosPlatform" | "AndroidPlatform";
    device_type?: string;
    api_version?: string;
    sdk_version?: string;
    tags?: {
        app_version?: string;
        [key: string]: any;
    };
    [key: string]: any;
}
declare class RTCPApi {
    logPrefix: string;
    readonly RTCP_BASE_URL_TEST: string;
    readonly RTCP_BASE_URL_PROD: string;
    log(...args: any[]): void;
    baseUrl: string;
    appID: string;
    registerDevice(device: RTCPDevice, app_id?: string): Promise<boolean>;
    unregisterDevice(device: RTCPDevice, app_id?: string): Promise<boolean>;
    updateNotificationRemoteStatus(hardware_id: string, push_ids: string | string[], status: "received" | "read" | "tapped", app_id?: string): Promise<boolean>;
    getRecentNotifications(hardware_id: string, count: number): Promise<any[]>;
    deleteNotification(hardware_id: string, push_id: string): Promise<boolean>;
    deleteAllNotifications(hardware_id: string): Promise<boolean>;
    _statustextToJSONPayload(adData: any): any;
    getAdForZone(zone_id: number): Promise<{}>;
    getAllAdsForZone(zone_id: number): Promise<any[]>;
}
declare const _default: RTCPApi;
export default _default;
//# sourceMappingURL=RTCPApi.d.ts.map