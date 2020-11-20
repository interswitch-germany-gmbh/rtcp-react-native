import RTCP from './RTCP';
import RTCPEvents from "./RTCPEvents.js";

import { Platform, AppState } from "react-native";

import PushNotification from "react-native-push-notification";
import DefaultPreference from "react-native-default-preference";


class RTCPInbox extends RTCPEvents {
    logPrefix = "[RTCP Inbox]";
    log = RTCP.log;

    inbox = [];
    lastInboxSync = null;
    syncTimeout = 10;  // seconds

    events = ["onInboxUpdate"];

    async init(options) {
        this.log("Initializing rtcp-react-native Inbox module");

        // --- Module configuration ---

        this.enableBadge = typeof options.enableBadge !== "undefined" ? options.enableBadge : true;
        if (Platform.OS === "ios") {
            await DefaultPreference.set("rtcp_enable_badge", this.enableBadge.toString());  // store in userdefaults for Native Service Extension
        }
        this.registerEventHandler("onInboxUpdate", () => this._updateBadge());

        this.inboxSize = typeof options.inboxSize !== "undefined" ? options.inboxSize : 25;
        if (Platform.OS === "ios") {
            await DefaultPreference.set("rtcp_inbox_size", this.inboxSize.toString());  // store in userdefaults for Native Service Extension
        }

        // on android update inbox on incoming remote notifications (on iOS done by NSE)
        if (Platform.OS === "android") {
            RTCP.registerEventHandler("onAndroidRemoteNotification", this._onRemoteNotification);
        }

        this.syncOnAppstart = typeof options.syncOnAppstart !== "undefined" ? options.syncOnAppstart : false;
        if (this.syncOnAppstart) { 
            AppState.addEventListener("change", (nextAppState) => {
                if (nextAppState === "active") {
                    this._syncInbox();
                }
            });
            this._syncInbox();
        } else {
            // iOS: load inbox from storage on every appstart to sync changes made by Notification Service Extension
            if (Platform.OS === "ios") {
                AppState.addEventListener("change", (nextAppState) => {
                    if (nextAppState === "active") {
                        this._loadInboxFromStorage();
                    }
                });
                this._loadInboxFromStorage();
            }
        }

    }

    async getInbox(sync = false) {
        await _syncInbox(sync);
        return this.inbox;
    }

    getUnreadCount() {
        return this.inbox.filter(notification => notification["read"] === false).length
    }

    // --- private methods ---

    _onAndroidRemoteNotification(notification) {
        let data = notification.data;

        if (data.revoke || (data.message && !data.not_in_inbox)) {
            // received a new notification. add it to inbox
            data.time = data.time || new Date().toISOString();
            data.read = false;

            if (data.revoke) {
                let index = this.inbox.findIndex((notification) => notification.push_id === data.revoke);
                if (index >= 0) {
                    this.log("Removing inbox item:", this.inbox[index]);
                    this.inbox.splice(index, 1);
                } else {
                    this.log("Notification to be revoked not found in inbox:", data.revoke);
                    return;
                }
            } else if (data.replace) {
                let index = this.inbox.findIndex((notification) => notification.push_id === data.replace);
                if (index >= 0) {
                    this.log("Replacing inbox item:", this.inbox[index], "with:", data);
                    this.inbox[index] = data;
                } else {
                    this.log("Notification to be replaced not found in inbox:", data.replace);
                    return;
                }
            } else {
                this.log("Adding new notification to inbox:", data);
                this.inbox.unshift(data);
                // ensure array doesn't exceed its max size
                if (this.inbox.length > this.inboxSize) this.inbox.length = this.inboxSize;
            }
        }
    }

    async _syncInbox(force = false) {
        if (force || new Date() - this.lastInboxSync > this.syncTimeout * 1000) {
            this.lastInboxSync = new Date();

            // get inbox from server
            this.inbox = await RTCP.getRecentNotifications(RTCP.hardware_id, this.inboxSize);

            // store inbox and sync time
            DefaultPreference.set("rtcp_last_inbox_sync", this.lastInboxSync.toISOString());
            DefaultPreference.set("rtcp_inbox", JSON.stringify(this.inbox));

            this._emitEvent("onInboxUpdate");
        }
        else {
            this.log("Time too short. Not syncing Inbox with server");
        }
    }

    async _loadInboxFromStorage() {
        this.log("Loading Inbox from storage");
        // get inbox and last sync time from storage
        this.inbox = JSON.parse(await DefaultPreference.get("rtcp_inbox") || "[]");
        this.lastInboxSync = new Date(await DefaultPreference.get("rtcp_last_inbox_sync"));

        this._emitEvent("onInboxUpdate");
    }

    _updateBadge() {
        if (this.enableBadge) {
            PushNotification.setApplicationIconBadgeNumber(this.getUnreadCount());
        }
    }
}

export default new RTCPInbox();