import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions, FlatList, Linking } from "react-native";
import FastImage from 'react-native-fast-image';
import RTCPApi from "rtcp-react-native/RTCPApi";

import { adDefaultStyles } from "./styles"

export class RTCPAdImage extends Component {
    constructor(props) {
        super(props);
        this.state = { adJson: {} };
    }

    async componentDidMount() {
        let adJson = await RTCPApi.getAdForZone(this.props.zoneId);
        this.setState({ adJson: adJson });
        this.props.onLoad?.(adJson);
    }

    render() {
        return (
            <RTCPAdImageBase
                adJson = {this.state.adJson}
                {...this.props}
            />
        );
    }
}

export class RTCPAdsCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adsJson: [],
            currentSlide: 0
        };
    }

    async componentDidMount() {
        let adsJson = await RTCPApi.getAllAdsForZone(this.props.zoneId);
        this.setState({ adsJson: adsJson });
        this.props.onLoad?.(adsJson);
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
        <RTCPAdImageBase
            adJson={item}
            styles={this.props.styles}
            {...this.props.itemProps}
        />
    )

    renderIndicatorDots = () => (
        <View style={[adDefaultStyles.indicatorContainer, this.props.styles?.indicatorContainer]}>
            {this.state.adsJson.map((_, i) => (
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
                    data={this.state.adsJson}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.bannerid}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    decelerationRate="fast"
                    snapToAlignment="start"
                    snapToInterval={Dimensions.get('window').width}
                    onScroll={this.onScroll}
                    style={[adDefaultStyles.adsCarousel, this.props.styles?.adsCarousel]}
                    {...this.props}
                />
                {!this.props.hideIndicatorDots && this.renderIndicatorDots()}
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
                onPress={() => Linking.openURL(props.adJson?.url).catch()}
                style={[adDefaultStyles.adImageWrapper, this.props.styles?.adImageWrapper]}
                {...props.touchableProps}>
                <FastImage
                    source={{ uri: props.adJson?.imageurl, ...source }}
                    style={[{ aspectRatio: (Number(props.adJson?.width) / Number(props.adJson?.height)) || 0 }, adDefaultStyles.adImage, this.props.styles?.adImage, props.style]}
                    {...props.imageProps}
                />
            </TouchableOpacity>
        );
    }
}
