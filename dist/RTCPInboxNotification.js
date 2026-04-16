import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, Modal, Linking, TouchableOpacity, TouchableHighlight, Animated } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import defaultStyles from "./styles";
export const RTCPInboxNotification = forwardRef(function RTCPInboxNotification(props, ref) {
    const { item, styles, headerText, onLinkOpen, renderFsImage } = props;
    const [fsImageVisible, setFsImageVisible] = useState(false);
    const [animHeight, setAnimHeight] = useState('auto');
    const [height, setHeight] = useState('auto');
    const isCollapsing = useRef(false);
    const onCollapseEnd = useRef(props.onCollapseEnd);
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
        registerCollapseEnd(func) {
            onCollapseEnd.current = func;
        }
    }));
    const onAnimLayout = (event) => {
        if (animHeight === 'auto') {
            setAnimHeight(new Animated.Value(Math.round(event.nativeEvent.layout.height)));
        }
    };
    const onViewLayout = (event) => {
        if (height === 'auto') {
            setHeight(Math.round(event.nativeEvent.layout.height));
        }
    };
    const headerLabel = headerText ? headerText(item) : new Date(item.time ?? '').toLocaleString();
    const openLinkFunc = onLinkOpen ?? ((url) => { Linking.openURL(url); });
    return (_jsx(Animated.View, { onLayout: onAnimLayout, style: { height: animHeight, overflow: 'hidden' }, children: _jsx(View, { style: [defaultStyles.notificationWrapper, styles?.notificationWrapper], children: _jsxs(View, { onLayout: onViewLayout, style: [defaultStyles.notification, styles?.notification, item.read ? undefined : styles?.notificationUnread, { height }], children: [_jsxs(View, { style: { flex: 1 }, children: [_jsx(Text, { style: [defaultStyles.header, styles?.header, item.read ? undefined : styles?.headerUnread], children: headerLabel }), item.title &&
                                _jsx(Text, { style: [defaultStyles.title, styles?.title, item.read ? undefined : styles?.titleUnread], children: item.title }), _jsx(Text, { style: [defaultStyles.message, styles?.message, item.read ? undefined : styles?.messageUnread], children: item.message }), item.url &&
                                _jsx(Text, { style: [defaultStyles.link, styles?.link], numberOfLines: 1, onPress: () => openLinkFunc(item.url), children: item.url })] }), item.image &&
                        _jsxs(View, { children: [_jsx(TouchableOpacity, { onPress: () => setFsImageVisible(true), children: _jsx(FastImage, { source: { uri: item.image }, style: [defaultStyles.image, styles?.image] }) }), _jsx(Modal, { animationType: "fade", visible: fsImageVisible, onRequestClose: () => setFsImageVisible(false), children: _jsx(SafeAreaProvider, { children: _jsx(SafeAreaView, { children: _jsx(TouchableHighlight, { disabled: !item.url, onPress: () => item.url && openLinkFunc(item.url), children: renderFsImage ? renderFsImage(item, () => setFsImageVisible(false)) :
                                                    _jsxs(View, { children: [_jsx(FastImage, { source: { uri: item.image }, style: [defaultStyles.fsImage, styles?.fsImage], resizeMode: FastImage.resizeMode.contain }), _jsx(TouchableOpacity, { style: { position: "absolute", top: 0, left: 0 }, onPress: () => setFsImageVisible(false), children: _jsx(Text, { style: { color: 'blue', padding: 10 }, children: "\u276E Back" }) })] }) }) }) }) })] })] }) }) }));
});
export function RTCPInboxNotificationBack({ styles, row, onDelete, renderDeleteItem }) {
    return (_jsx(View, { style: [defaultStyles.notificationWrapper, styles?.notificationWrapper, defaultStyles.hiddenItem, styles?.hiddenItem], children: _jsx(TouchableOpacity, { onPress: () => onDelete?.(row.item.push_id), children: _jsx(View, { style: [defaultStyles.deleteView, styles?.deleteView], children: renderDeleteItem ??
                    _jsx(Text, { style: [defaultStyles.deleteText, styles?.deleteText], children: "Delete" }) }) }) }));
}
//# sourceMappingURL=RTCPInboxNotification.js.map