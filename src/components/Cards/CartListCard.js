import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {TokenContext} from '../../components/context';
import {Colors, FontFamily} from '../reusableComponents/Constants';
import {addCart, removeCart} from '../../services/apis/api';
import { BASE_URL } from '../../services/apis/api';
import {useEffect} from 'react';
import { useTranslation } from 'react-i18next'

const CartListCard = ({itemData, cartListApiCall, navigation}) => {
  const {t, i18n} = useTranslation();

  const token = React.useContext(TokenContext);
  const [updateCartLoader, setUpdateCartLoader] = useState(false);
  const [addOnTotalCost, setAddOnTotalCost] = useState([]);

  useEffect(() => {
    let addOnPrice = 0;
    if (itemData?.addons.length > 0) {
      itemData?.addons?.forEach(element => {
        addOnPrice = addOnPrice + element?.price;
      });
    }

    {
      itemData?.menu?.type === 'custom'
        ? setAddOnTotalCost(addOnPrice)
        : setAddOnTotalCost(0);
    }
  }, []);
  // let addOnTotalCost = 0

  console.log('addOnTotalCost', addOnTotalCost);
  // console.log('itemzzDataCart', itemData);
  const increament = () => {
    setUpdateCartLoader(true);

    addCart(
      token.token.restaurentId,
      token.token.userToken,
      itemData.menu.id,
      token.token.deviceId,
    )
      .then(function (response) {
        cartListApiCall();
        {
          response.data.status === 1
            ? setUpdateCartLoader(false)
            : setUpdateCartLoader(true);
        }
        setUpdateCartLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        alert('Error');
        props.setQuantityLoading(false);
      });
  };
  const decreament = () => {
    setUpdateCartLoader(true);

    removeCart(
      token.token.restaurentId,
      token.token.userToken,
      itemData.menu.id,
      token.token.deviceId,
    )
      .then(function (response) {
        cartListApiCall();
        {
          response.data.status === 1
            ? setUpdateCartLoader(false)
            : setUpdateCartLoader(true);
        }
        setUpdateCartLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        alert('Error');
        props.setQuantityLoading(false);
      });
  };
  const stepperButtonChecker = () => {
    navigation.navigate('ItemDetailStepperScreen', {
      itemData: {
        restaurant_id: itemData.menu.restaurant_id,
        id: itemData.menu.id,
        image: itemData.menu.image,
      },
      // restaurant_id: itemData.menu.restaurant_id,
      // menu_id: itemData.menu.id,
      // menu_image: itemData.menu.image,
    });
  };
  const renderAddOns = () => {
    addOnName = [];
    let addOnPrice = 0;
    itemData?.addons?.forEach(element => {
      addOnName.push(element?.name);
      addOnPrice = addOnPrice + element?.price;
    });

    var str = addOnName.toString();
    var res = str.substring(0, 25);

    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 11}}>
          {res}
          {'...'}
        </Text>
        <Text style={{marginLeft: 5, fontSize: 11}}>
          {addOnPrice} {t('SAR')}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri: `${BASE_URL}${itemData?.menu?.image}`}}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.ItemNameView}>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {itemData?.menu?.name}
            </Text>

            <Text numberOfLines={2} style={styles.restaurantNameTextStyle}>
              {itemData?.restaurant?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                marginTop: 7,
              }}>
              <Text style={styles.cardDetails}>
                {itemData?.menu?.price + addOnTotalCost} {t('SAR')}
              </Text>
              <View style={styles.buttonsContainer}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 1, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.signIn}>
                  <TouchableOpacity
                    onPress={() => {
                      decreament();
                    }}>
                    <View style={styles.countController}>
                      <Image
                        source={require('../../assets/icons/minus.png')}
                        style={{height: 12, width: 12}}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.cartTextView}>
                    {updateCartLoader ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text style={styles.textCount}>{itemData?.quantity}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        itemData?.menu?.type === 'custom'
                          ? stepperButtonChecker()
                          : increament();
                        // props.menuListApiFun();
                      }
                    }}>
                    <View style={styles.countController}>
                      <Image
                        source={require('../../assets/icons/plus.png')}
                        style={{height: 11, width: 11}}
                      />
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            {/* {itemData?.addons?.length ? renderAddOns() : null} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartListCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    width: '95%',
    shadowColor: '#000',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    // marginVertical: 10,
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
    flex: 4,

    justifyContent: 'center',

    borderLeftWidth: 0,

    backgroundColor: 'transparent',
  },
  cartTextView: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
  ItemNameView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 13,
  },
  signIn: {
    flexDirection: 'row',
    height: 27,
    width: 85,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 20,
  },
  textCount: {
    fontSize: 15,
    color: '#fff',
  },
  countController: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantNameTextStyle: {
    color: '#686868',
    fontSize: 13,
    fontFamily: FontFamily.ExpoArabicBook,
    marginTop: 2,
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 16,
  },
  plusTextStyle: {
    fontSize: 20,
    color: '#fff',
  },
});
