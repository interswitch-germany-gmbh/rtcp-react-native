import React, { Component } from "react";
import { Alert, Text, RefreshControl, Dimensions } from "react-native";

import RTCPInbox from './RTCPInbox';
import { RTCPInboxNotification, RTCPInboxNotificationBack } from './RTCPInboxNotification';

import { SwipeListView } from 'react-native-swipe-list-view';

export default class RTCPInboxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            refreshing: false,
            showFsImage: ''
        };
        this.rowRefs = {};

        if (props.ItemSeparatorComponent && !props.disableDelete) {
            console.warn(
                `[RTCPInboxList] Using ItemSeparatorComponent doesn't work well with deletion animations.
                Please consider using 'marginTop' on the notificationWrapper stylesheet class instead.
                See the docs at https://github.com/interswitch-germany-gmbh/rtcp-react-native for details.`)
        }
    }

    componentDidMount() {
        this.setState({ notifications: RTCPInbox.getInbox() });
        RTCPInbox.registerEventHandler("onInboxUpdate", this.updateInbox);
    }

    componentWillUnmount() {
        RTCPInbox.unregisterEventHandler("onInboxUpdate", this.updateInbox);
    }

    updateInbox = (inbox) => {
        this.setState({ notifications: inbox });
    }

    onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            try {
                await RTCPInbox.syncInbox(true);
            } catch (error) {
                this.props.onSyncError ? this.props.onSyncError() : Alert.alert("Error getting notifications from server. Please try again later.");
            }
            this.setState({ refreshing: false });
        });
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        viewableItems.forEach((item) => {
            if (item.item && item["item"]["read"] === false) {
                RTCPInbox.setRead(item["index"]);
            }
        });
    };

    registerItemRef = (ref, item, index) => {
        if (ref && item.push_id) {
            this.rowRefs[item.push_id] = ref
            ref.registerCollapseEnd?.(() => this.deleteItem(index))
        }
    }

    renderItem = ({item, index}) => {
        return this.props.renderItem
            ? this.props.renderItem(item, (ref) => this.registerItemRef(ref, item, index))
            : ( <RTCPInboxNotification ref={(ref) => this.rowRefs[item.push_id] = ref} {...this.props} item={item} onCollapseEnd={() => this.deleteItem(index)} /> )
    }

    renderHiddenItem = (row, rowMap) => (
        <RTCPInboxNotificationBack {...this.props} row={row} rowMap={rowMap} onDelete={(key) => this.rowRefs[key]?.collapse()} />
    )

    ListEmptyComponent = () => (
        <Text style={{ paddingVertical: 40, paddingHorizontal: 20, textAlign: "center" }}>You have no notifications</Text>
    )

    deleteItem = (index) => {
        this.collapsing = false
        RTCPInbox.delete(index)
    }

    onSwipeValueChange = ({key, value}) => {
        if (value < -Dimensions.get('window').width && !this.collapsing) {
            this.collapsing = true
            this.rowRefs[key]?.collapse()
        }
    }

    render() {
        return (
            <SwipeListView
                data={this.state.notifications}
                keyExtractor={(item) => item?.push_id}

                ListEmptyComponent={this.ListEmptyComponent}
                renderHiddenItem={this.props.disableDelete ? undefined : this.renderHiddenItem}

                disableRightSwipe
                rightOpenValue={-75}

                rightActivationValue={-150}
                rightActionValue={-Dimensions.get('window').width}
                onSwipeValueChange={this.onSwipeValueChange}

                recalculateHiddenLayout={true}

                refreshControl={<RefreshControl
                    {...this.props.refreshControlProps}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    />}
                alwaysBounceVertical={true}

                viewabilityConfig={{
                    minimumViewTime: 2000,
                    itemVisiblePercentThreshold: 90,
                    waitForInteraction: false,
                }}
                onViewableItemsChanged={this.onViewableItemsChanged}

                {...this.props}

                renderItem={this.renderItem}
            />
        );
    }
}

export { RTCPInboxList, RTCPInboxNotification, RTCPInboxNotificationBack };
