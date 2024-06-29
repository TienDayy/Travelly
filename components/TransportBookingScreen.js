import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList } from 'react-native';
import data from '../assets/data/dataFlights.json'; // Đường dẫn tới file JSON

const TransportBooking = () => {
  const [departureInput, setDepartureInput] = useState('');
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [showFlatList, setShowFlatList] = useState(false); // State để kiểm soát hiển thị FlatList

  useEffect(() => {
    // Khởi tạo danh sách các departure khi component được load
    const allDepartures = data.flights.map(flight => flight.departure);
    setFilteredDepartures(allDepartures);
  }, []);

  const onChangeText = (text) => {
    setDepartureInput(text);
    // Filter danh sách các departure dựa trên input của người dùng
    const filteredDepartures = data.flights.filter(flight =>
      flight.departure.toLowerCase().includes(text.toLowerCase())
    ).map(flight => flight.departure);
    setFilteredDepartures(filteredDepartures);
    setShowFlatList(true); // Hiển thị FlatList khi có input
  }

  const renderItem = ({ item }) => (
    <Text style={styles.item}>{item}</Text>
  );

  const hideFlatList = () => {
    setShowFlatList(false); // Ẩn FlatList khi không có input
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder='Find Location'
          value={departureInput}
          onChangeText={onChangeText}
          onFocus={() => setShowFlatList(true)} // Hiển thị FlatList khi TextInput được focus
          onBlur={hideFlatList} // Ẩn FlatList khi TextInput mất focus
          style={styles.textInputStyle}
        />
        {showFlatList && (
          <FlatList
            data={filteredDepartures}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
});

export default TransportBooking;
