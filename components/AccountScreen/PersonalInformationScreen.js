import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontLoader from "../FontLoader";
import Header from '../Header';
import { UserContext } from './UserContext';

const PersonalInformationScreen = ({ navigation }) => {
  const { userFName, setUserFName,
    userLName, setUserLName,
    userPhoneNum, setUserPhoneNum,
    userEmail, setUserEmail,
    userImage, setUserImage} = useContext(UserContext);

  const [newUserFName, setNewUserFName] = useState(userFName);
  const [newUserLName, setNewUserLName] = useState(userLName);
  const [newUserPhoneNum, setNewUserPhoneNum] = useState(userPhoneNum);
  const [newUserEmail, setNewUserEmail] = useState(userEmail);
  const [newUserImage, setNewUserImage] = useState(userImage);

  const handleSave = () => {
    setUserFName(newUserFName);
    setUserLName(newUserLName);
    setUserPhoneNum(newUserPhoneNum);
    setUserEmail(newUserEmail);
    setUserImage(newUserImage);
    navigation.goBack();
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewUserImage(result.assets[0].uri);
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
                source={newUserImage ? { uri: newUserImage } : require('../../assets/images/PersonIcon.png')}
                style={styles.imageStyle}
            />

            <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
                <Image source={require('../../assets/images/CameraPlusIcon.png')}
                        style={{height: 28, width: 28, resizeMode: 'contain'}}
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
    paddingBottom: 20,  // Đảm bảo rằng nội dung có đủ khoảng trống để cuộn
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
