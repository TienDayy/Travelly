import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from './Header'

const FeatureNotDeveloped = () => {
  return (
    <View style={styles.container}>
      <Header title="" />
      <Image source={require('../assets/images/NotDeveloped.png')} style={{height: 300, resizeMode: 'contain', marginTop: 48}}/>
      <Text style={styles.text}>This feature is coming soon. Stay tuned for updates !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#01635D',
    textAlign: 'center',
    marginTop: 28,
    borderWidth: 2,
    borderColor: '#01635D',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default FeatureNotDeveloped;
