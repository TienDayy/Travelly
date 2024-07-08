import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontLoader from "../FontLoader";
import Header from '../Header';
import { auth, db, storage } from '../../firebaseConfig';
import { ref, get, update } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

const PersonalInformationScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    image: ''
  });

  const [newUserFName, setNewUserFName] = useState('');
  const [newUserLName, setNewUserLName] = useState('');
  const [newUserPhoneNum, setNewUserPhoneNum] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserImage, setNewUserImage] = useState('');
  const [temporaryImage, setTemporaryImage] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserDetails(data);
            setNewUserFName(data.firstName);
            setNewUserLName(data.lastName);
            setNewUserPhoneNum(data.phoneNumber);
            setNewUserEmail(data.email);
            setNewUserImage(data.image);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      try {
        await update(userRef, {
          firstName: newUserFName,
          lastName: newUserLName,
          phoneNumber: newUserPhoneNum,
          email: newUserEmail,
        });
  
        // Nếu có hình ảnh mới được chọn
        if (temporaryImage) {
          const response = await fetch(temporaryImage);
          const blob = await response.blob();
  
          const filename = temporaryImage.substring(temporaryImage.lastIndexOf('/') + 1);
          const imageRef = storageRef(storage, `images/${filename}`);
  
          const uploadTask = uploadBytesResumable(imageRef, blob);
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Progress of the upload can be handled here if needed
            },
            (error) => {
              console.error('Error uploading image: ', error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                // Cập nhật URL hình ảnh mới vào Firestore
                await update(userRef, {
                  image: downloadURL
                });
                setNewUserImage(downloadURL); // Cập nhật lại newUserImage sau khi upload thành công
                setTemporaryImage(''); // Xóa URL hình ảnh tạm thời sau khi đã upload
                navigation.goBack(); // Quay lại màn hình trước đó sau khi hoàn thành
              });
            }
          );
        } else {
          // Nếu không có hình ảnh mới thì không cần upload, chỉ đơn giản cập nhật thông tin người dùng
          navigation.goBack(); // Quay lại màn hình trước đó
        }
      } catch (error) {
        console.error('Error updating user details: ', error);
      }
    }
  };
  
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      const { uri } = result.assets[0];
      setTemporaryImage(uri); // Lưu URL hình ảnh tạm thời
    }
  };

  return (
    <FontLoader>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Header title="Personal Information" />
            <Image
              source={temporaryImage ? { uri: temporaryImage } : (newUserImage ? { uri: newUserImage } : require('../../assets/images/PersonIcon.png'))}
              style={styles.imageStyle}
            />

            <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
              <Image source={require('../../assets/images/CameraPlusIcon.png')}
                style={{ height: 28, width: 28, resizeMode: 'contain' }}
              />
            </TouchableOpacity>

            <View style={styles.textInputStyle}>
              <Text style={styles.smallText}>First Name</Text>
              <TextInput
                style={styles.largeText}
                value={newUserFName}
                onChangeText={setNewUserFName}
              />
            </View>

            <View style={styles.textInputStyle}>
              <Text style={styles.smallText}>Last Name</Text>
              <TextInput
                style={styles.largeText}
                value={newUserLName}
                onChangeText={setNewUserLName}
              />
            </View>

            <View style={styles.textInputStyle}>
              <Text style={styles.smallText}>Phone</Text>
              <TextInput
                style={styles.largeText}
                value={newUserPhoneNum}
                onChangeText={setNewUserPhoneNum}
                keyboardType='numeric'
              />
            </View>

            <View style={styles.textInputStyle}>
              <Text style={styles.smallText}>Email</Text>
              <TextInput
                style={styles.largeText}
                value={newUserEmail}
                onChangeText={setNewUserEmail}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save changes</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  imageStyle: {
    marginTop: 24,
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Regular',
  },
  cameraIcon: {
    padding: 2,
    backgroundColor: '#FFF',
    borderRadius: 7,
    position: 'absolute',
    top: StatusBar.currentHeight + 154,
    right: 135,
  },
  saveButton: {
    marginTop: 120,
    height: 64,
    backgroundColor: '#FEA36B',
    marginHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFF',
  },
  textInputStyle: {
    height: 54,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  smallText: {
    color: '#727272',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 5,
  },
  largeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default PersonalInformationScreen;
