import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL, removeAllCart, reorder} from '../../services/apis/api';
import {Colors, FontFamily} from '../reusableComponents/Constants';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {TokenContext} from '../context';
import Snackbar from 'react-native-snackbar';

const MyOrderListCard = ({itemData, onPress, navigation}) => {
  const {t, i18n} = useTranslation();
  
  const token = React.useContext(TokenContext);
  const [loader, setLoader] = useState(false);
  const [removeCartLoader, setRemoveCartLoader] = useState(false);


  const reorderApi = order_no => {
    setLoader(true);
    reorder(token?.token?.userToken,order_no)
      .then(async response => {
        // console.log('item', itemData);
        console.log('responseresponse?.data', response?.data);
        if (response?.data?.status === 1) {
          await AsyncStorage.setItem(
            'restaurentId',
            JSON.stringify(itemData?.restaurant?.id),
          );

          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: itemData?.restaurant?.id,
          });

          navigation.navigate('CartScreen');
        }
        setLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };

  const removeAllCartApi = () => {
    setRemoveCartLoader(true)
    removeAllCart(token?.token?.deviceId)
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
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: null,
          });
          await AsyncStorage.setItem('restaurentId', '');
        }
        setRemoveCartLoader(false)

      })
      .catch(function (error) {
        setRemoveCartLoader(false)

      });
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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{
                uri: `${BASE_URL}${itemData?.restaurant?.image}`,
              }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                marginLeft: 13,
              }}>
              <Text style={styles.cardTitle}>{itemData?.order_no}</Text>

              <Text
                numberOfLines={2}
                style={{
                  color: '#686868',
                  fontSize: 13,
                  fontFamily: FontFamily.ExpoArabicBook,
                  marginVertical: '5%',
                }}>
                {itemData['order_date&time']}
              </Text>

              <Text style={styles.cardDetails}>
                {itemData?.total} {t('SAR')}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 2,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                width: '90%',
                backgroundColor: 'transparent',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicMedium,
                  fontSize: 10,
                  color: '#339710',
                }}>
                {itemData?.order_status?.name}
              </Text>
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                width: '90%',
                backgroundColor: 'transparent',
              }}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('CartScreen', { itemData: item })}
                // disabled={removeCartLoader||loader?true:false}
                onPress={() => {
                  console.log(
                    'itemData?.restaurant?.id',
                    itemData?.restaurant?.id,
                  );
                  console.log(
                    'parseInt(token.token.restaurentId)',
                    parseInt(token?.token?.restaurentId),
                  );

                  itemData?.restaurant?.id ===
                    parseInt(token?.token?.restaurentId) ||
                  token?.token?.restaurentId === null
                    ? reorderApi(itemData?.order_no)
                    : showAlert();
                }}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 1, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.signIn}>
                  {loader ? (
                    <ActivityIndicator size={'small'} color={Colors.white} />
                  ) : (
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#fff',
                        },
                      ]}>
                      {t('Reorder')}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyOrderListCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f9f8f9',
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
    color: '#fff',
    fontSize: 14,
    color: '#2F2519',
  },
  cardDetails: {
    fontSize: 15,
    color: '#9c3825',
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  signIn: {
    height: 27,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

    paddingVertical: 0,
    marginBottom: 5,
    marginLeft: 20,
  },

  textSign: {
    fontSize: 10,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 16,
  },
});
