import RTCP from "./RTCP";
import RTCPEvents from "./RTCPEvents.js";

import { Platform, AppState } from "react-native";

import PushNotification from "react-native-push-notification";
import DefaultPreference from "react-native-default-preference";

const DEFAULTINBOXSIZE = 25; // default size for inbox
const SYNCTIMEOUT = 10; // time to wait before allowing next server sync, in seconds
const READRECEIPTWAITTIME = 5000; // time to wait before sending queued read receipts, in milliseconds

class RTCPInbox extends RTCPEvents {
    logPrefix = "[RTCP Inbox]"; // string to append to log
    log = RTCP.log; // use logger of main module

    _inbox = []; // initialize empty inbox
    _inboxReady = false; // to be able to wait for inbox to be loaded on app start
    _lastInboxSync = new Date(0); // timestamp of last inbox sync with server

    _readReceiptQueue = []; // array of push_ids to send read receipt to server for
    _readReceiptTimer = null; // reference to timer object

    _events = ["onInboxUpdate"]; // list of subscribable events

    async init(options) {
        this.log("Initializing rtcp-react-native Inbox module");

        // --- Module configuration ---

        // enableBadge
        this.enableBadge = typeof options.enableBadge !== "undefined" ? options.enableBadge : true;
        if (Platform.OS === "ios") await DefaultPreference.set("rtcp_enable_badge", this.enableBadge.toString()); // store in userdefaults for NSE

        // update badge and write inbox to storage on changes
        if (this.enableBadge) this.registerEventHandler("onInboxUpdate", (inbox, fromStorage) => {
          PushNotification.setApplicationIconBadgeNumber(this.getUnreadCount());
          if (!fromStorage) this._writeInboxToStorage(); // don't write to storage if it has just been loaded from
        });

        // inboxSize
        this.inboxSize = typeof options.inboxSize !== "undefined" ? options.inboxSize : DEFAULTINBOXSIZE;
        if (Platform.OS === "ios") await DefaultPreference.set("rtcp_inbox_size", this.inboxSize.toString()); // store in userdefaults for NSE

        // syncOnAppstart
        this.syncOnAppstart = typeof options.syncOnAppstart !== "undefined" ? options.syncOnAppstart : false;
        if (this.syncOnAppstart) {
            this.syncInbox().catch(() => {});

            AppState.addEventListener("change", (nextAppState) => {
                if (nextAppState === "active") this.syncInbox().catch(() => {});
            });
        } else {
            this._loadInboxFromStorage();

            // on iOS load inbox from storage on every appstart to sync possible changes made by NSE
            if (Platform.OS === "ios") {
                AppState.addEventListener("change", (nextAppState) => {
                    if (nextAppState === "active") this._loadInboxFromStorage();
                });
            }
        }


        // --- Initializations ---
        RTCP.registerEventHandler("onRemoteNotification", (notification) => this._onRemoteNotification(notification));
        RTCP.registerEventHandler("onChangeAppID", () => this._loadInboxFromStorage());
    }

    async syncInbox(force = false) {
        if (force || new Date() - this._lastInboxSync > SYNCTIMEOUT * 1000) {

            // send outstanding read receipts to server before syncing inbox
            if (this._readReceiptQueue.length != 0) {
                this._startReadReceiptTimer(0);
                let tenthsOfSecond = 0;
                while (this._readReceiptQueue.length != 0 || tenthsOfSecond <= 10) {  // wait max of 1 second for read receipt queue to clear
                    await new Promise(resolve => setTimeout(resolve, 100));
                    tenthsOfSecond++;
                }
            }

            this._inbox = (await RTCP.getRecentNotifications(this.inboxSize)) || this._inbox; // get inbox from server, throws on error
            this._lastInboxSync = new Date(); // note sync time
            this._inboxReady = true;
            this._emitEvent("onInboxUpdate", this._inbox); // emit update event
        } else {
            this.log("Time since last sync too short. Not syncing Inbox with server");
        }
    }

    getInbox() {
        return this._inbox;
    }

    getUnreadCount() {
        return this._inbox.filter((notification) => notification["read"] === false).length; // return number of unread notifications
    }

    setRead(index) {
        if (this._inbox[index] && this._inbox[index]["read"] === false) {
            this._inbox[index]["read"] = true;

            // queue up read receipts to reduce server requests and load
            this._readReceiptQueue.indexOf(this._inbox[index]["push_id"]) === -1 && this._readReceiptQueue.push(this._inbox[index]["push_id"]);
            this._startReadReceiptTimer(READRECEIPTWAITTIME);

            this._emitEvent("onInboxUpdate", this._inbox);
        }
    }

