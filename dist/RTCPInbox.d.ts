import RTCP from "./RTCP.js";
import RTCPEvents from "./RTCPEvents.js";
interface Notification {
    push_id: string;
    read: boolean;
    time?: string;
    message?: string;
    not_in_inbox?: boolean;
    revoke?: string;
    replace?: string;
    app_id?: string;
    [key: string]: unknown;
}
interface InboxOptions {
    enableBadge?: boolean;
    inboxSize?: number;
    syncOnAppstart?: boolean;
}
declare class RTCPInbox extends RTCPEvents {
    logPrefix: string;
    log: typeof RTCP.log;
    private _inbox;
    private _inboxReady;
    private _lastInboxSync;
    private _readReceiptQueue;
    private _readReceiptTimer;
    protected _events: string[];
    enableBadge: boolean;
    inboxSize: number;
    syncOnAppstart: boolean;
    private appStateChangeEventSubscription;
    init(options?: InboxOptions): Promise<void>;
    syncInbox(force?: boolean): Promise<void>;
    getInbox(): Notification[];
    getUnreadCount(): number;
    setRead(index: number): void;
    delete(index: number): void;
    deleteAll(): void;
    private _onRemoteNotification;
    private _loadInboxFromStorage;
    private _writeInboxToStorage;
    private _startReadReceiptTimer;
    private _sendReceiptsOnAppClose;
}
declare const _default: RTCPInbox;
export default _default;
//# sourceMappingURL=RTCPInbox.d.ts.map