import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from './components/BookingScreen';
import TransportBookingScreen from './components/TransportBookingScreen/TransportBookingScreen';
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
import TransportFlightsScreen from './components/TransportFlightsScreen/TransportFlightsScreen';
import FilterScreen from './components/TransportFlightsScreen/FilterScreen';
import SelectSeatsScreen from './components/TransportFlightsScreen/SelectSeatsScreen'
import BoardingPassScreen from './components/TransportFlightsScreen/BoardingPass'

import { FilterProvider } from './components/TransportFlightsScreen/FilterContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <FilterProvider>
      <Stack.Navigator
       initialRouteName="Booking"
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
        <Stack.Screen name="FilterScreen" component={FilterScreen}/>
        <Stack.Screen name="SelectSeats" component={SelectSeatsScreen}/>
        <Stack.Screen name="BoardingPass" component={BoardingPassScreen}/>
        
      </Stack.Navigator>
      </FilterProvider>
  );
}
