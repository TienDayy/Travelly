import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]}/>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.description}>{item.description}</Text>
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
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  description: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
    color: '#050505',
    textAlign: 'center',
  },
});
