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

class RTCPApi {
    logPrefix: string = "[RTCP Api]";

    // constants
    readonly RTCP_BASE_URL_TEST: string = "https://rtcp-staging.vanso.com/api/";
    readonly RTCP_BASE_URL_PROD: string = "https://rtcp.vanso.com/api/";

    // add possibility to easily override console.log
    log(...args: any[]): void {
        console.log(...args);
    }

    baseUrl: string = this.RTCP_BASE_URL_TEST;
    appID: string = "";

    // register device with RTCP (devices/register_device)
    async registerDevice(device: RTCPDevice, app_id: string = this.appID): Promise<boolean> {
        try {
            this.log("Registering with RTCP Server, app_id:", app_id, "hardware_id:", device.hardware_id);
            const response = await fetch(this.baseUrl + "devices/register_device", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": app_id },
                body: JSON.stringify({ device: device })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw new Error("Received non-ok response from RTCP");
            }

            this.log("Successfully registered with RTCP Server");
            return true;
        } catch (error) {
            this.log("Error registering with RTCP:", error);
            return false;
        }
    }

    // unregister device from RTCP (devices/unregister_device)
    async unregisterDevice(device: RTCPDevice, app_id: string = this.appID): Promise<boolean> {
        try {
            this.log("Unregistering device from RTCP Server, app_id:", app_id, "hardware_id:", device.hardware_id);
            const response = await fetch(this.baseUrl + "devices/unregister_device", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": app_id },
                body: JSON.stringify({ device: device })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw new Error("Received non-ok response from RTCP");
            }

            this.log("Successfully unregistered device from RTCP Server");
            return true;
        } catch (error) {
            this.log("Error unregistering device from RTCP:", error);
            return false;
        }
    }

    // update remote status of notification (read_receipt/{received,tapped,read})
    async updateNotificationRemoteStatus(hardware_id: string, push_ids: string | string[], status: "received" | "read" | "tapped", app_id: string = this.appID): Promise<boolean> {
        if (!(["received", "read", "tapped"].includes(status))) return false;

        try {
            this.log('Updating remote status for notification with ID "' + push_ids + '" to', status);
            const response = await fetch(this.baseUrl + "read_receipt/" + status, {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": app_id },
                body: JSON.stringify({
                    hardware_id: hardware_id,
                    push_id: push_ids,
                    time: new Date().toISOString()
                })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw new Error("Received non-ok response from RTCP");
            }
            return true;
        } catch (error) {
            this.log("Error updating remote status:", error);
            return false;
        }
    }

    // get the most recent notifications from server
    async getRecentNotifications(hardware_id: string, count: number): Promise<any[]> {
        try {
            this.log("Getting recent notifications from RTCP Server");
            const response = await fetch(this.baseUrl + "notifications/recent", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": this.appID },
                body: JSON.stringify({
                    hardware_id: hardware_id,
                    count: count
                })
            });
            let res = await response.json();
            if (!response.ok || !res.processed) {
                throw new Error("Received non-ok response from RTCP");
            }
            return res.notifications || [];
        } catch (error) {
            this.log("Error getting recent notifications:", error);
            throw new Error("Error getting recent notifications:");
        }
    }

    async deleteNotification(hardware_id: string, push_id: string): Promise<boolean> {
        try {
            this.log('Deleting notification from server with ID ' + push_id);
            const response = await fetch(this.baseUrl + "notifications/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": this.appID },
                body: JSON.stringify({
                    hardware_id: hardware_id,
                    push_id: push_id
                })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw new Error("Received non-ok response from RTCP");
            }
            return true;
        } catch (error) {
            this.log("Error deleting notification from server:", error);
            return false;
        }
    }

    async deleteAllNotifications(hardware_id: string): Promise<boolean> {
        try {
            this.log('Deleting all notifications from server');
            const response = await fetch(this.baseUrl + "notifications/delete_all", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": this.appID },
                body: JSON.stringify({
                    hardware_id: hardware_id,
                })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw new Error("Received non-ok response from RTCP");
            }
            return true;
        } catch (error) {
            this.log("Error deleting notification from server:", error);
            return false;
        }
    }

    _statustextToJSONPayload(adData: any): any {
        try {
            adData.payload = JSON.parse(adData.statustext);
        } catch (e) {
            adData.payload = {};
        }
        return adData;
    }

    async getAdForZone(zone_id: number): Promise<{}> {
        if (!zone_id) return {};
        try {
            this.log('Getting Ad image data from server for zone ' + zone_id);
            const response = await fetch(this.baseUrl + "ads/ajson.php?zoneid=" + zone_id);
            let res = await response.json();
            if (!response.ok) {
                throw new Error("Received non-ok response from RTCP");
            }
            return this._statustextToJSONPayload(res || {});
        } catch (error) {
            this.log("Error getting ad image data:", error);
            return {};
        }
    }

    async getAllAdsForZone(zone_id: number): Promise<any[]> {
        if (!zone_id) return [];
        try {
            this.log('Getting Ad images data from server for zone ' + zone_id);
            const response = await fetch(this.baseUrl + "ads/ajson_all.php?zoneid=" + zone_id);
            let res = await response.json();
            if (!response.ok) {
                throw new Error("Received non-ok response from RTCP");
            }
            return Array.isArray(res) ? res.map((ad) => this._statustextToJSONPayload(ad)) : []
        } catch (error) {
            this.log("Error getting all ad images data:", error);
            return [];
        }
    }
}

export default new RTCPApi();
