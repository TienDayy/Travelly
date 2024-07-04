import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import FontLoader from "../FontLoader";

export const InputInformation = {
  '1': '',
  '2': '',
  '3': '',
  '4': '',
};

const PassengerAndLuggage = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [inputValues, setInputValues] = useState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
  });

  useEffect(() => {
    InputInformation['1'] = inputValues['1'];
    InputInformation['2'] = inputValues['2'];
    InputInformation['3'] = inputValues['3'];
    InputInformation['4'] = inputValues['4'];
  }, [inputValues]);

  const iconsItem = [
    { id: '1', image: require('../../assets/images/PersonIcon.png'), },
    { id: '2', image: require('../../assets/images/BabyIcon.png'), },
    { id: '3', image: require('../../assets/images/PetIcon.png'), },
    { id: '4', image: require('../../assets/images/LuggageIcon.png'), },
  ];

  const renderItem = ({ item }) => {
    const isActive = item.id === selectedId;
    return (
      <TouchableOpacity onPress={() => setSelectedId(item.id)} style={{ marginRight: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={item.image}
            style={[
              styles.icon,
              { tintColor: isActive ? '#01635D' : '#727272' }
            ]}
          />
          <TextInput
            editable={isActive}
            style={[styles.TextInputStyle, { color: isActive ? '#01635D' : '#727272', marginLeft: 4 }]}
            onChangeText={(text) => setInputValues({ ...inputValues, [item.id]: text })}
            value={inputValues[item.id]}
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: 60, height: 1, backgroundColor: isActive ? '#01635D' : '#727272' }} />
      </TouchableOpacity>
    );
  };

  return (
    <FontLoader>
      <View style={styles.container}>
        <Text style={styles.TitleStyle}>Passenger & Luggage</Text>
        <FlatList
          data={iconsItem}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  flatListContainer: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  TitleStyle: {
    marginLeft: 16,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#727272'
  },
  TextInputStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: '#01635D',
    textAlign: 'center',
  }
});

export default PassengerAndLuggage;
