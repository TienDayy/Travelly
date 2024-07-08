import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Keyboard, TouchableOpacity, Modal } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleAuthentication = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('HomeBottomTab');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setModalVisible(true); // Show modal on authentication error
      });
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title="" />
        <Text style={styles.textWelcome}>Welcome back!</Text>
        <Text style={styles.textWelcomeSmall}>Sign in and let’s get going</Text>

        <TextInput
          style={[styles.input, { marginTop: 48 }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />

        <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', marginTop: 16 }]}>
          <TextInput
            style={{ flex: 1,
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '400',
              lineHeight: 20, }}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Text style={styles.toggleText}>{secureTextEntry ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FEA36B', marginTop: 32 }]}
          onPress={handleAuthentication}
        >
          <Text style={[styles.textSignIn, { color: '#FFF' }]}>Sign in</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Invalid email or password. Please try again.</Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textWelcome: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    textAlign: 'center',
    marginTop: 96,
    color: '#050505',
  },
  textWelcomeSmall: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
    color: '#050505',
  },
  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  textSignIn: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  toggleText: {
    color: '#999999',
    marginHorizontal: 8,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FEA36B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default LoginScreen;