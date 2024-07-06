import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Header from '../Header';
import FontLoader from "../FontLoader";
import { InputInformation } from '../TransportBookingScreen/Passenger&Luggage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

export default function SelectSeatsScreen() {
  const route = useRoute();
  const { flight } = route.params;
  const travelerCount = InputInformation['1'];
  const [selectedTraveller, setSelectedTraveller] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();
  
  const travellerArr = Array.from({ length: travelerCount || 1}, (_, index) => index + 1);

  const TravellerItem = ({ item, isSelected, onPress }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.itemTravellerContainer, isSelected && { backgroundColor: '#FFDDA2' }]}
      >
        <Text style={styles.numTravStyle}> {item} </Text>
      </TouchableOpacity>
    );
  };
  const SeatItem = ({ seat, onPress, isSelected }) => {
    const isSelectedBefore =  Object.values(selectedSeats).some(selectedSeat => selectedSeat.row === seat.row && selectedSeat.column === seat.column);
    const seatColor = (isSelected || isSelectedBefore)? '#FEA36B' : (seat.status === 'Available' ? '#B7DFDB' : '#089083');
    const isBookedOrSelected = seat.status === 'Booked' || isSelectedBefore;
    return (
      <TouchableOpacity
      onPress={() => seat.status === 'Available' && !isBookedOrSelected && onPress()}
        style={[styles.seat, { backgroundColor: seatColor }]}>
      </TouchableOpacity>
    );
  };

  const handleSeatSelection = (row, column) => {
     const seatPrice = flight.price;
    setSelectedSeats(prevSelectedSeats => ({
      ...prevSelectedSeats,
      [selectedTraveller]: { row, column }
    }));
    setTotalPrice(prevTotalPrice => prevTotalPrice + seatPrice);
  };

  const renderSeats = () => {
    const seats = flight.seats;
    
    // Tạo mảng chứa các hàng và các ghế theo từng cột
    let rows = [];

    for (let row = 1; row <= 10; row++) {
      // Tạo mảng chứa các ghế của hàng row
      let rowSeats = [];
      
      // Đẩy cột A và B vào trước hàng
      for (let column of ['A', 'B']) {
        let seat = seats.find(s => s.row === row && s.column === column);
        let isSelected = selectedSeats[selectedTraveller] && selectedSeats[selectedTraveller].row === row && selectedSeats[selectedTraveller].column === column;
        if (seat) {
          rowSeats.push(
            <SeatItem
              key={`${row}${column}`}
              seat={seat}
              onPress={() => handleSeatSelection(row, column)}
              isSelected={isSelected}
            />
          );
        } else {
          rowSeats.push(
            <View key={`${row}${column}`} style={styles.seat}></View>
          );
        }
      }
      // Thêm số thứ tự hàng vào giữa
      rowSeats.push(
        <View key={`row${row}`} style={{width: 88,justifyContent:'center', alignItems: 'center'}}><Text style={styles.seatText}>{row}</Text></View>
      );
      // Đẩy cột C và D vào sau hàng
      for (let column of ['C', 'D']) {
        let seat = seats.find(s => s.row === row && s.column === column);
        let isSelected = selectedSeats[selectedTraveller] && selectedSeats[selectedTraveller].row === row && selectedSeats[selectedTraveller].column === column;
        if (seat) {
          rowSeats.push(
            <SeatItem
              key={`${row}${column}`}
              seat={seat}
              onPress={() => handleSeatSelection(row, column)}
              isSelected={isSelected}
            />
          );
        } else {
          rowSeats.push(
            <View key={`${row}${column}`} style={styles.seat}></View>
          );
        }
      }
      // Đẩy mỗi hàng vào mảng rows
      rows.push(
        <View key={row} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {rowSeats}
        </View>
      );
    }
  
    return rows;
  }

  return (
    <FontLoader>
      <View style={styles.container}>
        <Header title="Select Seats" />
        <Text style={styles.travellerText}>Traveller</Text>

        <View>
          <FlatList
            data={travellerArr}
            renderItem={({ item }) => (
              <TravellerItem
                item={item}
                isSelected={item === selectedTraveller}
                onPress={() => setSelectedTraveller(item)}
              />
            )}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 16, marginTop: 8 }}
          />
        </View>

        <View style={{ flexDirection: 'row', height: 20, marginTop: 25, paddingHorizontal: 16 }}>
          <View style={{ height: 20, width: 20, backgroundColor: '#FEA36B', borderRadius: 5}}></View>
          <Text style={styles.textFont1420}>Selected</Text>
          <View style={{ height: 20, width: 20, backgroundColor: '#089083', borderRadius: 5, marginLeft: 24}}></View>
          <Text style={styles.textFont1420}>Booked</Text>
          <View style={{ height: 20, width: 20, backgroundColor: '#B7DFDB', borderRadius: 5, marginLeft: 24}}></View>
          <Text style={styles.textFont1420}>Available</Text>
        </View>


        <View key={'header'} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
            <View style={[styles.titleBox]}><Text style={styles.columnHeader}>A</Text></View>
            <View style={styles.titleBox}><Text style={styles.columnHeader}>B</Text></View>
            <View style={{width: 88}}><Text key={`$0$2`} style={styles.seatText}></Text></View>
            <View style={styles.titleBox}><Text style={styles.columnHeader}>C</Text></View>
            <View style={styles.titleBox}><Text style={styles.columnHeader}>D</Text></View>
        </View>

        <ScrollView contentContainerStyle={{alignItems:'center'}}>
          {renderSeats()}   
        </ScrollView>

        <View style={styles.continueBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 24}}>
            <Text style={styles.textContinueBox1}>Your seats</Text>
            <Text style={styles.textContinueBox2}>Traveller {selectedTraveller} / Seat {selectedSeats[selectedTraveller]?.row}{selectedSeats[selectedTraveller]?.column}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
            <Text style={styles.textContinueBox1}>Total price</Text>
            <Text style={styles.textContinueBox2}>${totalPrice}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              const allSeatsSelected = travellerArr.every(traveller => selectedSeats[traveller]);
              if (allSeatsSelected) {
                navigation.navigate('BoardingPass',{
                  flight: flight,
                  selectedSeats: selectedSeats,
                })
              } else {
                Alert.alert('Seat Selection', 'Please select seats for all travellers.');
              }
            }}>
            <Text style={styles.continueTextStyle}>Continue</Text>
          </TouchableOpacity>    
        </View>


      </View>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  itemTravellerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    height: 40,
    width: 40,
    borderRadius: 10,
    marginRight: 25,
  },
  numTravStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  travellerText: {
    marginTop: 24,
    marginLeft: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  textFont1420: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 20,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 16,
  },
  seat: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 4,
    borderRadius: 10,
  },
  seatText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 25,
    margin: 4,
    borderRadius: 10,
  },
  columnHeader: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  continueBox: {
    backgroundColor: "#FFF",
    height: 180,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 16,
  },
  textContinueBox1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#01635D'
  },
  textContinueBox2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#050505'
  },
  continueButton: {
    marginTop: 24,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FEA36B',
  },
  continueTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
});
