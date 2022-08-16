import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {TokenContext} from '../components/context';
import {FontFamily} from './reusableComponents/Constants';
import {
  addCart,
  
  removeCart,
} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {set} from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';

const IncDecButton = props => {
    const {t, i18n} = useTranslation();
    const [buttonDisabled, setButtonDisabled] = useState(false);
  
    const stepperButtonChecker = () => {
      props.navigation.navigate('ItemDetailStepperScreen', {
        // restaurant_id: props.itemData.restaurant_id,
        // menu_id: props.itemData.id,
        // menu_image: props.itemData.image,
        itemData:props?.itemData

      });
    };
    const token = React.useContext(TokenContext);
  
    const incrementCount = () => {
      props.setQuantityLoading(true);
      setButtonDisabled(true);
      addCart(
        props.itemData.restaurant_id,
        token.token.userToken,
        props.itemData.id,
        token.token.deviceId,
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
  
            if (response.data.status === 1) {
              props.cartListApiCall();
            }
            setButtonDisabled(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Error');
          props.setQuantityLoading(false);
        });
    };
  
    const decrementCount = () => {
      props.setQuantityLoading(true);
      removeCart(
        props.itemData.restaurant_id,
        token.token.userToken,
        props.itemData.id,
        token.token.deviceId,
      )
        .then(async function (response) {
          console.log(response.data.message);
          props.menuListApiFun();
          {
            response.data.status === 1 ? props.setQuantityLoading(false) : null;
          }
          if (response.data.status === 1) {
            props.cartListApiCall();
          }
          console.log('props.itemData.quantity', props.itemData.quantity);
          if (props.itemData.quantity === 1) {
            token.dispatch({
              type: 'RESTAURENT_ID_SET',
              restaurentId: null,
            });
            await AsyncStorage.setItem('restaurentId', '');
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Error');
          props.setQuantityLoading(false);
        });
    };
  
    return (
      <LinearGradient
        colors={['#FF0E00', '#4C1613']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.addButtonView}>
        <TouchableOpacity
          onPress={() => {
            decrementCount();
          }}
          disabled={buttonDisabled ? true : false}>
          <View style={styles.countControllerView}>
            {/* <Text style={styles.minusText}>-</Text> */}
            <Image
              source={require('../assets/icons/minus.png')}
              style={{height: 12, width: 12}}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.countView}>
          {/* <ActivityIndicator size="small" color="white" /> */}
  
          {props.quantityLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text
              style={[
                styles.countText,
                {
                  color: '#fff',
                },
              ]}>
              {props.itemData.quantity||props.itemData.cart_quantity}
            </Text>
          )}
        </View>
  
        <TouchableOpacity
          onPress={() => {
            {
              {
                props.itemData.type === 'custom'
                  ? stepperButtonChecker()
                  : incrementCount();
                // props.menuListApiFun();
              }
            }
          }}
          disabled={buttonDisabled ? true : false}>
          <View style={styles.countControllerView}>
            <Image
              source={require('../assets/icons/plus.png')}
              style={{height: 11, width: 11}}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  export default IncDecButton;

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