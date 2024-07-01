import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Keyboard, Image } from 'react-native';
import data from '../../assets/data/dataFlights.json';
import FontLoader from '../FontLoader';

export const Departure = {
    value: '',
};
export const Arrival = {
    value: '',
};

const ChooseDepartureAndArrival = forwardRef((props, ref) => {
  const [departureInput, setDepartureInput] = useState('');
  const [arrivalInput, setArrivalInput] = useState('');
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [showDepartureFlatList, setShowDepartureFlatList] = useState(false);
  const [showArrivalFlatList, setShowArrivalFlatList] = useState(false);
  const [uniqueDepartures, setUniqueDepartures] = useState([]);
  const [uniqueArrivals, setUniqueArrivals] = useState([]);

  useEffect(() => {
    Departure.value = departureInput;
  }, [departureInput]);

  useEffect(() => {
    Arrival.value = arrivalInput;
  }, [arrivalInput]);

  useEffect(() => {
    const allDepartures = Array.from(new Set(data.flights.map(flight => flight.departure))).sort((a, b) => a.localeCompare(b));
    const allArrivals = Array.from(new Set(data.flights.map(flight => flight.destination))).sort((a, b) => a.localeCompare(b));
    setUniqueDepartures(allDepartures);
    setFilteredDepartures(allDepartures);
    setUniqueArrivals(allArrivals);
    setFilteredArrivals(allArrivals);
  }, []);

  const onDepartureChangeText = (text) => {
    setDepartureInput(text);
    const filteredDepartures = uniqueDepartures.filter(departure =>
      departure.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDepartures(filteredDepartures);
    setShowDepartureFlatList(true);
  };

  const onArrivalChangeText = (text) => {
    setArrivalInput(text);
    const filteredArrivals = uniqueArrivals.filter(arrival =>
      arrival.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArrivals(filteredArrivals);
    setShowArrivalFlatList(true);
  };

  const handleDepartureItemPress = (item) => {
    setDepartureInput(item);
    setShowDepartureFlatList(false);
    Keyboard.dismiss();
  };

  const handleArrivalItemPress = (item) => {
    setArrivalInput(item);
    setShowArrivalFlatList(false);
    Keyboard.dismiss();
  };

  const handleSwapPress = () => {
    const temp = departureInput;
    setDepartureInput(arrivalInput);
    setArrivalInput(temp);
  };

  const hideFlatLists = () => {
    setShowDepartureFlatList(false);
    setShowArrivalFlatList(false);
    Keyboard.dismiss();
  };

  useImperativeHandle(ref, () => ({
    hideFlatLists,
  }));

  return (
    <FontLoader>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputStyle}>
            <Text style={styles.fromStyle}>From</Text>
            <TextInput
              style={styles.placeHolder}
              placeholder='Find Departure'
              value={departureInput}
              onChangeText={onDepartureChangeText}
              onFocus={() => setShowDepartureFlatList(true)}
            />
          </View>
          {showDepartureFlatList && (
          <FlatList
            data={filteredDepartures}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDepartureItemPress(item)}
                key={item}
                activeOpacity={0.5}
                style={{ paddingHorizontal: 18 }}
              >
                <Text style={styles.item}>{item}</Text>
              </TouchableOpacity>
            )}
            style={{marginTop: 4}}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
          <TouchableOpacity style={styles.swapIcon} onPress={handleSwapPress}>
            <Image source={require('../../assets/images/SwapIcon.png')} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
          </TouchableOpacity>
          <View style={styles.textInputStyle}>
            <Text style={styles.fromStyle}>To</Text>
            <TextInput
              style={styles.placeHolder}
              placeholder='Find Arrival'
              value={arrivalInput}
              onChangeText={onArrivalChangeText}
              onFocus={() => setShowArrivalFlatList(true)}
            />
          </View>
        </View>

        {showArrivalFlatList && (
          <FlatList
            data={filteredArrivals}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleArrivalItemPress(item)}
                key={item}
                activeOpacity={0.5}
                style={{ paddingHorizontal: 18 }}
              >
                <Text style={styles.item}>{item}</Text>
              </TouchableOpacity>
            )}
            style={{marginTop: 4}}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </FontLoader>
  );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        marginTop: 10,
      },
      textInputStyle: {
        height: 54,
        marginHorizontal: 16,
        marginTop: 8,
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 16,
      },
      item: {
        backgroundColor: '#FFF',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
      },
      fromStyle: {
        color: '#727272',
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 16,
        marginTop: 5,
      },
      placeHolder: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        marginBottom: 8,
      },
      swapIcon: {
        position: 'absolute',
        top: 46,
        right: 48,
        zIndex: 1,
      },
});

export default ChooseDepartureAndArrival;
