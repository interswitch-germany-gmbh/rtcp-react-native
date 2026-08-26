import { Dimensions, StyleSheet } from "react-native";

const defaultStyles = {
    notificationWrapper: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: StyleSheet.hairlineWidth,
        borderBottomColor: '#999'
    },
    notification: {
        fontWeight: 'bold' as const,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row' as const,
        alignItems: 'center' as const
    },
    notificationUnread: {
    },
    header: {
        fontSize: 10,
        marginBottom: 5
    },
    headerUnread: {
        fontWeight: 'bold' as const
    },
    title: {
        fontSize: 16
    },
    titleUnread: {
        fontWeight: 'bold' as const
    },
    message: {
    },
    messageUnread: {
        fontWeight: 'bold' as const
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 3
    },
    fsImage: {
        width: '100%' as const,
        height: '100%' as const
    },
    link: {
        color: 'darkblue',
        fontSize: 12,
        marginTop: 5
    },
    hiddenItem: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'flex-end' as const
    },
    deleteView: {
        flex: 1,
        marginBottom: StyleSheet.hairlineWidth,
        width: 75,
        backgroundColor: 'red',
        alignItems: 'center' as const,
        justifyContent: 'center' as const
    },
    deleteText: {
        color: 'white'
    }
};

export default defaultStyles;

export const adDefaultStyles = {
    /* RTCPAdImage */
    adImageWrapper: {
    },
    adImage: {
        width: Dimensions.get('window').width
    },
    /* RTCPAdsCarousel */
    adsCarousel: {
    },
    indicatorContainer: {
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        marginTop: 10
    },
    indicatorDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    indicatorDotActive: {
        backgroundColor: 'blue'
    },
    indicatorDotInactive: {
        backgroundColor: 'grey'
    }
};
