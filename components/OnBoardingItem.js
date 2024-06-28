import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]}/>
            <View style={styles.textContainer}>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80,
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
    color: '#050505',
    marginTop: 32,
  },
  textContainer: {
    marginHorizontal: 66.5,
  },  
});
