import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, RefreshControl, Dimensions } from "react-native";
import RTCPInbox from './RTCPInbox';
import { RTCPInboxNotification, RTCPInboxNotificationBack } from './RTCPInboxNotification';
import { SwipeListView } from 'react-native-swipe-list-view';
function RTCPInboxListComponent(props) {
    const { ItemSeparatorComponent, disableDelete, onSyncError, renderItem, refreshControlProps, ...rest } = props;
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const rowRefs = useRef({});
    const collapsing = useRef(false);
    if (ItemSeparatorComponent && !disableDelete) {
        console.warn(`[RTCPInboxList] Using ItemSeparatorComponent doesn't work well with deletion animations.
                Please consider using 'marginTop' on the notificationWrapper stylesheet class instead.
                See the docs at https://github.com/interswitch-germany-gmbh/rtcp-react-native for details.`);
    }
    useEffect(() => {
        setNotifications(RTCPInbox.getInbox());
        RTCPInbox.registerEventHandler("onInboxUpdate", updateInbox);
        return () => {
            RTCPInbox.unregisterEventHandler("onInboxUpdate", updateInbox);
        };
    }, []);
    const updateInbox = (inbox) => {
        setNotifications([...inbox]);
    };
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await RTCPInbox.syncInbox(true);
        }
        catch (error) {
            onSyncError ? onSyncError() : Alert.alert("Error getting notifications from server. Please try again later.");
        }
        setRefreshing(false);
    };
    const onViewableItemsChanged = ({ viewableItems }) => {
        viewableItems.forEach((item) => {
            if (item.item && item.item.read === false) {
                RTCPInbox.setRead(item.index);
            }
        });
    };
    const registerItemRef = (ref, item, index) => {
        if (ref && item.push_id) {
            rowRefs.current[item.push_id] = ref;
            ref.registerCollapseEnd?.(() => deleteItem(index));
        }
    };
    const deleteItem = (index) => {
        collapsing.current = false;
        RTCPInbox.delete(index);
    };
    const renderItemFn = ({ item, index }) => {
        return renderItem
            ? renderItem(item, (ref) => registerItemRef(ref, item, index))
            : (_jsx(RTCPInboxNotification, { ref: (ref) => {
                    if (ref && item.push_id)
                        rowRefs.current[item.push_id] = ref;
                }, ...props, item: item, onCollapseEnd: () => deleteItem(index) }));
    };
    const renderHiddenItem = (row, rowMap) => (_jsx(RTCPInboxNotificationBack, { ...props, row: row, rowMap: rowMap, onDelete: (key) => rowRefs.current[key]?.collapse?.() }));
    const ListEmptyComponent = () => (_jsx(Text, { style: { paddingVertical: 40, paddingHorizontal: 20, textAlign: "center" }, children: "You have no notifications" }));
    const onSwipeValueChange = ({ key, value }) => {
        if (value < -Dimensions.get('window').width && !collapsing.current) {
            collapsing.current = true;
            rowRefs.current[key]?.collapse?.();
        }
    };
    return (_jsx(SwipeListView, { data: notifications, keyExtractor: (item) => item?.push_id, ListEmptyComponent: ListEmptyComponent, renderHiddenItem: disableDelete ? undefined : renderHiddenItem, disableRightSwipe: true, rightOpenValue: -75, rightActivationValue: -150, rightActionValue: -Dimensions.get('window').width, onSwipeValueChange: onSwipeValueChange, recalculateHiddenLayout: true, refreshControl: _jsx(RefreshControl, { ...refreshControlProps, refreshing: refreshing, onRefresh: onRefresh }), alwaysBounceVertical: true, viewabilityConfig: {
            minimumViewTime: 2000,
            itemVisiblePercentThreshold: 90,
            waitForInteraction: false,
        }, onViewableItemsChanged: onViewableItemsChanged, ...rest, renderItem: renderItemFn, ItemSeparatorComponent: ItemSeparatorComponent }));
}
export default RTCPInboxListComponent;
export { RTCPInboxListComponent as RTCPInboxList, RTCPInboxNotification, RTCPInboxNotificationBack };
//# sourceMappingURL=RTCPInboxList.js.map