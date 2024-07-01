import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import data from '../../assets/data/dataFlights.json'; // Đường dẫn tới file JSON
import FontLoader from '../FontLoader';

const SearchArrivalBar = forwardRef((props, ref) => {
  const [arrivalInput, setArrivalInput] = useState('');
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [showFlatList, setShowFlatList] = useState(false);
  const [uniqueArrivals, setUniqueArrivals] = useState([]);

  useEffect(() => {
    const allArrivals = Array.from(new Set(data.flights.map(flight => flight.destination))).sort((a, b) => a.localeCompare(b));
    setUniqueArrivals(allArrivals);
    setFilteredArrivals(allArrivals);
  }, []);

  const onChangeText = (text) => {
    setArrivalInput(text);
    const filteredArrivals = uniqueArrivals.filter(arrivals =>
      arrivals.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArrivals(filteredArrivals);
    setShowFlatList(true);
  }

  const handleItemPress = (item) => {
    setArrivalInput(item);
    setShowFlatList(false);
    Keyboard.dismiss();
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handleItemPress(item)}
      key={item}
      activeOpacity={0.5}  
      style={{paddingHorizontal: 18}}
    >
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
  );

  const hideFlatList = () => {
    setShowFlatList(false);
    Keyboard.dismiss();
  }

  useImperativeHandle(ref, () => ({
    hideFlatList,
  }));

  return (
    <FontLoader>
    <View style={styles.container}>
      <View style={styles.textInputStyle}>
      <Text style={styles.fromStyle}>To</Text>
      <TextInput
        style={styles.placeHolder}
        placeholder='Find Arrival'
        value={arrivalInput}
        onChangeText={onChangeText}
        onFocus={() => setShowFlatList(true)}
      />
      </View>
      {showFlatList && (
        <FlatList
          data={filteredArrivals}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{marginTop: 4}}
        />
      )}
    </View>
    </FontLoader>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
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
});

export default SearchArrivalBar;
