import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

// Tạo một đối tượng để lưu trữ giá trị của selectedId
export const SelectedTransport = {
  value: '1',
};

const ChooseTransport = () => {
    const [selectedId, setSelectedId] = useState('1');

    useEffect(() => {
        SelectedTransport.value = selectedId;
    }, [selectedId]);

    const iconsItem = [
        { id: '1', image: require('../../assets/images/AirplaneIcon.png'), },
        { id: '2', image: require('../../assets/images/BoatIcon.png'), },
        { id: '3', image: require('../../assets/images/TrainIcon.png'), },
        { id: '4', image: require('../../assets/images/BusIcon.png'), },
    ];

    const renderItem = ({ item }) => {
        const isActive = item.id === selectedId;
        return (
            <TouchableOpacity 
                style={[
                    styles.iconBox, 
                    {
                        backgroundColor: isActive ? '#089083' : '#FFF',
                        marginRight: 16,
                    }
                ]} 
                onPress={() => setSelectedId(item.id)}
            >
                <Image 
                    source={item.image} 
                    style={[
                        styles.icon, 
                        {
                            tintColor: isActive ? '#FFF' : '#089083',
                        }
                    ]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.TitleStyle}>Transport</Text>
            <FlatList
                data={iconsItem}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 32,
    },
    flatListContainer: {
      marginTop: 8,
      marginHorizontal: 18,
    },
    iconBox: {
        width: 52,
        height: 52,
        padding: 6,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
    TitleStyle: {
      marginLeft: 16,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      color: '#727272'
    },    
});

export default ChooseTransport;
