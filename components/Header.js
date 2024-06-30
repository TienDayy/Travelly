import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FontLoader from "./FontLoader";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <FontLoader>
    <View style={styles.header}>
      <AntDesign
            name={"left"}
            size={24}
            color="black"
            style={styles.backIcon}
            onPress={() => navigation.goBack() }  
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight + 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
    flex: 1,
  },
});
