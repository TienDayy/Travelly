import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontLoader from "../FontLoader";
import { useNavigation } from '@react-navigation/native';

export default WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
      <FontLoader>
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Image source={require('../../assets/images/LogoTravelly.png')}
                    style= {{width: 64, height: 48, resizeMode:'contain', alignSelf:'center', marginTop:32}}/>
            <Text style={styles.Travelly}>Travelly</Text>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#FEA36B', marginTop: 120}]}
                              onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.textSignUp, {color: '#FFF'}]}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#FFF', marginTop: 16}]}
                              onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.textSignUp, {color: '#FEA36B'}]}>Login</Text>
            </TouchableOpacity>
        </View>
      </FontLoader>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#01635D',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  textSignUp: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  Travelly: {
    fontFamily: 'Poppins-Medium',
    fontSize: 33,
    fontWeight: '600',
    lineHeight: 35,
    color: '#01635D',
    textAlign: 'center',
    marginTop: 12,
  },
});
