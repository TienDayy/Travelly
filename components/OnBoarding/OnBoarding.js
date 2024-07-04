import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnBoardingItem from './OnBoardingItem';
import NextButton from './NextButton';
import Paginator from './Paginator';
import Slides from './slides';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = ({ setViewedOnboarding }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const navigation = useNavigation();

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < Slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true');
                setViewedOnboarding(true);
                navigation.navigate('HomeBottomTab');
            } catch (err) {
                console.log('Error @setItem: ', err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Paginator data={Slides} scrollX={scrollX} />
            <View style={{ flex: 3 }}>
                <FlatList
                    data={Slides}
                    renderItem={({ item }) => <OnBoardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <NextButton
                scrollTo={scrollTo}
                percentage={(currentIndex + 1) * (100 / Slides.length)}
                currentIndex={currentIndex}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default OnBoarding;
