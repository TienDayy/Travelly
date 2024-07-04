import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import FontLoader from "./FontLoader";

const { width } = Dimensions.get('window');

const BookingItem = ({ item, navigation }) => {

  return (
    <FontLoader>
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigation.navigate(item.title)}>
      <Image source={item.image} style={styles.image}/>
      <View style={styles.dividerContainer}>
        <View style={styles.leftCircle}></View>
        <Image source={require('../assets/images/Divider.png')} style={styles.divider} />
        <View style={styles.rightCircle}></View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 16,
        marginVertical: 8,
        padding: 8,
        width: width - 32,
        alignItems: 'center',
    },
  image: {
    width: '100%',
    height: 235,
    resizeMode: 'contain',
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  leftCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    left: -20,
    top: 4
  },
  rightCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    right: -20,
    top: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    resizeMode: 'contain',
    marginTop: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
});

export default BookingItem;
