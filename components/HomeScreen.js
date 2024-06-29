import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const clearOnboarding = async () => {
    try {
        await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
        console.log('Error @clearOnboarding', err);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Just a Home Screen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Reload Onboarding</Text>
      </TouchableOpacity>
    </View>
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
