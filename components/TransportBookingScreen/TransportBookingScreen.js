import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import Header from '../Header';
import SearchDepartureBar from './SearchDepartureBar';
import SearchArrivalBar from './SearchArrivalBar';
import ChooseDepartureAndArrival from './ChooseDeparture&Arrival';
import ChooseDate from './ChooseDate';
import PassengerAndLuggage from './Passenger&Luggage';
import Class from './Class';
import ChooseTransport from './ChooseTransport';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import FontLoader from "../FontLoader";
import { SelectedTransport } from './ChooseTransport';
import { Departure, Arrival } from './ChooseDeparture&Arrival';
import { FilterContext } from '../TransportFlightsScreen/FilterContext';

export default function TransportBookingScreen() {

  const navigation = useNavigation();
  const { setFilterDepartureTime, setFilterArrivalTime, setFilterMinPrice, setFilterMaxPrice, setFilterSortOption } = useContext(FilterContext);


  const handleTouchablePress = () => {
    if (searchBarRef.current) {
      searchBarRef.current.hideFlatLists();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setFilterDepartureTime(null);
      setFilterArrivalTime(null);
      setFilterMinPrice(0);
      setFilterMaxPrice(1500);
      setFilterSortOption('Departure time');
    }, [])
  );

  const searchBarRef = React.useRef(null);

  return (
   
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        
        <Header title="Transport Booking" />
        
          <ChooseDepartureAndArrival ref={searchBarRef}/>

          <ChooseDate/>

          <PassengerAndLuggage/>

          <Class/>

          <ChooseTransport/>
          
          
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (SelectedTransport.value === '1') {
                if(Departure.value && Arrival.value){
                  navigation.navigate("TransportFlightsScreen");
                } else {
                  Alert.alert("Sorry !","Please select your Departure and Arrival");}
              } else {
                navigation.navigate("FeatureNotDeveloped");
              }
          }}>
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