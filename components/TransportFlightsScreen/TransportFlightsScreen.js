import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import Header from '../Header';
import FontLoader from "../FontLoader";
import { useNavigation } from '@react-navigation/native';

import { DepartureDate, ReturnDate} from '../TransportBookingScreen/ChooseDate';
import { InputInformation } from '../TransportBookingScreen/Passenger&Luggage';
import { SelectedClass } from '../TransportBookingScreen/Class';
import { SelectedTransport } from '../TransportBookingScreen/ChooseTransport';
import { Departure, Arrival } from '../TransportBookingScreen/ChooseDeparture&Arrival';

export default function TransportFlightScreen() {
// Ẩn Tab của bottomTabNavagitor
    const navigation = useNavigation();
    useLayoutEffect(() => {
        const parent = navigation.getParent();
    
        parent?.setOptions({
          tabBarStyle: { display: 'none' },
        });
    
        return () =>
          parent?.setOptions({
            tabBarStyle: undefined,
          });
    }, [navigation]);
//      ----


  return (
    <View style={styles.container}>
        <Header title="Flights" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    }
});