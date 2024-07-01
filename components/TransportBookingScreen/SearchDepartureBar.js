import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import data from '../../assets/data/dataFlights.json'; // Đường dẫn tới file JSON
import FontLoader from '../FontLoader';

const SearchDepartureBar = forwardRef((props, ref) => {
  const [departureInput, setDepartureInput] = useState('');
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [showFlatList, setShowFlatList] = useState(false); // State để kiểm soát hiển thị FlatList
  const [uniqueDepartures, setUniqueDepartures] = useState([]); // State để lưu danh sách departure duy nhất;

  useEffect(() => {
    // Khởi tạo danh sách các departure duy nhất khi component được load
    const allDepartures = Array.from(new Set(data.flights.map(flight => flight.departure))).sort((a, b) => a.localeCompare(b));
    setUniqueDepartures(allDepartures);
    setFilteredDepartures(allDepartures);
  }, []);

  const onChangeText = (text) => {
    setDepartureInput(text);
    // Filter danh sách các departure dựa trên input của người dùng
    const filteredDepartures = uniqueDepartures.filter(departure =>
      departure.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDepartures(filteredDepartures);
    setShowFlatList(true); // Hiển thị FlatList khi có input
  }

  const handleItemPress = (item) => {
    setDepartureInput(item);
    setShowFlatList(false); // Ẩn FlatList sau khi chọn item
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
    setShowFlatList(false); // Ẩn FlatList khi không có input
    Keyboard.dismiss();
  }

  // Chuyển tiếp hàm hideFlatList tới ref
  useImperativeHandle(ref, () => ({
    hideFlatList,
  }));

  return (
    <FontLoader>
    <View style={styles.container}>
      <View style={styles.textInputStyle}>
      <Text style={styles.fromStyle}>From</Text>
      <TextInput
        style={styles.placeHolder}
        placeholder='Find Departure'
        value={departureInput}
        onChangeText={onChangeText}
        onFocus={() => setShowFlatList(true)} // Hiển thị FlatList khi TextInput được focus
      />
      </View>
      {showFlatList && (
        <FlatList
          data={filteredDepartures}
          renderItem={renderItem}
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
  },
  textInputStyle: {
    height: 54,
    marginHorizontal: 16,
    marginTop: 18,
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

export default SearchDepartureBar;
