import React from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import { useState, useRef } from 'react';
import OnBoardingItem from './OnBoardingItem';
import Slides from './slides' ;

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null); 

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).currentIndex

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={Slides}
                    renderItem={({ item }) => <OnBoardingItem item={ item }/>}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {useNativeDriver: false,}
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
