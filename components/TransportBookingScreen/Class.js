import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontLoader from '../FontLoader';

// Tạo một đối tượng để lưu trữ giá trị của selectedButton
export const SelectedClass = {
  value: 'Economy',
};

const App = () => {
  const [selectedButton, setSelectedButton] = useState('Economy');

  useEffect(() => {
    SelectedClass.value = selectedButton;
  }, [selectedButton]);

  return (
    <View style={styles.container}>
      <Text style={styles.TitleStyle}>Class</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Economy' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedButton('Economy')}
          activeOpacity={0.3}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Economy' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Economy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Business' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedButton('Business')}
          activeOpacity={0.3}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Business' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Business
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  TitleStyle: {
    marginLeft: 16,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#727272'
  },    
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 12,
  },
  button: {
    width: 105,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#089083',
  },
  inactiveButton: {
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  activeText: {
    color: '#FFF',
  },
  inactiveText: {
    color: '#089083',
  },
});

export default App;
