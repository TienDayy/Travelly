import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import FontLoader from "../FontLoader";



export default OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions();

    return (
      <FontLoader>
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]}/>
            <View style={styles.textContainer}>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
      </FontLoader>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80,
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#050505',
    marginTop: 32,
  },
  textContainer: {
    marginHorizontal: 66.5,
  },  
});
