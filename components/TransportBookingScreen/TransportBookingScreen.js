import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import Header from '../Header';
import SearchDepartureBar from './SearchDepartureBar';
import SearchArrivalBar from './SearchArrivalBar';
import ChooseDate from './ChooseDate';
import PassengerAndLuggage from './Passenger&Luggage';
import Class from './Class';
import ChooseTransport from './ChooseTransport';
import { useNavigation } from '@react-navigation/native';
import FontLoader from "../FontLoader";



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

          <PassengerAndLuggage/>

          <Class/>

          <ChooseTransport/>
          
          
          <TouchableOpacity style={styles.searchButton}>
          <FontLoader>
            <Text style={styles.searchTextStyle}>Search</Text>
          </FontLoader>
          </TouchableOpacity>
        
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
  searchButton: {
    marginTop: 32,
    height: 60,
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FEA36B',
  },
  searchTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
});