import React from "react";
import { RefreshControlProps } from "react-native";
import { RTCPInboxNotification, RTCPInboxNotificationBack, RTCPInboxNotificationHandle } from './RTCPInboxNotification';
interface InboxNotification {
    push_id: string;
    read: boolean;
    [key: string]: unknown;
}
type RTCPInboxNotificationRef = RTCPInboxNotificationHandle;
interface RTCPInboxListProps {
    disableDelete?: boolean;
    onSyncError?: () => void;
    renderItem?: (item: InboxNotification, registerRef: (ref: RTCPInboxNotificationRef) => void) => React.ReactElement;
    renderFsImage?: (item: InboxNotification, close: () => void) => React.ReactElement;
    renderDeleteItem?: React.ReactElement;
    refreshControlProps?: Partial<RefreshControlProps>;
    ItemSeparatorComponent?: React.ComponentType;
    styles?: Record<string, unknown>;
    headerText?: (item: InboxNotification) => string;
    onLinkOpen?: (url: string) => void;
    [key: string]: unknown;
}
declare function RTCPInboxListComponent(props: RTCPInboxListProps): import("react/jsx-runtime").JSX.Element;
export default RTCPInboxListComponent;
export { RTCPInboxListComponent as RTCPInboxList, RTCPInboxNotification, RTCPInboxNotificationBack };
//# sourceMappingURL=RTCPInboxList.d.ts.map