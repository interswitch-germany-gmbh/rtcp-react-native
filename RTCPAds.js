import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions, FlatList, Linking } from "react-native";
import FastImage from 'react-native-fast-image';
import RTCPApi from "rtcp-react-native/RTCPApi";

import { adDefaultStyles } from "./styles"

export class RTCPAdImage extends Component {
    constructor(props) {
        super(props);
        this.state = { adData: {} };
    }

    async componentDidMount() {
        this.setState({ adData: await RTCPApi.getAdImageData(this.props.zoneId) });
    }

    render() {
        return (
            <RTCPAdImageBase
                adData = {this.state.adData}
                {...this.props}
            />
        );
    }
}

export class RTCPAdsCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adsData: [],
            currentSlide: 0
        };
    }

    async componentDidMount() {
        this.setState({ adsData: await RTCPApi.getAllAdImageData(this.props.zoneId) });
    }

    onScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const decimalIndex = event.nativeEvent.contentOffset.x / slideSize;

        const roundIndex = Math.round(decimalIndex);
        const distance = Math.abs(roundIndex - decimalIndex);
        const swipedFarEnough = distance > 0.4;

        if (this.state.currentSlide !== roundIndex && !swipedFarEnough) {
          this.setState({ currentSlide: roundIndex });
        }
    }

    renderItem = ({item}) => (
        <RTCPAdImageBase adData={item} />
    )

    renderPagination = () => (
        <View style={[adDefaultStyles.indicatorContainer, this.props.styles?.indicatorContainer]}>
            {this.state.adsData.map((_, i) => (
                <View
                    key={i.toString()}
                    style={[adDefaultStyles.indicatorDot,
                        (this.state.currentSlide === i
                            ? [adDefaultStyles.indicatorDotActive, this.props.styles?.indicatorDotActive]
                            : [adDefaultStyles.indicatorDotInactive, this.props.styles?.indicatorDotInactive])]} />
            ))}
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.adsData}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.bannerid}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    decelerationRate="fast"
                    snapToAlignment="start"
                    snapToInterval={Dimensions.get('window').width}
                    onScroll={this.onScroll}
                    style={[adDefaultStyles.adCarouselContainer, this.props.styles?.adCarouselContainer]}
                    {...this.props}
                />
                {!this.props.hidePagination && this.renderPagination()}
            </View>
        );
    }
}

export class RTCPAdImageBase extends Component {
    async openUrl(url) {
        try {
            await Linking.openURL(url);
        } catch (error) {}
    };

    render() {
        // allow FastImage settings within 'source' from parent without overriding source.uri
        const { source, ...props } = this.props
        return (
            <TouchableOpacity
                onPress={() => Linking.openURL(props.adData.url).catch()}
                {...props.touchableProps}>
                <FastImage
                    source={{ uri: props.adData?.imageurl, ...source }}
                    style={[{ aspectRatio: (Number(props.adData?.width) / Number(props.adData?.height)) || 0 }, adDefaultStyles.adImage, props.style]}
                    {...props.imageProps}
                />
            </TouchableOpacity>
        );
    }
}
