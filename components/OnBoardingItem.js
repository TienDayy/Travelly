import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins': require('../assets/fonts/Poppins.ttf'),
  });
};

export default OnBoardingItem = ({ item }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { width } = useWindowDimensions();

    useEffect(() => {
      async function loadFont() {
        try {
          await SplashScreen.preventAutoHideAsync();
          await loadFonts();
          setFontsLoaded(true);
          SplashScreen.hideAsync();
        } catch (error) {
          console.error('Error loading fonts:', error);
        }
      }
      loadFont();
    }, []);

    if (!fontsLoaded) {
      return null; // or any loading indicator you prefer
    }

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
    flex: 0.8,
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
