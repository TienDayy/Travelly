import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FontLoader from "../FontLoader";
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserDetails(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const data = [
    { id: '1', image: require('../../assets/images/AccountPersonIcon.png'), text: 'Personal information' },
    { id: '2', image: require('../../assets/images/AccountCardsIcon.png'), text: 'Payment and cards' },
    { id: '3', image: require('../../assets/images/AccountSavedIcon.png'), text: 'Saved' },
    { id: '4', image: require('../../assets/images/AccountHistoryIcon.png'), text: 'Booking history' },
    { id: '5', image: require('../../assets/images/AccountSettingsIcon.png'), text: 'Settings' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4} style={styles.itemContainer} onPress={() => handlePress(item.id)}>
      <Image source={item.image} style={styles.iconStyle} />
      <Text style={styles.textStyle}>{item.text}</Text>
    </TouchableOpacity>
  );

  const handlePress = (itemId) => {
    if (itemId === '1') {
      navigation.navigate('PersonalInformation');
    } else {
      navigation.navigate('FeatureNotDeveloped');
    }
  };

  if (!userDetails) {
    return null;
  }

  return (
    <FontLoader>
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Account</Text>
        <Image
          source={{ uri: userDetails.image || 'https://firebasestorage.googleapis.com/v0/b/travelly-25ba3.appspot.com/o/PersonIcon.png?alt=media&token=97870f55-e76a-4ba8-a279-959820de8676' }}
          style={styles.imageStyle}
        />
        <Text style={styles.userNameStyle}>{userDetails.firstName} {userDetails.lastName}</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity activeOpacity={0.4} style={styles.endSessionButton}>
          <Image source={require('../../assets/images/EndSessionIcon.png')} style={styles.endSessionIcon} />
          <Text style={styles.endSessionText}>End session</Text>
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 20,
  },
  headerStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginTop: StatusBar.currentHeight + 16,
    textAlign: 'center'
  },
  userNameStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 45,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 24,
  },
  iconStyle: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 8,
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
  },
  imageStyle: {
    marginTop: 24,
    width: 110,
    height: 110,
    borderRadius: 20,
    alignSelf: 'center',
  },
  endSessionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 89,
    height: 60,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 20,

  },
  endSessionIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  endSessionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FF3636',
  },
});

export default AccountScreen;
