import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeatureNotDeveloped = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This feature is not yet developed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#01635D',
    textAlign: 'center',
    margin: 20,
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
