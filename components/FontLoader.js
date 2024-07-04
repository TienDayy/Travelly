import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const loadFonts = () => {
    return Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    });
};

const FontLoader = ({ children }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadFonts();
                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.error('Error loading fonts:', error);
            }
        }
        loadFont();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return children;
};

export default FontLoader;