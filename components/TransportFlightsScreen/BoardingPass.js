import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import Header from '../Header';
import FontLoader from "../FontLoader";
import { InputInformation } from '../TransportBookingScreen/Passenger&Luggage';
import { Departure, Arrival } from '../TransportBookingScreen/ChooseDeparture&Arrival';
import { SelectedClass } from '../TransportBookingScreen/Class';
import moment from 'moment';

export default function BoardingPassScreen() {
  const route = useRoute();
  const { flight, selectedSeats } = route.params;

  const navigation = useNavigation();

  const splitCity = (str) => {
    const insideParenthesesMatch = str.match(/\((.*?)\)/);
    const insideParentheses = insideParenthesesMatch ? insideParenthesesMatch[1] : '';
  
    // Tách phần ngoài ngoặc
    const outsideParentheses = insideParenthesesMatch ? str.substring(0, insideParenthesesMatch.index).trim() : str;
  
    return { inside: insideParentheses, outside: outsideParentheses };
  };

  const departureData = splitCity(Departure.value);
  const arrivalData = splitCity(Arrival.value);

  const generateTicketCode = () => {
    const prefix = `${flight.number.slice(0, 2)}`; // Lấy 2 ký tự đầu của flight.number và thêm vào prefix
    const randomSingleDigit1 = Math.floor(Math.random() * 10); // Sinh ngẫu nhiên 1 chữ số
    const randomSingleDigit2 = Math.floor(Math.random() * 10); // Sinh ngẫu nhiên 1 chữ số
    const randomSingleDigit3 = Math.floor(Math.random() * 10); // Sinh ngẫu nhiên 1 chữ số
  
    return `${prefix}${randomSingleDigit1}${randomSingleDigit2}-${randomSingleDigit3}`;
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Các ký tự chữ cái
    const digits = '0123456789'; // Các ký tự số
    let code = '';
  
    // Sinh ngẫu nhiên 1 ký tự chữ
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  
    // Sinh ngẫu nhiên 13 ký tự số
    for (let i = 0; i < 13; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
  
    return code;
  };

  const renderItem = ({ item }) => {
    const { column, row } = item;
    return (
    <View style={styles.ticketBoxContainer}>

      <View style={{justifyContent: 'center', alignItems: 'center',  marginBottom: 8}}>
        <Image source={require('../../assets/images/ticketIllustration.png')} style={{width: 180, height: 155, marginTop: 8, marginBottom: 18,resizeMode: 'contain'}}/>
        <Text style={styles.textLarge}>British Airways Flight {flight.number}</Text>
      </View>
      
      <View style={styles.dividerContainer}>
        <View style={styles.leftCircle}></View>
        <Image source={require('../../assets/images/Divider.png')} style={styles.divider}/>
        <View style={styles.rightCircle}></View>
      </View>

      <View style={[styles.locationBox, {marginTop: 24}]}>
          <View>
            <Text style={styles.textSmall}>{departureData.inside}</Text>
            <Text style={styles.textLarge}>{departureData.outside}</Text>
          </View>

          <Image source={require('../../assets/images/FlightingIcon.png')} style={{width: 130, height: 24, marginTop: 14}}/>

          <View>
            <Text style={styles.textSmall}>{arrivalData.inside}</Text>
            <Text style={styles.textLarge}>{arrivalData.outside}</Text>
          </View>
      </View>

      <View style={[styles.locationBox, {marginTop: 24, justifyContent: 'flex-Start'}]}>
          <View>
            <Text style={styles.textSmall}>Date</Text>
            <Text style={styles.textLarge}>{moment(flight.date).format('DD MMM')}</Text>
          </View>

          <View style={{marginLeft: 24}}>
            <Text style={styles.textSmall}>Departure</Text>
            <Text style={styles.textLarge}>{flight.departureTime}</Text>
          </View>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.leftCircle}></View>
        <Image source={require('../../assets/images/Divider.png')} style={styles.divider}/>
        <View style={styles.rightCircle}></View>
      </View>

      <View style={[styles.locationBox, {marginTop: 24}]}>
          <View style={styles.box}>
            <Text style={styles.textSmall}>Passenger</Text>
            <Text style={styles.textLarge}>1 Adult</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Ticket</Text>
            <Text style={styles.textLarge}>{generateTicketCode()}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Class</Text>
            <Text style={styles.textLarge}>{SelectedClass.value}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textSmall}>Seat</Text>
            <Text style={styles.textLarge}>{`${column}${row}`}</Text>
          </View>
      </View>

      <View style={{marginTop: 24, alignItems: 'center'}}>
        <Image source={require('../../assets/images/BarCodeTicket.png')} style={{width: 291, height: 40, resizeMode: 'contain'}}/>
      </View>

      <Text style={styles.textCode}>{generateRandomCode()}</Text>

    </View>
  );
}
  return (
    <FontLoader>
      <View style={styles.container}>
        <Header title="Boarding Pass" />

        <FlatList 
          data={Object.values(selectedSeats)}
          renderItem={renderItem}  
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 24 }}
        />

      </View>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 20,
  },
  ticketBoxContainer: {
    marginHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 2,
    height: 566,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 16,
  },
  dividerContainer: {
    flexDirection: 'row',

  },
  leftCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    left: -36,
    top: 4
  },
  rightCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    right: -36,
    top: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 16,
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  textCode: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  }
});
