import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import data from '../../assets/data/dataFlights.json'; // Đường dẫn tới file JSON

const SearchLocationBar = () => {
  const [departureInput, setDepartureInput] = useState('');
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [showFlatList, setShowFlatList] = useState(false); // State để kiểm soát hiển thị FlatList
  const [uniqueDepartures, setUniqueDepartures] = useState([]); // State để lưu danh sách departure duy nhất

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
    setShowFlatList(true); // Hiển thị FlatList khi có 
  }

  const handleItemPress = (item) => {
    setDepartureInput(item);
    setShowFlatList(false); // Ẩn FlatList sau khi chọn item
    Keyboard.dismiss();
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} key={item}>
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
  );

  const hideFlatList = () => {
    setShowFlatList(false); // Ẩn FlatList khi không có input
    Keyboard.dismiss();
  }

  return (
    //<TouchableWithoutFeedback onPress={hideFlatList}>
      <View style={styles.container}>
        <TextInput
          placeholder='Find Location'
          value={departureInput}
          onChangeText={onChangeText}
          //onBlur={hideFlatList}// Ẩn FlatList khi TextInput mất focus
          onFocus={() => setShowFlatList(true)} // Hiển thị FlatList khi TextInput được focus
          style={styles.textInputStyle}
        />
        {showFlatList && (
          <FlatList
            data={filteredDepartures}
            renderItem={renderItem}       
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    //</TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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

export default SearchLocationBar;
