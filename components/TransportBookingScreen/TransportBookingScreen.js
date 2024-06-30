import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import SearchLocationBar from './SearchLocationBar';

export default function TransportBookingScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SearchLocationBar />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Tien</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textContainer: {
    marginTop: 16,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }
});
