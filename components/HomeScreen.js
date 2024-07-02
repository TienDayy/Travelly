import { StyleSheet, Text, Image, View, Keyboard, FlatList, TouchableOpacity,TouchableWithoutFeedback ,TextInput, Modal, Pressable } from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontLoader from "./FontLoader";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const clearOnboarding = async () => {
    try {
        await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
        console.log('Error @clearOnboarding', err);
    }
  }

  const navigation = useNavigation();

  const iconsItem = [
    { id: '1', title: 'Trips', image: require('../assets/images/TripsIcon.png'),},
    { id: '2', title: 'Hotel', image: require('../assets/images/HotelIcon.png'),},
    { id: '3', title: 'Transport', image: require('../assets/images/TransportIcon.png'),},
    { id: '4', title: 'Events', image: require('../assets/images/EventsIcon.png'),},
  ];

  const IconItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('BookingStack')}>
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (

    <FontLoader>
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
        <Text style={styles.headerStyle}>Explore the beautiful world!</Text>
        
        <View style={styles.searchBar}> 
          <TextInput style={styles.textInputStyle}
              placeholder='Search'
              value={searchText}
              onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../assets/images/SearchIcon.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.textStyle}>Booking Services</Text>

        <FlatList
          data={iconsItem}
          renderItem={({ item }) => <IconItem item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
       />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Search Text: {searchText}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalText}>Close</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
        
      </View>
    </TouchableWithoutFeedback>
    </FontLoader>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    //marginTop: StatusBar.currentHeight,
  },
  headerStyle: {
    marginTop: StatusBar.currentHeight + 24,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginLeft: 14,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  textInputStyle: {
    width: 305,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  searchIcon: {
    flex: 1,
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  textStyle: {
    marginTop: 24,
    marginLeft: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  flatListContent: {
    flex: 1,
    paddingHorizontal: 16,
    width: 343,
    height: 82,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    width: 60,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 8,
    backgroundColor: '#2196F3',
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
});
