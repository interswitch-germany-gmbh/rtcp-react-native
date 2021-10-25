import React, { PureComponent } from "react";
import { View, Text, Image, Modal, Linking, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";

import defaultStyles from "./styles"

export class RTCPInboxNotification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { fsImageVisible: false };
    }

    setFsImageVisible = (visible) => {
        this.setState({ fsImageVisible: visible });
    }

    render() {
        const item = this.props.item;
        const headerText = this.props.headerText ? this.props.headerText(this.props.item) : new Date(this.props.item.time).toLocaleString()
        const openLinkFunc = this.props.onLinkOpen ? this.props.onLinkOpen : (url) => { Linking.openURL(url) };

        return (
            <TouchableHighlight disabled={!item.image} onPress={() => this.setFsImageVisible(!this.state.fsImageVisible)}>
                <View style={[defaultStyles.notification, this.props.styles?.notification, item.read || this.props.styles?.notificationUnread]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[defaultStyles.header, this.props.styles?.header, item.read || this.props.styles?.headerUnread]}>
                            { headerText }
                        </Text>
                        { item.title &&
                            <Text style={[defaultStyles.title, this.props.styles?.title, item.read || this.props.styles?.titleUnread]}>{item.title}</Text>
                        }
                        <Text style={[defaultStyles.message, this.props.styles?.message, item.read || this.props.styles?.messageUnread]}>{item.message}</Text>
                        { item.url &&
                            <Text style={[defaultStyles.link, this.props.styles?.link]} numberOfLines={1} onPress={() => openLinkFunc(item.url)}>🔗 {item.url}</Text>
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
        );
    }
};

export class RTCPInboxNotificationBack extends PureComponent {
    deleteItem = () => {
        this.props.rowMap[this.props.row.index]?.closeRow();
        this.props.onDelete(this.props.row.index);
    }

    render () {
        return (
            <View style={[defaultStyles.hiddenItem, this.props.styles?.hiddenItem]}>
                <TouchableOpacity onPress={this.deleteItem}>
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
