import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  Image,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {FontFamily} from '../reusableComponents/Constants';

const dataCrust = [
  {
    title: 'Margarita',
    id: 1,
  },
  {
    title: 'All Meat Combo',
    id: 2,
  },
];

const Crust = props => {
  // console.log('props.addOnListData',props.addOnListData)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    
    props.setAddOnSingleSelected(selected);
    

}, [selected]);
  const selectedBtn = e => {
    // if (props.addOnSingleSelected.includes(e.id)) {

    //       var filteredAry = props.addOnSingleSelected.filter(e => e !== e.id)
    //       props.setAddOnSingleSelected(filteredAry)

    // }
    // else{
    //   props.setAddOnSingleSelected(oldArray => [...oldArray, e.id])

    // }
console.log('selected',selected)

      setSelected([e.id]);

     
  };
  return (
    <View style={{backgroundColor: 'transparent', flex: 1, width: '95%'}}>
      {/* <Text style={{ fontFamily: FontFamily.ExpoArabicSemiBold, marginLeft: 27, marginTop: 30, fontSize: 15 }}>Crust</Text> */}
      <RadioButtonRN
        data={props.addOnListData}
        selectedBtn={e => selectedBtn(e)}
        textColor="#9c3825"
        textStyle={{
          fontFamily: FontFamily.ExpoArabicBook,
          fontSize: 15,
          color: '#972C26',
        }}
        deactiveColor={'#9c3825'}
        activeColor={'#9c3825'}
        circleSize={10}
        style={{
          backgroundColor: 'transparent',
          paddingBottom: 10,
          paddingTop: 2,
        }}
        initial={1}
        box={true}
        boxStyle={{backgroundColor: '#fff'}}
        icon={
          <Image
            source={require('../../assets/icons/radio1.png')}
            style={{height: 18, width: 18}}
          />
        }
      />
    </View>
  );
};
export default Crust;
