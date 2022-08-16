import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../services/apis/api';
import LinearGradient from 'react-native-linear-gradient';
import {TokenContext} from '../../components/context';
import {FontFamily} from '../reusableComponents/Constants';
import {getCart} from '../../services/apis/api';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {set} from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';
import AddButton from '../AddButton';
import IncDecButton from '../IncDecButton';

const ItemListCard = ({
  navigation,
  onPress,
  itemData,
  menuListApiFun,
  restaurantDetail,
  fromSearch,
}) => {
  // console.log('itemData',itemData)
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();

  const [quantityLoading, setQuantityLoading] = useState(false);

  const cartListApiCall = restaurentId => {
    console.log('token.token.restaurentId', token.token.restaurentId);
    console.log('token.token.rest', restaurentId);

    getCart(
      token.token.userToken,
      parseInt(token?.token?.restaurentId) || restaurentId,
      i18n.language === 'en' ? 'en' : 'ar',
      token.token.deviceId,
      token.token.promoAppliedData === null
        ? ''
        : token.token.promoAppliedData.data.id,
    )
      .then(response => {
        console.log('sss', response.data);
        token.dispatch({
          type: 'CART_SET',
          cartData: response.data.data,
        });
      })
      .catch(error => {
        console.log('errorss', error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                // source={require('../../assets/food2.jpg')}
                source={{uri: `${BASE_URL}${itemData?.image}`}}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.titleView}>
                <Text style={[styles.cardTitle,{marginBottom:'3%'}]} numberOfLines={1}>
                  {fromSearch ? itemData?.name : itemData?.menu_name}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    color: '#686868',
                    fontSize: 13,
                    fontFamily: FontFamily.ExpoArabicBook,
                  }}>
                  {fromSearch
                    ? itemData?.description
                    : itemData?.menu_description}
                </Text>
                <Text
                  // numberOfLines={2}
                  style={{
                    color: '#686868',
                    fontSize: 10,
                    fontFamily: FontFamily.ExpoArabicBook,
                  }}>
                  {/* {itemData.sub_category} */}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardDetails}>
                    {itemData?.price} {t('SAR')}
                  </Text>

                  {!fromSearch ? (
                    <View style={{}}>
                      {itemData?.quantity === 0 ? (
                        <AddButton
                          itemData={itemData}
                          navigation={navigation}
                          menuListApiFun={menuListApiFun}
                          quantityLoading={quantityLoading}
                          setQuantityLoading={setQuantityLoading}
                          restaurantDetail={restaurantDetail}
                          cartListApiCall={cartListApiCall}
                        />
                      ) : (
                        <IncDecButton
                          itemData={itemData}
                          navigation={navigation}
                          menuListApiFun={menuListApiFun}
                          quantityLoading={quantityLoading}
                          setQuantityLoading={setQuantityLoading}
                          restaurantDetail={restaurantDetail}
                          cartListApiCall={cartListApiCall}
                        />
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListCard;

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
    flex: 1,
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
