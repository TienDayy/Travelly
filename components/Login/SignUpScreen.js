import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Keyboard, TouchableOpacity, Modal } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Cập nhật thông tin mặc định cho người dùng mới trong Realtime Database
        const userRef = ref(db, `users/${user.uid}`);
        set(userRef, {
          firstName: 'Travelly',
          lastName: 'User',
          phoneNumber: '',
          email: user.email,
          image: 'https://firebasestorage.googleapis.com/v0/b/travelly-25ba3.appspot.com/o/PersonIcon.png?alt=media&token=97870f55-e76a-4ba8-a279-959820de8676', // Đường dẫn tới tấm ảnh mặc định
        });
        navigation.navigate('HomeBottomTab');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setModalVisible(true); // Hiển thị modal khi có lỗi xảy ra
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
        <Text style={styles.textWelcome}>Welcome to Travelly!</Text>
        <Text style={styles.textWelcomeSmall}>Sign up and start your journey</Text>

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
          onPress={handleSignUp}
        >
          <Text style={[styles.textSignIn, { color: '#FFF' }]}>Sign up</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Failed to create an account. Please try again.</Text>
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

export default SignUpScreen;
