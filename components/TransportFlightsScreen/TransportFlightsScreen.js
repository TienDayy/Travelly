import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../Header';
import FontLoader from "../FontLoader";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { DepartureDate, ReturnDate} from '../TransportBookingScreen/ChooseDate';
import { InputInformation } from '../TransportBookingScreen/Passenger&Luggage';
import { SelectedClass } from '../TransportBookingScreen/Class';
import { SelectedTransport } from '../TransportBookingScreen/ChooseTransport';
import { Departure, Arrival } from '../TransportBookingScreen/ChooseDeparture&Arrival';

import { FilterContext } from './FilterContext';

const flightsData = require('../../assets/data/dataFlights.json');

export default function TransportFlightScreen() {
  const [selectedDate, setSelectedDate] = useState(DepartureDate.value);
  const [initialFlightsArr, setInitialFlightsArr] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const { filterDepartureTime, filterArrivalTime, filterMinPrice, filterMaxPrice, filterSortOption } = useContext(FilterContext);


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

// Hàm để tách phần trong và ngoài ngoặc
const splitCity = (str) => {
  const insideParenthesesMatch = str.match(/\((.*?)\)/);
  const insideParentheses = insideParenthesesMatch ? insideParenthesesMatch[1] : '';

  // Tách phần ngoài ngoặc
  const outsideParentheses = insideParenthesesMatch ? str.substring(0, insideParenthesesMatch.index).trim() : str;

  return { inside: insideParentheses, outside: outsideParentheses };
};


// Hàm tạo mảng các ngày từ DepartureDate đến ReturnDate
  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);
    const lastDate = moment(endDate);
    while(currentDate <= lastDate){
      dates.push(currentDate.clone());
      currentDate.add(1, 'days');
    }
    return dates;
  }

// Sử dụng hàm splitCity để tách các phần cần thiết
  const departureData = splitCity(Departure.value);
  const arrivalData = splitCity(Arrival.value);

// Tìm các chuyến bay phù hợp -> initialFlightsArr
  useEffect(() => {
    const flightsArr = flightsData.flights.filter(flight =>
      flight.departure === Departure.value &&
      flight.destination === Arrival.value &&
      moment(flight.date).isSame(moment(selectedDate), 'day') &&
      flight.class === SelectedClass.value
    );
    setInitialFlightsArr(flightsArr);
  }, [selectedDate, Departure.value, Arrival.value, SelectedClass.value]);


  const isTimeInRange = (time, range) => {
    const parsedTime = moment(time, 'hh:mm A');
    let start, end;
    switch (range) {
      case '12AM - 06AM':
        start = moment('12:00 AM', 'hh:mm A');
        end = moment('06:00 AM', 'hh:mm A');
        break;
      case '06AM - 12PM':
        start = moment('06:00 AM', 'hh:mm A');
        end = moment('12:00 PM', 'hh:mm A');
        break;
      case '12PM - 06PM':
        start = moment('12:00 PM', 'hh:mm A');
        end = moment('06:00 PM', 'hh:mm A');
        break;
      case '06PM - 12AM':
        start = moment('06:00 PM', 'hh:mm A');
        end = moment('12:00 AM', 'hh:mm A').add(1, 'day');
      break;  
      default:
        return true;
    }
    return parsedTime.isBetween(start, end, null, '[]');
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const depTime = moment(departureTime, 'hh:mm A');
    const arrTime = moment(arrivalTime, 'hh:mm A');
    return arrTime.diff(depTime);
  }

