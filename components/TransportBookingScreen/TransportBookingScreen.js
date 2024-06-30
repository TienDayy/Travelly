import React, { useState, useEffect } from 'react';
import {StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import SearchLocationBar from './SearchLocationBar';
import { useNavigation } from '@react-navigation/native';
import FontLoader from "../FontLoader";


export default function TransportBookingScreen() {

  const navigation = useNavigation();

  return (
    <FontLoader>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.header}>
          <AntDesign
            name={"left"}
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Transport Booking</Text>
        </View>


        <SearchLocationBar/>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Tien</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textContainer: {
    marginTop: 16,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    marginTop: StatusBar.currentHeight + 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
    flex: 1,
  },
});
