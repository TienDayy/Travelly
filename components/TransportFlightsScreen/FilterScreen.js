import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import { FilterContext } from './FilterContext';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FontLoader from '../FontLoader';


const { width: screenWidth } = Dimensions.get('window');

export default function FilterScreen() {
  const {filterDepartureTime, setFilterDepartureTime,
         filterArrivalTime, setFilterArrivalTime,
         filterMinPrice, setFilterMinPrice,
         filterMaxPrice, setFilterMaxPrice,
         filterSortOption, setFilterSortOption} = useContext(FilterContext);

  const navigation = useNavigation();

  const [newFilterDepartureTime, setNewFilterDepartureTime] = useState(filterDepartureTime);
  const [newFilterArrivalTime, setNewFilterArrivalTime] = useState(filterArrivalTime);
  const [newFilterMinPrice, setNewFilterMinPrice] = useState(filterMinPrice);
  const [newFilterMaxPrice, setNewFilterMaxPrice] = useState(filterMaxPrice);
  const [newFilterSortOption, setNewFilterSortOption] = useState(filterSortOption);

  const handleDone = () => {
    setFilterDepartureTime(newFilterDepartureTime);
    setFilterArrivalTime(newFilterArrivalTime);
    setFilterMinPrice(newFilterMinPrice);
    setFilterMaxPrice(newFilterMaxPrice);
    setFilterSortOption(newFilterSortOption);
    navigation.goBack();
  };
  
  const handleReset = () => {
    setNewFilterDepartureTime(null);
    setNewFilterArrivalTime(null);
    setNewFilterMinPrice(0);
    setNewFilterMaxPrice(1500);
    setNewFilterSortOption('Departure time');
  };

  const timeRanges = [
    { id: '1', range: '12AM - 06AM', label: 'departure' },
    { id: '2', range: '06AM - 12PM', label: 'departure' },
    { id: '3', range: '12PM - 06PM', label: 'departure' },
    { id: '4', range: '06PM - 12AM', label: 'departure' },
    { id: '5', range: '12AM - 06AM', label: 'arrival' },
    { id: '6', range: '06AM - 12PM', label: 'arrival' },
    { id: '7', range: '12PM - 06PM', label: 'arrival' },
    { id: '8', range: '06PM - 12AM', label: 'arrival' },
  ];

  const renderTimeRangeButton = ({ item }) => {
    const isActiveDeparture = newFilterDepartureTime === item.range && item.label === 'departure';
    const isActiveArrival = newFilterArrivalTime === item.range && item.label === 'arrival';

    const handlePress = () => {
      if (item.label === 'departure') {
        setNewFilterDepartureTime(item.range)
      } else if (item.label === 'arrival') {
        setNewFilterArrivalTime(item.range)
      }
    };
    return (
      <TouchableOpacity
        style={[
          styles.timeRangeButton,
          {backgroundColor: isActiveDeparture || isActiveArrival ? '#089083' : '#FFF'}
        ]}
        onPress={handlePress}
      >
        <Text style={[styles.timeRangeText,{color: isActiveDeparture || isActiveArrival ? '#FFF' : '#089083'}]}>{item.range}</Text>
      </TouchableOpacity>
    );
  };

  const parseValue = (text) => {
    return Number(text.replace(/[^0-9]/g, ''));
  };

  const sortOptions = [
    'Arrival time', 'Departure time', 'Price', 'Lowest fare', 'Duration'
  ];
  const renderSortOption = ({ item }) => {
    const isActive = newFilterSortOption === item;

    return (
      <TouchableOpacity style={{flexDirection: 'row', marginBottom: 12}} onPress={() => setNewFilterSortOption(item)} >
        <View style={styles.circleOuter}>
          {isActive && <View style={styles.circleInner} />}
        </View>
        <Text style={styles.sortOptionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FontLoader>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Header title="Filter" />

        <Text style={[styles.titleStyle, { marginTop: 24 }]}>Departure</Text>

        <FlatList
          horizontal
          data={timeRanges.filter(item => item.label === 'departure')}
          renderItem={renderTimeRangeButton}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 8 }}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={[styles.titleStyle, { marginTop: 32 }]}>Arrival</Text>
        <FlatList
          horizontal
          data={timeRanges.filter(item => item.label === 'arrival')}
          renderItem={renderTimeRangeButton}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 8 }}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={[styles.titleStyle, { marginTop: 32 }]}>Price</Text>

        <MultiSlider
          values={[newFilterMinPrice, newFilterMaxPrice]}
          onValuesChange={(values) => {
            setNewFilterMinPrice(values[0]);
            setNewFilterMaxPrice(values[1]);
          }}
          sliderLength={screenWidth - 48}
          min={0}
          max={300}
          step={5}
          selectedStyle={{ backgroundColor: '#089083' }}
          unselectedStyle={{ backgroundColor: '#B7DFDB' }}
          trackStyle={{ height: 2 }}
          markerStyle={{
            height: 16,
            width: 16,
            borderRadius: 8,
            backgroundColor: '#01635D',
          }}
          containerStyle={{ marginLeft: 8 }}
        />

        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <View style={styles.textInputStyle}>
            <Text style={styles.smallText}>From</Text>
            <TextInput
              value={`$${newFilterMinPrice}`}
              onChangeText={(value) => setNewFilterMinPrice(parseValue(value))}
              style={styles.largeText}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.textInputStyle}>
            <Text style={styles.smallText}>To</Text>
            <TextInput
              value={`$${newFilterMaxPrice}`}
              onChangeText={(value) => setNewFilterMaxPrice(parseValue(value))}
              style={styles.largeText}
              keyboardType='numeric'
            />
          </View>
        </View>

        <Text style={[styles.titleStyle, { marginTop: 32 }]}>Sort by</Text>
        <FlatList
          data={sortOptions}
          renderItem={renderSortOption}
          keyExtractor={(item) => item}
          contentContainerStyle={{ marginTop: 16 }}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 50}}>
          <TouchableOpacity style={[styles.doneButton, {backgroundColor:'#FFF', marginRight: 16}]} onPress={handleReset} activeOpacity={0.4}>
            <Text style={[styles.doneButtonText, {color: '#FEA36B'}]}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.doneButton, {backgroundColor:'#FEA36B'}]} onPress={handleDone} activeOpacity={0.4}>
            <Text style={[styles.doneButtonText, {color: '#FFF'}]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
  },
  doneButton: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01635D',
    borderRadius: 20,
  },
  doneButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  timeRangeButton: {
    height: 36,
    width: 124,
    marginRight: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRangeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  titleStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  textInputStyle: {
    width: 161.5,
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  smallText: {
    color: '#727272',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 5,
  },
  largeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 8,
  },
  circleOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#01635D',
    borderWidth: 1.2,
  },
  circleInner: {
    height: 13.333,
    width: 13.333,
    backgroundColor: '#01635D',
    borderRadius: 10,
  },
  sortOptionText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});
