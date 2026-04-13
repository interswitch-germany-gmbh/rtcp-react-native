import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, Modal, Linking, TouchableOpacity, TouchableHighlight, Animated } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import defaultStyles from "./styles"

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

export const RTCPInboxNotification = forwardRef<RTCPInboxNotificationHandle, RTCPInboxNotificationProps>(
    function RTCPInboxNotification(props, ref) {
        const { item, styles, headerText, onLinkOpen, renderFsImage } = props;

        const [fsImageVisible, setFsImageVisible] = useState(false);
        const [animHeight, setAnimHeight] = useState<Animated.Value | 'auto'>('auto');
        const [height, setHeight] = useState<number | 'auto'>('auto');

        const isCollapsing = useRef(false);
        const onCollapseEnd = useRef<(() => void) | undefined>(props.onCollapseEnd);
        useEffect(() => { onCollapseEnd.current = props.onCollapseEnd; }, [props.onCollapseEnd]);

        useImperativeHandle(ref, () => ({
            collapse() {
                if (!isCollapsing.current && animHeight instanceof Animated.Value) {
                    isCollapsing.current = true;
                    Animated.timing(animHeight, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    }).start(() => {
                        isCollapsing.current = false;
                        onCollapseEnd.current?.();
                    });
                }
            },
            registerCollapseEnd(func: () => void) {
                onCollapseEnd.current = func;
            }
        }));

        const onAnimLayout = (event: { nativeEvent: { layout: { height: number } } }) => {
            if (animHeight === 'auto') {
                setAnimHeight(new Animated.Value(Math.round(event.nativeEvent.layout.height)));
            }
        };

        const onViewLayout = (event: { nativeEvent: { layout: { height: number } } }) => {
            if (height === 'auto') {
                setHeight(Math.round(event.nativeEvent.layout.height));
            }
        };

        const headerLabel = headerText ? headerText(item) : new Date(item.time ?? '').toLocaleString();
        const openLinkFunc = onLinkOpen ?? ((url: string) => { Linking.openURL(url); });

        return (
            <Animated.View onLayout={onAnimLayout} style={{ height: animHeight, overflow: 'hidden' }}>
                <View style={[defaultStyles.notificationWrapper, styles?.notificationWrapper]}>
                    <View onLayout={onViewLayout} style={[defaultStyles.notification, styles?.notification, item.read ? undefined : styles?.notificationUnread, { height }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[defaultStyles.header, styles?.header, item.read ? undefined : styles?.headerUnread]}>
                                {headerLabel}
                            </Text>
                            {item.title &&
                                <Text style={[defaultStyles.title, styles?.title, item.read ? undefined : styles?.titleUnread]}>{item.title}</Text>
                            }
                            <Text style={[defaultStyles.message, styles?.message, item.read ? undefined : styles?.messageUnread]}>{item.message}</Text>
                            {item.url &&
                                <Text style={[defaultStyles.link, styles?.link]} numberOfLines={1} onPress={() => openLinkFunc(item.url!)}>{item.url}</Text>
                            }
                        </View>
                        {item.image &&
                            <View>
                                <TouchableOpacity onPress={() => setFsImageVisible(true)}>
                                    <FastImage source={{ uri: item.image }} style={[defaultStyles.image, styles?.image]} />
                                </TouchableOpacity>
                                <Modal animationType="fade" visible={fsImageVisible} onRequestClose={() => setFsImageVisible(false)}>
                                    <SafeAreaProvider>
                                        <SafeAreaView>
                                            <TouchableHighlight disabled={!item.url} onPress={() => item.url && openLinkFunc(item.url)}>
                                                {renderFsImage ? renderFsImage(item, () => setFsImageVisible(false)) :
                                                    <View>
                                                        <FastImage source={{ uri: item.image }} style={[defaultStyles.fsImage, styles?.fsImage]} resizeMode={FastImage.resizeMode.contain} />
                                                        <TouchableOpacity style={{ position: "absolute", top: 0, left: 0 }} onPress={() => setFsImageVisible(false)}>
                                                            <Text style={{ color: 'blue', padding: 10 }}>❮ Back</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </TouchableHighlight>
                                        </SafeAreaView>
                                    </SafeAreaProvider>
                                </Modal>
                            </View>
                        }
                    </View>
                </View>
            </Animated.View>
        );
    }
);

interface RTCPInboxNotificationBackProps {
    styles?: NotificationStyles;
    row: { item: InboxNotification };
    rowMap?: unknown;
    onDelete?: (pushId: string) => void;
    renderDeleteItem?: React.ReactElement;
}

export function RTCPInboxNotificationBack({ styles, row, onDelete, renderDeleteItem }: RTCPInboxNotificationBackProps) {
    return (
        <View style={[defaultStyles.notificationWrapper, styles?.notificationWrapper, defaultStyles.hiddenItem, styles?.hiddenItem]}>
            <TouchableOpacity onPress={() => onDelete?.(row.item.push_id)}>
                <View style={[defaultStyles.deleteView, styles?.deleteView]}>
                    {renderDeleteItem ??
                        <Text style={[defaultStyles.deleteText, styles?.deleteText]}>Delete</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
}
