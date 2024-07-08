import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './components/OnBoarding/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginStack from './LoginStack'

const Stack = createNativeStackNavigator();

const Loading = () => {
  return(
    <View>
      <ActivityIndicator size="large"/>
    </View>
  ); 
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null){
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err)
    } finally {  
      setLoading(false);
    } 
  ;}

  useEffect(() => {
    checkOnboarding();
  },[] );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {viewedOnboarding ? (
          <Stack.Screen name='LoginStack' component={LoginStack} />
        ) : (
          <Stack.Screen name='OnBoarding'>
            {props => <OnBoarding {...props} setViewedOnboarding={setViewedOnboarding} />}
          </Stack.Screen>
        )}
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
