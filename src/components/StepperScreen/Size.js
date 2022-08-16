import React, { useState, useRef } from "react";

import { View, Image, Alert, Text, StyleSheet, TouchableOpacity, Dimensions, } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';
import {FontFamily} from '../reusableComponents/Constants';

const dataFoodSize = [
  {
    label: 'Small                                   (+SR 400)'
  },
  {
    label: 'Small                                   (+SR 400)'
  },
  {
    label: 'Large                                   (+SR 400)'
  },


];


  const Size = (props) => {
    return (
      <View style={{ backgroundColor: "transparent", flex: 1,width:"95%" }}>
  
        <Text style={{ fontFamily: FontFamily.ExpoArabicSemiBold, marginLeft: 27, marginTop: 30, fontSize: 15 }}>Size</Text>
        <RadioButtonRN
          data={dataFoodSize}
  
          selectedBtn={(e) => 
            props.setCount(750)
          }
          textColor='#9c3825'
          textStyle={{ fontFamily: FontFamily.ExpoArabicBook, fontSize: 15, color: "#972C26" }}
          deactiveColor={"#9c3825"}
          activeColor={"#9c3825"}
          circleSize={10}
          style={{ backgroundColor: "transparent", paddingBottom: 10, paddingTop: 2, }}
          initial={1}
          box={true}
          boxStyle={{ backgroundColor: "#fff" }}
          icon={
            <Image source={require('../../assets/icons/radio1.png')} style={{ height: 18, width: 18 }} />
          }
  
  
  
  
  
        />
      </View>
    );
  };
  export default Size;