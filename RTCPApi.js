class RTCPApi {
    // constants
    RTCP_BASE_URL_TEST = "https://rtcp-staging.vanso.com/api/";
    RTCP_BASE_URL_PROD = "https://rtcp.vanso.com/api/";

    // add possibility to easily override console.log
    log() {
        console.log(...arguments);
    }

    baseUrl = this.RTCP_BASE_URL_TEST;
    appID = "";

    // register device with RTCP (devices/register_device)
    async register(device) {
        try {
            this.log("Registering with RTCP Server, hardware_id:", device.hardware_id);
            const response = await fetch(this.baseUrl + "devices/register_device", {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": this.appID },
                body: JSON.stringify({ device: device })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw "Received non-ok response from RTCP";
            }

            this.log("Successfully registered with RTCP Server");
            return true;
        } catch (error) {
            this.log("Error registering with RTCP:", error);
            return false;
        }
    }

    // update remote status of notification (read_receipt/{received,read})
    async updateNotificationRemoteStatus(hardware_id, push_ids, status) {
        if (!(status === "received" || status === "read")) return;

        try {
            this.log('Updating remote status for notification with ID "' + push_ids + '" to', status);
            const response = await fetch(this.baseUrl + "read_receipt/" + status, {
                method: "POST",
                headers: { "Content-Type": "application/json", "AUTH-APP-ID": this.appID },
                body: JSON.stringify({
                    hardware_id: hardware_id,
                    push_id: push_ids,
                    time: new Date().toISOString()
                })
            });
            if (!response.ok || !(await response.json()).processed) {
                throw "Received non-ok response from RTCP";
            }
            return true;
        } catch (error) {
            this.log("Error updating remote status: ", error);
            return false;
        }
    }
}

export default new RTCPApi();