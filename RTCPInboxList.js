import React, { Component } from "react";
import { Alert, Text } from "react-native";

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
            if (item["item"]["read"] === false) {
                RTCPInbox.setRead(item["index"]);
            }
        });
    };

    renderItem = ({item}) => (
        <RTCPInboxNotification {...this.props} item={item} />
    )

    renderHiddenItem = (row, rowMap) => (
        <RTCPInboxNotificationBack {...this.props} row={row} rowMap={rowMap} onDelete={(index) => RTCPInbox.delete(index)} />
    )

    ListEmptyComponent = () => (
        <Text style={{ paddingVertical: 40, paddingHorizontal: 20, textAlign: "center" }}>You have no notifications</Text>
    )

    render() {
        return (
            <SwipeListView
                data={this.state.notifications}
                keyExtractor={(item, index) => index.toString()}

                renderItem={this.renderItem}
                ListEmptyComponent={this.ListEmptyComponent}
                renderHiddenItem={this.props.disableDelete ? undefined : this.renderHiddenItem}
                renderDeleteItem={this.props.renderDeleteItem}
                rightOpenValue={-75}
                recalculateHiddenLayout={true}

                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                alwaysBounceVertical={true}

                viewabilityConfig={{
                    minimumViewTime: 2000,
                    itemVisiblePercentThreshold: 90,
                    waitForInteraction: false,
                }}
                onViewableItemsChanged={this.onViewableItemsChanged}

                {...this.props}
            />
        );
    }
}

export { RTCPInboxList, RTCPInboxNotification, RTCPInboxNotificationBack };
