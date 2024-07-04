import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import AccountScreen from './components/AccountScreen/AccountScreen'
import PersonalInformationScreen from './components/AccountScreen/PersonalInformationScreen';
import FeatureNotDeveloped from './components/FeatureNotDeveloped';
import { UserProvider } from './components/AccountScreen/UserContext'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen}/>
        <Stack.Screen name="FeatureNotDeveloped" component={FeatureNotDeveloped}/>

      </Stack.Navigator>
    </UserProvider>
  );
}
