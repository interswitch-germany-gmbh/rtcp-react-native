import { StyleSheet } from "react-native";

export default defaultStyles = {
    notification: {
        fontWeight: 'bold',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: StyleSheet.hairlineWidth,
        borderBottomColor: '#999',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationUnread: {
    },
    header: {
        fontSize: 10,
        marginBottom: 5
    },
    headerUnread: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 16
    },
    titleUnread: {
        fontWeight: 'bold'
    },
    message: {
    },
    messageUnread: {
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 3,
        resizeMode: 'cover'
    },
    fsImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    link: {
        color: 'darkblue',
        fontSize: 12,
        marginTop: 5
    },
    hiddenItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    deleteView: {
        flex: 1,
        marginBottom: StyleSheet.hairlineWidth,
        width: 75,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white'
    }
}
