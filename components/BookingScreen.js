import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BookingItem from './BookingItem'; // Import BookingItem component
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();

  const bookings = [
    { id: '1', title: 'Trips', image: require('../assets/images/BookingTrips.png'),},
    { id: '2', title: 'Hotel', image: require('../assets/images/BookingHotel.png'),},
    { id: '3', title: 'Transport', image: require('../assets/images/BookingTransport.png'),},
    { id: '4', title: 'Events', image: require('../assets/images/BookingEvents.png'),},
  ];
  
  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={({ item }) => <BookingItem item={item} navigation={navigation}/>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingScreen;
