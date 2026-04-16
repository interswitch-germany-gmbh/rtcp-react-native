import React from "react";
interface InboxNotification {
    push_id: string;
    read: boolean;
    time?: string;
    title?: string;
    message?: string;
    url?: string;
    image?: string;
    [key: string]: unknown;
}
interface NotificationStyles {
    notificationWrapper?: object;
    notification?: object;
    notificationUnread?: object;
    header?: object;
    headerUnread?: object;
    title?: object;
    titleUnread?: object;
    message?: object;
    messageUnread?: object;
    image?: object;
    fsImage?: object;
    link?: object;
    hiddenItem?: object;
    deleteView?: object;
    deleteText?: object;
}
export interface RTCPInboxNotificationHandle {
    collapse: () => void;
    registerCollapseEnd: (func: () => void) => void;
}
interface RTCPInboxNotificationProps {
    item: InboxNotification;
    headerText?: (item: InboxNotification) => string;
    onLinkOpen?: (url: string) => void;
    onCollapseEnd?: () => void;
    styles?: NotificationStyles;
    renderFsImage?: (item: InboxNotification, close: () => void) => React.ReactElement;
}
export declare const RTCPInboxNotification: React.ForwardRefExoticComponent<RTCPInboxNotificationProps & React.RefAttributes<RTCPInboxNotificationHandle>>;
interface RTCPInboxNotificationBackProps {
    styles?: NotificationStyles;
    row: {
        item: InboxNotification;
    };
    rowMap?: unknown;
    onDelete?: (pushId: string) => void;
    renderDeleteItem?: React.ReactElement;
}
export declare function RTCPInboxNotificationBack({ styles, row, onDelete, renderDeleteItem }: RTCPInboxNotificationBackProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RTCPInboxNotification.d.ts.map