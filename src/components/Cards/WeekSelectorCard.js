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

export default function WeekSelectorCard({
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
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  signIn: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  deleteIconAndEditiconStyle: {
    borderRadius: 3,
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  deleteIconAndEditView: {
    height: 30,
    width: 30,
    backgroundColor: '#972C26',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
