import React from 'react';
import { StyleSheet, Text, View, Animated, useWindowDimensions } from 'react-native';

export default Paginator = ({ data, scrollX }) => {
    const {width} = useWindowDimensions();
    return (
      <View style={{ flexDirection: 'row', height: 64}}>
        {data.map((_, i) => { 
            const inputRange = [(i-1)*width, i*width, (i+1)*width];
            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.25,1,0.25],
                extrapolate: 'clamp',
            });
            return <Animated.View style={[styles.line,{opacity}]} key ={i.toString()}/>
        })}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    line: {
        width: 111,
        height: 2,
        backgroundColor: '#050505',
        borderRadius: 1.5,
        marginHorizontal: 5,
        marginTop: 68,
    }
  });
  