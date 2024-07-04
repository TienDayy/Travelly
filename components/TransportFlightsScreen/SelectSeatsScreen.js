// SelectSeatsScreen.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../Header';
import FontLoader from "../FontLoader";
import { useNavigation } from '@react-navigation/native';

import { InputInformation } from '../TransportBookingScreen/Passenger&Luggage';

const flightsData = require('../../assets/data/dataFlights.json');

export default function SelectSeatsScreen() {
  const travelerCount = InputInformation['1'];
  const [selectedTraveller, setSelectedTraveller] = useState('1');
  
  const travellerArr = Array.from({ length: travelerCount || 0}, (_, index) => index + 1);

  const TravellerItem = ({item, isSelected, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.itemContainer, isSelected && {backgroundColor: '#FFDDA2',}]}
      >
        <Text style={styles.numTravStyle}> {item} </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FontLoader>
      <View style={styles.container}>
        <Header title="Select Seats" />
        <FlatList
          data={travellerArr}
          renderItem={ ({item})=> <TravellerItem
                                    item={item}
                                    isSelected={item===selectedTraveller}
                                    onPress={() => setSelectedTraveller(item)}
                                  />}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginLeft:6.5}}
        />
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 8,
    height: 56,
    width: 34,
    borderRadius: 10,
    marginHorizontal: 9.5,
  },
  numTravStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: '#01635D',
    textAlign: 'center',
  },
});
