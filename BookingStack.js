import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from './components/BookingScreen';
import TransportBookingScreen from './components/TransportBookingScreen/TransportBookingScreen';
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
import TransportFlightsScreen from './components/TransportFlightsScreen/TransportFlightsScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Booking" component={BookingScreen}/>
        <Stack.Screen name="Trips" component={FeatureNotDeveloped}/>
        <Stack.Screen name="Hotel" component={FeatureNotDeveloped}/>
        <Stack.Screen name="Transport" component={TransportBookingScreen}/>
        <Stack.Screen name="Events" component={FeatureNotDeveloped}/>
        <Stack.Screen name="TransportFlightsScreen" component={TransportFlightsScreen}/>
        <Stack.Screen name="FeatureNotDeveloped" component={FeatureNotDeveloped}/>
      </Stack.Navigator>
  );
}
