import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { RTCPInboxList, RTCPInboxNotification } from "rtcp-react-native/RTCPInboxList";
import FastImage from 'react-native-fast-image';

import moment from "moment";

interface NotificationsProps {
    onLinkOpen?: (url: string) => void;
}

const styles = StyleSheet.create({
    notification: {
        backgroundColor: "steelblue",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    header: {
        color: "white",
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        textTransform: "uppercase",
    },
    message: {
        color: "white",
    },
    image: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "white",
    },
    fsImage: {
        backgroundColor: "black",
    },
    link: {
        color: "lightskyblue",
        fontSize: 12,
        marginTop: 5,
    },
    hiddenItem: {
        height: "100%",
        justifyContent: "center",
    },
    deleteView: {
        flex: -1,
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 30,
        backgroundColor: "darkred",
    },
    deleteText: {
        color: "white",
    },
    caption: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 12,
    },
});

export default function Notifications({ onLinkOpen }: NotificationsProps) {
    return (
        <View>
            <Text style={styles.caption}>Notifications</Text>

            {/* fully customized RTCPInboxList */}
            <RTCPInboxList
                styles={styles}
                disableDelete={false}
                headerText={(item) => moment(item.time).format("LLLL")}

                refreshControlProps={{ colors: ["steelblue", "black"], tintColor: "black" }}

                swipeRowStyle={{ alignContent: "center" }}
                renderDeleteItem={<Text style={styles.deleteText}>🗑️</Text>}

                renderItem={(item, ref) => (
                    <View>
                        <RTCPInboxNotification ref={ref} styles={styles} item={item} onLinkOpen={onLinkOpen}
                            renderFsImage={(item, close) => (
                                <View>
                                    <FastImage style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={{ uri: item.image }} />
                                    <TouchableOpacity style={{ position: "absolute", top: 0, left: 0 }} onPress={() => close()}>
                                        <Text style={{ padding: 10, color: "yellow" }}>❮ Back</Text>
                                    </TouchableOpacity>
                                </View>
                            )} />

                        {item.read || (
                            <View style={{ backgroundColor: "white", height: 10, width: 10, top: 20, left: 30, position: "absolute", borderRadius: 5 }} />
                        )}
                    </View>
                )}
            />
        </View>
    );
}
