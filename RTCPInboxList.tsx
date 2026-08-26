import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, RefreshControl, Dimensions, RefreshControlProps } from "react-native";

import RTCPInbox from './RTCPInbox';
import { RTCPInboxNotification, RTCPInboxNotificationBack, RTCPInboxNotificationHandle } from './RTCPInboxNotification';

import { SwipeListView } from 'react-native-swipe-list-view';

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

function RTCPInboxListComponent(props: RTCPInboxListProps) {
    const { ItemSeparatorComponent, disableDelete, onSyncError, renderItem, refreshControlProps, ...rest } = props;

    const [notifications, setNotifications] = useState<InboxNotification[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const rowRefs = useRef<Record<string, RTCPInboxNotificationRef>>({});
    const collapsing = useRef(false);

    if (ItemSeparatorComponent && !disableDelete) {
        console.warn(
            `[RTCPInboxList] Using ItemSeparatorComponent doesn't work well with deletion animations.
                Please consider using 'marginTop' on the notificationWrapper stylesheet class instead.
                See the docs at https://github.com/interswitch-germany-gmbh/rtcp-react-native for details.`)
    }

    useEffect(() => {
        setNotifications(RTCPInbox.getInbox());
        RTCPInbox.registerEventHandler("onInboxUpdate", updateInbox);
        return () => {
            RTCPInbox.unregisterEventHandler("onInboxUpdate", updateInbox);
        };
    }, []);

    const updateInbox = (inbox: InboxNotification[]) => {
        setNotifications([...inbox]);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await RTCPInbox.syncInbox(true);
        } catch (error) {
            onSyncError ? onSyncError() : Alert.alert("Error getting notifications from server. Please try again later.");
        }
        setRefreshing(false);
    };

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ item: InboxNotification; index: number | null }> }) => {
        viewableItems.forEach((item) => {
            if (item.item && item.item.read === false) {
                RTCPInbox.setRead(item.index as number);
            }
        });
    };

    const registerItemRef = (ref: RTCPInboxNotificationRef | null, item: InboxNotification, index: number) => {
        if (ref && item.push_id) {
            rowRefs.current[item.push_id] = ref;
            ref.registerCollapseEnd?.(() => deleteItem(index));
        }
    };

    const deleteItem = (index: number) => {
        collapsing.current = false;
        RTCPInbox.delete(index);
    };

    const renderItemFn = ({ item, index }: { item: InboxNotification; index: number }) => {
        return renderItem
            ? renderItem(item, (ref) => registerItemRef(ref, item, index))
            : (
                <RTCPInboxNotification
                    ref={(ref: RTCPInboxNotificationRef | null) => {
                        if (ref && item.push_id) rowRefs.current[item.push_id] = ref;
                    }}
                    {...props}
                    item={item}
                    onCollapseEnd={() => deleteItem(index)}
                />
            );
    };

    const renderHiddenItem = (row: { item: InboxNotification }, rowMap: unknown) => (
        <RTCPInboxNotificationBack
            {...props}
            row={row}
            rowMap={rowMap}
            onDelete={(key: string) => rowRefs.current[key]?.collapse?.()}
        />
    );

    const ListEmptyComponent = () => (
        <Text style={{ paddingVertical: 40, paddingHorizontal: 20, textAlign: "center" }}>You have no notifications</Text>
    );

    const onSwipeValueChange = ({ key, value }: { key: string; value: number }) => {
        if (value < -Dimensions.get('window').width && !collapsing.current) {
            collapsing.current = true;
            rowRefs.current[key]?.collapse?.();
        }
    };

    return (
        <SwipeListView
            data={notifications}
            keyExtractor={(item: InboxNotification) => item?.push_id}

            ListEmptyComponent={ListEmptyComponent}
            renderHiddenItem={disableDelete ? undefined : renderHiddenItem}

            disableRightSwipe
            rightOpenValue={-75}

            rightActivationValue={-150}
            rightActionValue={-Dimensions.get('window').width}
            onSwipeValueChange={onSwipeValueChange}

            recalculateHiddenLayout={true}

            refreshControl={<RefreshControl
                {...refreshControlProps}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
            alwaysBounceVertical={true}

            viewabilityConfig={{
                minimumViewTime: 2000,
                itemVisiblePercentThreshold: 90,
                waitForInteraction: false,
            }}
            onViewableItemsChanged={onViewableItemsChanged}

            {...rest}

            renderItem={renderItemFn}
            ItemSeparatorComponent={ItemSeparatorComponent}
        />
    );
}

export default RTCPInboxListComponent;
export { RTCPInboxListComponent as RTCPInboxList, RTCPInboxNotification, RTCPInboxNotificationBack };
