import React, { useState, useEffect, useRef } from 'react';
import {StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import SearchDepartureBar from './SearchDepartureBar';
import SearchArrivalBar from './SearchArrivalBar';
import ChooseDate from './ChooseDate';
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

          <TouchableOpacity style={styles.swapIcon}>
            <Image source={require('../../assets/images/SwapIcon.png')} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
          </TouchableOpacity>
          <ChooseDate/>
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
  swapIcon: {
    position: 'absolute',
    top: 122,
    right: 48,
    zIndex: 1,
  },
});