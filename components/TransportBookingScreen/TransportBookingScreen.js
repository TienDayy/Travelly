import React, { useState, useEffect } from 'react';
import {StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import SearchDepartureBar from './SearchDepartureBar';
import SearchArrivalBar from './SearchArrivalBar';
import { useNavigation } from '@react-navigation/native';
import FontLoader from "../FontLoader";
import Header from '../Header';


export default function TransportBookingScreen() {

  const navigation = useNavigation();

  const handleTouchablePress = () => {
    if (searchBarRef.current) {
      searchBarRef.current.hideFlatList();
    }
  };

  const searchBarRef = React.useRef(null);

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>

        <Header title="Transport Booking" />

        <SearchDepartureBar ref={searchBarRef}/>
        <SearchArrivalBar ref={searchBarRef}/>
        {/* <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Tien</Text>
        </View> */}
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
  },
});