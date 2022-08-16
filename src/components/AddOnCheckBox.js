


import React, { Component, useState } from 'react'
import { View, Text, Image } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import {FontFamily} from '../components/reusableComponents/Constants'
 
// const fruits = ['Sliced Cheese - 110 calories', 'Beef Bacon - 80 Calories', 'Egg - 80 Calories']
// --- OR ---
// const fruits = [
//   { label: 'Applessss', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

const fruits = 
  [{calorie: 50, value: "salates", id: 17, menus_id: 62, label: "salates", name_arbic: "", price: 20,}, 
  {calorie: 250, value: "coldrink", id: 18,menus_id: 62, label: "coldrink", name_arbic: "", price: 45, }]



 
const renderLabel = (label, style,data) => {

  return (
    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:"center",backgroundColor:"transparent",width:300}}>
      {/* <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} /> */}
      <View style={{marginLeft: 30,backgroundColor:"transparent",justifyContent:"center",flex:1}}>
        <Text style={{fontFamily: FontFamily.ExpoArabicBook, fontSize: 15, color: "#972C26" }}>{label}</Text>
      </View>
      <View style={{marginLeft: 30, marginVertical:10,backgroundColor:"transparent",alignItems:"center",justifyContent:"center",flex:1}}>
        <Text style={{fontFamily: FontFamily.ExpoArabicBook, fontSize: 15, color: "#972C26" }}>(+SR 3.0)</Text>
      </View>
    </View>
  )
}
 
const AddOnCheckBox  =(props)=> {
 const [selectedFruits,setSelectedFruits] = useState([])
 const onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    setSelectedFruits( selectedFruits )
  }
 
 
    return (
      <View style={{width:"95%",}}>
        <SelectMultiple
          items={fruits}
          renderLabel={renderLabel}
          selectedItems={selectedFruits}
          onSelectionsChange={onSelectionsChange}
          selectedCheckboxStyle={{height:20,width:20}} 
          checkboxStyle={{height:20,width:20,marginLeft:7}} 
          checkboxSource={require('../assets/icons/unSelectCheck.png')}
          selectedCheckboxSource={require('../assets/icons/selectCheck.png')}
          style={{borderColor:'transparent',}}
          rowStyle={{marginVertical:5,borderRadius:6}}
          />
      </View>
    )
  
}
export default AddOnCheckBox;