import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontLoader from '../FontLoader';

const ChooseDate = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const onChangeDeparture = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    if (currentDate <= returnDate) {
      setShowDeparturePicker(false);
      setDepartureDate(currentDate);
    } else {
      setShowDeparturePicker(false);
      setDepartureDate(departureDate);
    }
  }

  const onChangeReturn = (event, selectedDate) => {
    const currentDate = selectedDate || returnDate;
    if (currentDate >= departureDate) {
      setShowReturnPicker(false);
      setReturnDate(currentDate);
    } else {
     setShowReturnPicker(false);
      setReturnDate(returnDate); 
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <FontLoader>
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
          <Text style={styles.label}>Departure</Text>
          <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
        </TouchableOpacity>
        {showDeparturePicker && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            display="default"
            onChange={onChangeDeparture}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowReturnPicker(true)}>
          <Text style={styles.label}>Return</Text>
          <Text style={styles.dateText}>{formatDate(returnDate)}</Text>
        </TouchableOpacity>
        {showReturnPicker && (
          <DateTimePicker
            value={returnDate}
            mode="date"
            display="default"
            onChange={onChangeReturn}
          />
        )}
      </View>
    </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 8,
    marginTop: 16,
  },
  dateContainer: {
    flex: 1,
    height: 54,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  label: {
    color: '#727272',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 5,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default ChooseDate;