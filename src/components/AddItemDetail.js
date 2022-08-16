import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from '../services/apis/api';
import {TokenContext} from '../components/context';
import {FontFamily} from '../components/reusableComponents/Constants';

export default function AddItemDetail(props, {navigation}) {
  const token = React.useContext(TokenContext);

  const {t, i18n} = useTranslation();
  const addToCartApiHandle = () => {
    axios
      .post(`${BASE_URL}api/v1/carts/addCart`, {
        restaurant_id: 1,
        menu_id: 1,
        // quantity: 1,
        token: token.token.userToken,
      })

      .then(function(response) {
        // console.warn('response.data/addCart ', response.data);
        // console.warn('response.data.status ', response.data.status);
        // console.warn('response.data.message', response.data.message);
        // console.warn('response.data.data ', response.data.data);
        // console.log(response.data.message);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <LinearGradient
      colors={['#FF0E00', '#4C1613']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      style={{height: 60, flexDirection: 'row'}}>
      <View style={styles.priceTextContainer}>
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>1 {t('Item')}</Text>
          <Text style={styles.priceText}>|</Text>
          <Text style={styles.priceText}>450 {t('SAR')}</Text>
        </View>
      </View>
      <View style={styles.checkoutTextViewContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CartScreen');
            addToCartApiHandle();
          }}>
          <View style={styles.checkoutTextView}>
            <Text style={styles.checkoutTextStyle}>{t('CHECKOUT')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  priceTextContainer: {
    backgroundColor: 'transparent',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTextView: {
    backgroundColor: 'transparent',
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutTextViewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutTextView: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  checkoutTextStyle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 15,
    color: '#972C26',
  },
  priceText: {
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 19,
    color: '#fff',
  },
});