    delete(index) {
        if (this._inbox[index]) {
            RTCP.deleteNotification(this._inbox[index]["push_id"]);
            this._inbox.splice(index, 1);
            this._emitEvent("onInboxUpdate", this._inbox);
        }
    }

    deleteAll() {
        if (this._inbox.length > 0) {
            RTCP.deleteAllNotifications();
            this._inbox = [];
            this._emitEvent("onInboxUpdate", this._inbox);
        }
    }

    // --- private methods ---

    async _onRemoteNotification(notification) {
        // on Android manage inbox on incoming message
        if (Platform.OS === "android") {
            let count = 0;
            while (!this._inboxReady && count++ < 5) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
            let data = notification.data;

            let isForeignInbox = (data.app_id && data.app_id != RTCP.appID());
            let inbox = isForeignInbox ? (JSON.parse(await DefaultPreference.get("rtcp_inbox_" + data.app_id)) || []) : this._inbox;

            if (data.revoke || (data.message && !data.not_in_inbox)) {
                // received a new notification. add it to inbox
                data.time = data.time || new Date().toISOString();
                data.read = false;

                if (data.revoke) {
                    let index = inbox.findIndex((notification) => notification.push_id === data.revoke);
                    if (index >= 0) {
                        this.log("Removing inbox item:", inbox[index]);
                        inbox.splice(index, 1);
                    } else {
                        this.log("Notification to be revoked not found in inbox:", data.revoke);
                        return;
                    }
                } else if (data.replace) {
                    let index = inbox.findIndex((notification) => notification.push_id === data.replace);
                    if (index >= 0) {
                        this.log("Replacing inbox item:", inbox[index], "with:", data);
                        inbox[index] = data;
                    } else {
                        this.log("Notification to be replaced not found in inbox:", data.replace);
                        return;
                    }
                } else {
                    this.log("Adding new notification to inbox:", data);
                    inbox.unshift(data);
                    if (inbox.length > this.inboxSize) inbox.length = this.inboxSize; // limit inbox to max size
                }
                if (isForeignInbox) await DefaultPreference.set("rtcp_inbox_" + data.app_id, JSON.stringify(inbox));
                else this._emitEvent("onInboxUpdate", this._inbox);
            }
        }

        // on iOS inbox is managed by NSE on incoming message, load changes.
        if (Platform.OS === "ios" && notification.foreground) {
            this._loadInboxFromStorage();
        }
    }

    async _loadInboxFromStorage() {
        RTCP.debugLog && this.log("Loading Inbox from storage");

        // get inbox and last sync time from storage
        inboxString = await DefaultPreference.get("rtcp_inbox_" + RTCP.appID());
        if (inboxString) {
            this._inbox = JSON.parse(inboxString);
            this._lastInboxSync = new Date(await DefaultPreference.get("rtcp_last_inbox_sync_" + RTCP.appID()));
            this._inboxReady = true;
            this._emitEvent("onInboxUpdate", this._inbox, true);
        } else {
            // inbox storage has not been initialized yet. Get messages from server in case this is a re-install or a new inbox
            this.syncInbox().catch(() => {});
        }
    }

    async _writeInboxToStorage() {
        RTCP.debugLog && this.log("Writing Inbox to storage");

        await DefaultPreference.set("rtcp_last_inbox_sync_" + RTCP.appID(), this._lastInboxSync.toISOString());
        await DefaultPreference.set("rtcp_inbox_" + RTCP.appID(), JSON.stringify(this._inbox));
    }

    _startReadReceiptTimer(delay) {
        // stop existing timer
        if (this._readReceiptTimer != null) {
            clearTimeout(this._readReceiptTimer);
            this._readReceiptTimer = null;
            if (AppState.removeEventListener) AppState.removeEventListener("change", this._sendReceiptsOnAppClose);  // RN <=0.64 compatibility
            else this.appStateChangeEventSubscription?.remove();
        }

        // start new timer
        this._readReceiptTimer = setTimeout(async () => {
            await RTCP.sendReadReceipt(this._readReceiptQueue);
            this._readReceiptQueue = [];
            this._readReceiptTimer = null;
            if (AppState.removeEventListener) AppState.removeEventListener("change", this._sendReceiptsOnAppClose);  // RN <=0.64 compatibility
            else this.appStateChangeEventSubscription?.remove();
        }, delay);

        if (delay > 0) {
            this.appStateChangeEventSubscription = AppState.addEventListener("change", this._sendReceiptsOnAppClose);
        }
    }

    _sendReceiptsOnAppClose = (nextAppState) => {
        if (nextAppState !== "active") {
            // send out immediately when app goes inactive
            this._startReadReceiptTimer(0);
        }
    };
}

export default new RTCPInbox();
