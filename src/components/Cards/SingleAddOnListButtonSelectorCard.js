import React, {Component, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import {FontFamily} from '../reusableComponents/Constants';
import {useTranslation} from 'react-i18next';


export default function SingleAddOnListButtonSelectorCard({
  selector,
  item,
  onSelect,
  onSelectIndex,
  index,
  singleDataIndex,
  setOnSelectItemWithIndex
}) {
  const {t, i18n} = useTranslation();


    const [defaultSelected, setDefaultSelected] = useState([]);

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
          paddingVertical: 10,
          width: '100%',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: '#9c3825',
        }}
        onPress={() => {
          onSelect(item.id);
          onSelectIndex(index);
          setOnSelectItemWithIndex({
              index:singleDataIndex, id:item?.id
          })
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          {selector ? (
            <Image
              source={require('../../assets/icons/radio1.png')}
              style={{height: 20, width: 20}}
            />
          ) : (
            <Image
              source={require('../../assets/icons/radio2.png')}
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
          <View
            style={{
              marginLeft: 30,
              marginVertical: 10,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 15,
                color: '#972C26',
              }}>
              {item.price} {t('SAR')}
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
