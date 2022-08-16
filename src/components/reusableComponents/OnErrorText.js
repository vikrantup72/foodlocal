import React from 'react'
import { View, Text } from 'react-native'
import {FontFamily} from './Constants';

const OnErrorText = (props) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontFamily: FontFamily.ExpoArabicMedium, fontSize: 20,color:'#2F2519'}}>
          {props.title}
        </Text>
      </View>
    )
}

export default OnErrorText;
