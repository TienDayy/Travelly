import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from './components/BookingScreen';
import TransportBookingScreen from './components/TransportBookingScreen';
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
// Import các màn hình khác nếu cần

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F5F5F5',
            elevation: 0,
          },
        }}
      >
        <Stack.Screen name="Booking" component={BookingScreen}/>
        <Stack.Screen name="Trips" component={FeatureNotDeveloped}/>
        <Stack.Screen name="Hotel" component={FeatureNotDeveloped}/>
        <Stack.Screen name="Transport" component={TransportBookingScreen}/>
        <Stack.Screen name="Events" component={FeatureNotDeveloped}/>
      </Stack.Navigator>
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
