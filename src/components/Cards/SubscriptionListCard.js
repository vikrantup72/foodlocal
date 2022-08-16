import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { BASE_URL } from '../../services/apis/api';
import {TokenContext} from '../context';
import {FontFamily} from '../reusableComponents/Constants';
import Star from '../reusableComponents/Star';
import Snackbar from 'react-native-snackbar';
import { t } from 'i18next';

const SubscriptionListCard = ({itemData, onPress, restaurantListApiFun}) => {
  const token = React.useContext(TokenContext);

  const butonClickOpacity = .7
 
  return (
    <TouchableOpacity activeOpacity={butonClickOpacity}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            backgroundColor: '#F9F9F9',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomWidth: 0.3,
              borderColor: '#686868',
            }}>
            <Text style={[styles.cardDetails, {marginTop: 0}]}>
              Subscription:{' '}
            </Text>
            <Text style={styles.subscriptionType}>{itemData?.subscription_type} {itemData?.days===null?"":(itemData?.days)}</Text>
          </View>
          
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{
                uri: `${BASE_URL}${itemData?.image}`,
              }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text
              numberOfLines={1}
              style={[
                styles.cardTitle,
                {fontFamily: FontFamily.ExpoArabicBook, fontSize: 15},
              ]}>
              {itemData?.name}
            </Text>

            <Text numberOfLines={1} style={styles.cardTitle}>
              {itemData?.restaurant_name}
            </Text>
            {/* <Text
              numberOfLines={1}
              style={{
                color: '#972C26',
                fontSize: 14,
                marginTop: 3,
                fontFamily: FontFamily.ExpoArabicBook,
              }}>
              500 mi Pouchs
            </Text> */}

            <Text numberOfLines={1} style={styles.cardDetails}>
              Qty:{itemData?.quantity}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={1} style={styles.cardDetails}>
                {itemData?.deliveryTime}Mrp:
              </Text>

              <Text style={[styles.subscriptionType, {marginTop: 2}]}> {itemData?.price}</Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            backgroundColor: '#F9F9F9',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderTopWidth: 0.3,
              borderColor: '#686868',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}activeOpacity={butonClickOpacity}onPress={()=>alert('Clicked')}>
              <Image
                source={require('../../assets/icons/edit-red.png')}
                style={styles.icons}
              />
              <Text style={styles.buttons}>MODIFY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.2,
                justifyContent: 'center',
              }}activeOpacity={butonClickOpacity}onPress={()=>alert('Clicked')}>
              <Image
                source={require('../../assets/icons/bin.png')}
                style={styles.icons}
              />
              <Text style={styles.buttons}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }} activeOpacity={butonClickOpacity}onPress={()=>alert('Clicked')}>
              <Image
                source={require('../../assets/icons/pause.png')}
                style={styles.icons}
              />
              <Text style={styles.buttons}>PAUSE</Text>
            </TouchableOpacity>
          </View>
        </View> */}

         <View
          style={{
            backgroundColor: '#F9F9F9',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderTopWidth: 0.3,
              borderColor: '#686868',
              justifyContent: 'space-around',
            }}>
             <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderColor: '#686868',
            }}>
            <Text style={[styles.cardDetails, {marginTop: 0}]}>
              {t('startDate')}:
            </Text>
            <Text style={styles.subscriptionType}>{' '}{itemData?.start_date}</Text>
          </View>
           
            <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderColor: '#686868',
            }}>
            <Text style={[styles.cardDetails, {marginTop: 0}]}>
              {t('endDate')}:
            </Text>
            <Text style={styles.subscriptionType}>{' '}{itemData?.end_date}</Text>
          </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionListCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    //  backgroundColor:"#F9F9F9",
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    padding: 10,
  },
  cardImgWrapper: {
    flex: 1,

    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  cardImg: {
    height: 75,
    width: 75,

    borderRadius: 8,

    // backgroundColor:"green"
  },
  cardInfo: {
    flex: 2,

    borderColor: '#ccc',

    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#F9F9F9',
    marginLeft: 20,
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#972C26',
    fontSize: 18,
    marginTop: 2,
  },
  cardDetails: {
    fontSize: 13,
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicBook,
    marginTop: 2,
  },
  subscriptionType: {
    fontSize: 13,
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  buttons: {
    fontSize: 13,
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  icons: {height: 12, width: 12, marginBottom: 2, marginRight: 5},
});
