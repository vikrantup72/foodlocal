import React, { useRef } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Addon from '../components/StepperScreen/Addon'
import {FontFamily} from '../components/reusableComponents/Constants';

const BANNER_H =350
export default function HeaderScroll2() {
    const scrollA = useRef(new Animated.Value(0)).current;    console.log(ScrollView)
    
    return (
        <View style={{}}>
            <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      >
              <View style={styles.bannerContainer}>
              <Animated.Image
            style={styles.banner(scrollA)} source={require('../assets/banners/pizza.jpeg')} />
                </View>
                <View >
               <Addon/>
               <Addon/>
               <Addon/>
                </View>
                        
            </Animated.ScrollView >
            
        </View>
    )
}

const styles = {
    bannerContainer: {
      marginTop: -1000,
      paddingTop: 1000,
      alignItems: 'center',
      overflow: 'hidden',
    },
    banner: scrollA => ({
      height: BANNER_H,
      width: '200%',
      
      transform: [
        {
          translateY: scrollA.interpolate({
            inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
            outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
          }),
        },
        {
          scale: scrollA.interpolate({
            inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
            outputRange: [2, 1, 0.5, 0.5],
          }),
        },
      ],
    }),
  };