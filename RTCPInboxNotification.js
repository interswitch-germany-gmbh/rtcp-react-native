import React, { PureComponent } from "react";
import { View, Text, Image, Modal, Linking, TouchableOpacity, TouchableHighlight, Animated } from "react-native";

import defaultStyles from "./styles"

export class RTCPInboxNotification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fsImageVisible: false,
            animHeight: 'auto',
            height: 'auto'
        };
    }

    setFsImageVisible = (visible) => {
        this.setState({ fsImageVisible: visible });
    }

    onAnimLayout = (event) => {
        if (this.state.animHeight === 'auto') {
            this.setState({ animHeight: new Animated.Value(Math.round(event.nativeEvent.layout.height)) })
        }
    }

    onViewLayout = (event) => {
        if (this.state.height === 'auto') {
            this.setState({ height: Math.round(event.nativeEvent.layout.height) })
        }
    }

    collapse = () => {
        if (!this.isCollapsing) {
            this.isCollapsing = true;
            Animated.timing(this.state.animHeight, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start((data) => {
                this.isCollapsing = false;
                this.props.onCollapseEnd();
            });
        }
    }

    render() {
        const item = this.props.item;
        const headerText = this.props.headerText ? this.props.headerText(this.props.item) : new Date(this.props.item.time).toLocaleString()
        const openLinkFunc = this.props.onLinkOpen ? this.props.onLinkOpen : (url) => { Linking.openURL(url) };

        return (
            <Animated.View onLayout={this.onAnimLayout} style={{ height: this.state.animHeight, overflow: 'hidden' }}>
                <TouchableHighlight style={[defaultStyles.notificationWrapper, this.props.styles?.notificationWrapper]} disabled={!item.image} onPress={() => this.setFsImageVisible(!this.state.fsImageVisible)}>
                    <View onLayout={this.onViewLayout} style={[defaultStyles.notification, this.props.styles?.notification, item.read || this.props.styles?.notificationUnread, { height: this.state.height }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[defaultStyles.header, this.props.styles?.header, item.read || this.props.styles?.headerUnread]}>
                                { headerText }
                            </Text>
                            { item.title &&
                                <Text style={[defaultStyles.title, this.props.styles?.title, item.read || this.props.styles?.titleUnread]}>{item.title}</Text>
                            }
                            <Text style={[defaultStyles.message, this.props.styles?.message, item.read || this.props.styles?.messageUnread]}>{item.message}</Text>
                            { item.url &&
                                <Text style={[defaultStyles.link, this.props.styles?.link]} numberOfLines={1} onPress={() => openLinkFunc(item.url)}>{item.url}</Text>
                            }
                        </View>
                        {item.image &&
                            <View>
                                <Image source={{ uri: item.image }} style={[defaultStyles.image, this.props.styles?.image]} />
                                <Modal animationType="fade" visible={this.state.fsImageVisible} onRequestClose={() => { this.setFsImageVisible(!this.state.fsImageVisible) }}>
                                    <TouchableHighlight disabled={!item.url} onPress={() => item.url && openLinkFunc(item.url)}>
                                    {this.props.renderFsImage ? this.props.renderFsImage(item, () => this.setFsImageVisible(false)) :
                                        <View>
                                            <Image source={{uri: item.image}} style={[defaultStyles.fsImage, this.props.styles?.fsImage]} />
                                            <TouchableOpacity style={{position: "absolute", top: 0, left: 0}} onPress={() => { this.setFsImageVisible(false) }}>
                                                <Text style={{color: 'black', padding: 10}}>❮ Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    </TouchableHighlight>
                                </Modal>
                            </View>
                        }
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    }
};

export class RTCPInboxNotificationBack extends PureComponent {
    render () {
        return (
            <View style={[defaultStyles.notificationWrapper, this.props.styles?.notificationWrapper, defaultStyles.hiddenItem, this.props.styles?.hiddenItem]}>
                <TouchableOpacity onPress={() => this.props.onDelete?.(this.props.row.item.push_id)}>
                    <View style={[defaultStyles.deleteView, this.props.styles?.deleteView]}>
                        {this.props.renderDeleteItem ? this.props.renderDeleteItem :
                            <Text style={[defaultStyles.deleteText, this.props.styles?.deleteText]}>Delete</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
