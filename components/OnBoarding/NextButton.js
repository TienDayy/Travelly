import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { Svg, Rect, G } from "react-native-svg";
import Slides from './slides';
import FontLoader from "../FontLoader";

const width = 344;
const height = 73;
const strokeWidth = 2;
const borderRadius = 25;
const viewBoxWidth = width + strokeWidth * 2;
const viewBoxHeight = height + strokeWidth * 2;
const circumference = (width + height) * 2;

export default function NextButton({ scrollTo, percentage, currentIndex }) {
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);
    const animation = (toValue) => {
        //console.log('DeBug1');
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);
   
    useEffect(() => { 
        progressAnimation.addListener((value) => {
            //console.log('Debug2');
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        }, [percentage]);

        return () => {
            progressAnimation.removeAllListeners();
        };
    }, []);

    return (
        <FontLoader>
        <View style={styles.container}>
            <Svg width={viewBoxWidth} height={viewBoxHeight} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
                <G rotation="0" origin={width}>
                <Rect
                        x={strokeWidth / 2}
                        y={strokeWidth / 2}
                        width={width}
                        height={height}
                        rx={borderRadius}
                        ry={borderRadius}
                        stroke="#E6E7E8"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <Rect
                        ref={progressRef}
                        x={strokeWidth / 2}
                        y={strokeWidth / 2}
                        width={width}
                        height={height}
                        rx={borderRadius}
                        ry={borderRadius}
                        stroke="#FF9933"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset = {circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity activeOpacity={1} style={styles.nextButton} onPress={scrollTo}>
                    <Text style={styles.nextButtonText}>{currentIndex === Slides.length - 1 ? "Let's start!" : "Next"}</Text>
            </TouchableOpacity>
        </View>
        </FontLoader>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButton: {
        position: 'absolute',
        width: 333,
        height: 61,
        bottom: 61,
        left: (width - 332) / 2,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: '#FEA36B',
    },
    nextButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
