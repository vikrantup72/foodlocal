import axios from 'axios';
import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TokenContext} from '../../components/context';
import {FontFamily} from '../reusableComponents/Constants';
import Star from '../reusableComponents/Star';
import Snackbar from 'react-native-snackbar';
import { BASE_URL } from '../../services/apis/api';


const RestaurantListCard = ({
  itemData,
  onPress,
  restaurantListApiFun,
  fromSearch
}) => {
  const token = React.useContext(TokenContext);
  // console.log('itemData.favorite', itemData.favorite);

  const setFavouriteFunOff = () => {
    axios
      .post(`${BASE_URL}api/v1/restaurants/remove-favorite`, {
        token: token.token.userToken,
        restaurant_id: itemData.id,
      })
      .then(function(response) {
                restaurantListApiFun();
                Snackbar.show({
                  text: response.data.message,
                  duration: Snackbar.LENGTH_SHORT,
                });
      })
      .catch(function(error) {
        alert('Error');

        console.log('error', error);
      });
  };
  const setFavouriteFunOn = () => {
    axios
      .post(`${BASE_URL}api/v1/restaurants/add-favorite`, {
        token: token.token.userToken,
        restaurant_id: itemData.id,
      })
      .then(function(response) {
        restaurantListApiFun()
        Snackbar.show({
          text: response.data.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(function(error) {
        alert('Error')
        console.log('error', error);
      });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{
              uri:  `${BASE_URL}${itemData.image}`,
            }}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text numberOfLines={2} style={[styles.cardTitle,{marginTop:'3%'}]}>
            {/* {itemData.name} */}
            {itemData.name}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: '#972C26',
              fontSize: 14,
              fontFamily: FontFamily.ExpoArabicBook,
            }}>
            {itemData.description}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <FontAwesome name="star" size={16} color="#FFC107" /> */}
            {/* <Text style={styles.ratingStyle}>{itemData.rating}</Text> */}
            <Star rating={itemData?.rating}/>
          </View>
          <Text style={styles.cardDetails}>{itemData.deliveryTime}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#F9F9F9',
            marginRight: 10,
            height: '85%',
            justifyContent: 'space-between',
          }}>
            
          {token.token.userToken&&!fromSearch?<View style={{}}>
            {itemData.favorite === 'Yes' ? (
              <TouchableOpacity
                onPress={() => {
                  token.token.userToken?setFavouriteFunOff():alert('Login for set favourite')
                }}>
                <Image
                  source={require('../../assets/icons/like.png')}
                  style={{alignSelf: 'flex-end', height: 20, width: 20}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  token.token.userToken?setFavouriteFunOn():alert('Login for set favourite')
                }}>
                <Image
                  source={require('../../assets/icons/unLike.png')}
                  style={{alignSelf: 'flex-end', height: 20, width: 20}}
                />
              </TouchableOpacity>
            )}
          </View>:null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <FontAwesome5 name="clock" size={20} color="#686868" style={{}} /> */}
            <Text style={styles.timeStyle}>{itemData.delivery_time} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantListCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    //  backgroundColor:"#F9F9F9",
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    borderRadius: 15,
  },
  cardImgWrapper: {
    flex: 2,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  cardImg: {
    height: 100,
    width: 100,

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
    justifyContent: 'space-between',
    height: '88%',
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#972C26',
    fontSize: 16,
  },
  cardDetails: {
    fontSize: 13,
    color: '#686868',
    fontFamily: FontFamily.ExpoArabicBook,
  },
  ratingStyle:{
     marginHorizontal: 8,
                fontSize: 14,
                fontFamily: FontFamily.ExpoArabicBook,
                marginTop:3
  },
  timeStyle:{
    fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 14,
                color: '#686868',
                marginLeft: 10,
  }
});
