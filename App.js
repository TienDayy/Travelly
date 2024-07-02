import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FontLoader from "./components/FontLoader";
import { NavigationContainer } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
// import Notification from './components/Notification'
// import AcountScreen from './components/AcountScreen'
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
import BookingStack from './BookingStack';
import AccountStack from  './AccountStack'

const TabArr = [
    { route: 'Home', label: 'Home', image: require('./assets/images/HomeIcon.png'), component: HomeScreen, color: '#FFDDA2' },
    { route: 'BookingStack', label: 'Booking', image: require('./assets/images/BookingIcon.png'), component: BookingStack, color: '#FFDDA2' },
    { route: 'Notification', label: 'Notification', image: require('./assets/images/NotificationIcon.png'), component: FeatureNotDeveloped, color: '#FFDDA2' },
    { route: 'AccountStack', label: 'Account', image: require('./assets/images/AccountIcon.png'), component: AccountStack, color: '#FFDDA2' },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } }, 300);
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } }, 300);
        } else {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } }, 300);
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } }, 300);
        }
    }, [focused]);

    return (
        
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1.2 : 0.8 }]}
        >
            <View>
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
                />
                <View style={[styles.btn, { backgroundColor: focused ? null : '#fff' }]}>
                    <Image source={item.image} style={styles.iconTab} />
                    <Animatable.View ref={textViewRef}>
                        <FontLoader>
                            {focused && <Text style={styles.textLabel}>
                                {item.label}
                            </Text>}
                        </FontLoader>
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
};

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 56,
                    position: 'absolute',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },     
            }}>
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}
                        />
                    )
                })}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconTab: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10, 
    },
    textLabel: {
        paddingHorizontal: 6,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
});
