import React, { useState, useRef } from "react";

import { View, Image, Alert, Text, StyleSheet, TouchableOpacity, Dimensions, } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';
import AddOnCheckBox from '../../components/AddOnCheckBox';
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


const Addon = (props) => {
  // console.log('sm ', props)
  return (
    <View style={{ backgroundColor: "transparent", flex: 1,width:"100%",alignItems:"center" }}>
<View style={{backgroundColor:"transparent",width:'95%'}}>
<Text style={{ fontFamily: FontFamily.ExpoArabicSemiBold, marginTop: 30, fontSize: 15,marginLeft:27 }}>Add-ons</Text>

</View>

      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent", marginTop: 20, }}>

        <AddOnCheckBox {...props} />
      </View>



    </View>
  );
};
  export default Addon;