// Lọc lại mảng initialFlightsArr theo giá và set lại mảng filteredFlights nếu thay đổi
  useEffect(() => {
    const flightsArr = initialFlightsArr.filter(flight =>
      flight.price >= filterMinPrice &&
      flight.price <= filterMaxPrice &&
      (!filterDepartureTime || isTimeInRange(flight.departureTime, filterDepartureTime)) &&
      (!filterArrivalTime || isTimeInRange(flight.arrivalTime, filterArrivalTime))
    )
    if (filterSortOption) {
      flightsArr.sort((a, b) => {
        const timeA = moment(a.departureTime, 'hh:mm A');
        const timeB = moment(b.departureTime, 'hh:mm A');
        const arrTimeA = moment(a.arrivalTime, 'hh:mm A');
        const arrTimeB = moment(b.arrivalTime, 'hh:mm A');

        switch (filterSortOption) {
          case 'Arrival time':
            return arrTimeA - arrTimeB;
          case 'Departure time':
            return timeA - timeB;
          case 'Price':
            return b.price - a.price;
          case 'Lowest fare':
            return a.price - b.price;
          case 'Duration':
            return calculateDuration(a.departureTime, a.arrivalTime) - calculateDuration(b.departureTime, b.arrivalTime);
          default:
            return 0;
        }
      });
    }
    setFilteredFlights(flightsArr);
  }, [filterMinPrice, filterMaxPrice, filterSortOption, filterDepartureTime, filterArrivalTime, initialFlightsArr]);

// Render date item
  const DateItem = ({date, isSelected, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.itemContainer, isSelected && {backgroundColor: '#FFDDA2',}]}
      >
        <Text style={styles.dayOfWeek}> {date.format('dd').toUpperCase()} </Text>
        <Text style={styles.dayOfMonth}> {date.format('DD')} </Text>
      </TouchableOpacity>
    );
  };

// Render ticket box item
  const renderFlightItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('SelectSeats', { flight: item })} activeOpacity={0.5}>
    <View style={styles.flightContainer}>

      <View style={styles.locationBox}>
          <View style={styles.box}>
            <Text style={styles.textSmall}>{departureData.inside}</Text>
            <Text style={styles.textLarge}>{departureData.outside}</Text>
          </View>

          <Image source={require('../../assets/images/FlightingIcon.png')} style={{width: 130, height: 24, marginTop: 14}}/>

          <View style={styles.box}>
            <Text style={styles.textSmall}>{arrivalData.inside}</Text>
            <Text style={styles.textLarge}>{arrivalData.outside}</Text>
          </View>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.leftCircle}></View>
        <Image source={require('../../assets/images/Divider.png')} style={styles.divider}/>
        <View style={styles.rightCircle}></View>
      </View>

      <View style={styles.locationBox}>
          <View style={styles.box}>
            <Text style={styles.textSmall}>Date</Text>
            <Text style={styles.textLarge}>{moment(item.date).format('DD MMM')}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Departure</Text>
            <Text style={styles.textLarge}>{item.departureTime}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Price</Text>
            <Text style={styles.textLarge}>${item.price}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Number</Text>
            <Text style={styles.textLarge}>{item.number}</Text>
          </View>
      </View>

    </View>
    </TouchableOpacity>
  );

  const dates = generateDateRange(DepartureDate.value, ReturnDate.value);

/// RETURN -------
  return (
    <FontLoader>
    <View style={styles.container}>

        <Header title="Flights" />
        <View>
        <FlatList
          data={dates}
          renderItem={ ({item})=> <DateItem
                                    date={item}
                                    isSelected={selectedDate&&item.isSame(selectedDate, 'day')}
                                    onPress={() => setSelectedDate(item)}
                                  />}
          keyExtractor={(item) => item.format('YYYY-MM-DD')}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginLeft:6.5}}
        />
        </View>

        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around', marginTop: 16, marginBottom: 16}}>
          <View style={{width: 274}}>
            <Text style={styles.availableFlightsText}>
              {filteredFlights.length} flights available from {departureData.outside} to {arrivalData.outside}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')}>
            <Image source={require('../../assets/images/FilterIcon.png')} style={{height: 40, width: 40, resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredFlights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.number}
          contentContainerStyle={{paddingBottom: 16}}
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
  dayOfWeek: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  dayOfMonth: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  flightContainer: {
    marginHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 16,
    height: 168,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  dividerContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    marginTop: 14,
  },
  leftCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    left: -28,
    top: 4
  },
  rightCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    right: -28,
    top: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 16,
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box: {

  },
  textSmall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    color: '#01635D',
  },
  textLarge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  availableFlightsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  }
});