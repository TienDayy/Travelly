import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen'
import BookingScreen from './components/BookingScreen'
// import Notification from './components/Notification'
// import AcountScreen from './components/AcountScreen'
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
import BookingStack from './BookingStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="BookingStack" component={BookingStack}/>
            <Tab.Screen name="Notification" component={FeatureNotDeveloped}/>
            <Tab.Screen name="Acount" component={FeatureNotDeveloped}/>
        </Tab.Navigator>
    </NavigationContainer>
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
