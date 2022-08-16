import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {TokenContext} from '../components/context';
import {FontFamily} from './reusableComponents/Constants';
import {
  addCart,
  getCart,
  removeAllCart,
  removeCart,
} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

const AddButton = props => {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();

  // console.log('props.itemDatassssss', props.itemData.custom);

  const removeAllCartApi = () => {
    removeAllCart(token.token.deviceId)
      .then(async function (response) {
        {
          response.data.status === 1
            ? Snackbar.show({
                text: 'Removed cart item',
                duration: Snackbar.LENGTH_SHORT,
              })
            : null;
        }

  
        if (response.data.status === 1) {
          props.cartListApiCall();
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: null,
          });
          await AsyncStorage.setItem('restaurentId', '');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addToCart = () => {
    props.setQuantityLoading(true);

    addCart(
      props.itemData.restaurant_id,
      token.token.userToken,
      props.itemData.id,
      token.token.deviceId,
      '',
    )
      .then(async function (response) {
        console.log(response.data.message);
        props.menuListApiFun();

        {
          response.data.status === 1 ? props.setQuantityLoading(false) : null;
        }

        if (response.data.status === 1) {
          await AsyncStorage.setItem(
            'restaurentId',
            JSON.stringify(props.itemData.restaurant_id),
          );

          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: props.itemData.restaurant_id,
          });

          props.cartListApiCall(props.itemData.restaurant_id);

        }


        // const restaurentId = await AsyncStorage.getItem('restaurentId');

     
      })
      .catch(function (error) {
        console.log(error);
        alert('Error');
        props.setQuantityLoading(false);
      });
  };
  const stepperButtonChecker = () => {
    {
      props.itemData.restaurant_id === parseInt(token.token.restaurentId) ||
      token.token.restaurentId === null
        ? props.navigation.navigate('ItemDetailStepperScreen', {
            // restaurant_id: props.itemData.restaurant_id,
            // menu_id: props.itemData.id,
            // menu_image: props.itemData.image,
            itemData:props?.itemData
          })
        : showAlert();
    }
  };

  const showAlert = () =>
    Alert.alert(
      'Replace cart item?',
      'Your cart contains some items. Do you want to remove item from cart?',
      [
        {
          text: 'NO',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => removeAllCartApi(),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  return (
    <TouchableOpacity
      onPress={() => {
        {
          // console.log(
          //   'props.itemData.restaurant_id',
          //   props.itemData.restaurant_id,
          // );
          console.log(typeof(props.itemData.restaurant_id))
          console.log(typeof(token.token.restaurentId))

          
          // console.log('token.token.restaurentId', token.token.restaurentId);
          // console.log('props.itemData.restaurant_id === token.token.restaurentId',props.itemData.restaurant_id === token.token.restaurentId)
          // console.log('token.token.restaurentId === null',token.token.restaurentId === null)

          // console.log('props.itemData.restaurant_id === token.token.restaurentId',props.itemData.restaurant_id === token.token.restaurentId ||
          //   token.token.restaurentId === null)

          props.itemData.type === 'custom'
            ? stepperButtonChecker()
            : props.itemData.restaurant_id === parseInt(token.token.restaurentId) ||
              token.token.restaurentId === null
            ? addToCart()
            : showAlert();
          // props.menuListApiFun();
        }
      }}>
      <LinearGradient
        colors={['#FF0E00', '#4C1613']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.addButtonView}>
        {props.quantityLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={[
              styles.addButtonText,
              {
                color: '#fff',
              },
            ]}>
            {t('Add')}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F9F9F9',
    width: '95%',
    shadowColor: '#999',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowOpacity: 0.8,
    //   shadowRadius: 2,
    //   elevation: 5, marginVertical: 10,
  },
  titleView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 13,
  },

  card: {
    marginVertical: 10,
    flexDirection: 'row',

    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  cardImgWrapper: {
    flex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImg: {
    height: 100,
    width: 100,

    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  cardInfo: {
    flex: 2,

    justifyContent: 'center',

    borderLeftWidth: 0,

    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,

    fontSize: 16,
    color: '#2F2519',
  },
  cardDetails: {
    fontSize: 20,
    color: '#9c3825',
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },

  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 16,
  },

  addButtonView: {
    flexDirection: 'row',
    height: 27,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 20,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: FontFamily.ExpoArabicBook,
  },
  buttonMainContainer: {
    backgroundColor: 'transparent',
    flex: 2,
    justifyContent: 'flex-end',
  },
  IncDecButton: {
    flexDirection: 'row',
    height: 27,
    width: 85,

    borderRadius: 5,

    marginBottom: 15,
    marginLeft: 20,
    backgroundColor: 'transparent',
  },
  countControllerView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  plusText: {
    fontSize: 20,
    color: '#fff',
  },
  minusText: {
    color: '#fff',
    fontSize: 27,
    fontFamily: FontFamily.ExpoArabicBook,
  },
});
