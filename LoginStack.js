import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import WelcomeScreen from './components/Login/WelcomeScreen';
import LoginScreen from './components/Login/LoginScreen';
import SignUpScreen from './components/Login/SignUpScreen';
import HomeBottomTab from './HomeBottomTab';
import FeatureNotDeveloped from './components/FeatureNotDeveloped';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="HomeBottomTab" component={HomeBottomTab}/>
        <Stack.Screen name="FeatureNotDeveloped" component={FeatureNotDeveloped}/>
      </Stack.Navigator>
  );
}
