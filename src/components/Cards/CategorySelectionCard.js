import React, {Component, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {FontFamily} from '../reusableComponents/Constants';
import {deleteAddress} from '../../services/apis/api';
import {TokenContext} from '../context';
import { BASE_URL } from '../../services/apis/api';

export default function CategorySelectionCard({
  navigation,
  selector,
  item,
  onSelect,
  onSelectIndex,
  index,
  addressListApi,
}) {
  
  

    
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
      }}>

<View style={[styles.itemContainer]}>
    <TouchableOpacity  onPress={() => {
          onSelect(item.id);
          onSelectIndex(item.id);
        }} activeOpacity={.9}>
      <View style={[styles.itemView,{borderWidth:selector?3:0,borderColor:selector?'transparent':'transparent',borderRadius: selector?8:0}]}>
        <ImageBackground
          source={{
            uri: `${BASE_URL}${item.image}`,
          }}
          style={{width: '100%', height: '100%',opacity:selector?.5:1}}
          imageStyle={{borderRadius: 5}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={styles.itemTitle}>{item?.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  </View>



      {/* <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical: 5,
          width: '100%',
          alignSelf: 'center',
          
        }}
        onPress={() => {
          onSelect(item.id);
          onSelectIndex(item.name);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          {selector ? (
            <Image
              source={require('../../assets/icons/selectCheck.png')}
              style={{height: 20, width: 20}}
            />
          ) : (
            <Image
              source={require('../../assets/icons/unSelectCheck.png')}
              style={{height: 20, width: 20}}
            />
          )}
          <View
            style={{
              marginLeft: 30,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 15,
                color: '#972C26',
              }}>
              {item.name}
            </Text>
          </View>
        

         
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

 
  
  

  itemTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  itemContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 1.5,
    // elevation: 8,
    // shadowRadius: 20,
    // shadowOffset: { width: 1, height: 13 },
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },
  itemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',

    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
