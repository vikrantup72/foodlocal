import React, {useRef, useState, useEffect} from 'react';
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
  SafeAreaView,
  FlatList,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import LinearGradient from 'react-native-linear-gradient';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import CartListCard from '../components/Cards/CartListCard';

import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {TokenContext} from '../components/context';
import {CartContext} from '../components/context';
import CustomButton from '../components/reusableComponents/CustomButton';
import {FontFamily} from '../components/reusableComponents/Constants';
import {
  getCart,
  placeOrder,
  removeAllCart,
  removePromo,
} from '../services/apis/api';
import {useIsFocused} from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';
import {showLoginAlert} from '../utils/showAlert';
import BillCard from '../components/Cards/BillCard';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CartScreen = props => {
  const isFocused = useIsFocused();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeAllLoading, setRemoveAllLoading] = useState(false);

  // console.log('cart.cart_total_amount',cart.data.cart_total_amount)
  // console.log('cart.data', cart.data);
  const cartConsumer = React.useContext(CartContext);
  const token = React.useContext(TokenContext);
  // console.log('CartContext', cartConsumer.cartProvider.cartData.cartdata);
  const {i18n, t} = useTranslation();
  console.log('sssssssssss', token?.token?.sceduleOrderDate.length);

  const [value, onChangeText] = React.useState({text: ''});
  const [isModalVisible, setModalVisible] = useState(false);
  const [delivery, setDelivery] = useState(30);
  const [tax, setTax] = useState(50);
  const [discount, setDiscount] = useState(50);
  const [updateCartLoader, setUpdateCartLoader] = useState(false);
  const [orderNowLoader, setOrderNowLoader] = useState(false);

  const [isModalVisibleDate, setModalVisibleDate] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [fetchApi, setFetchApi] = useState(false);
  const [menuIds, setMenuIds] = useState([]);
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dailyEndshow, setDailyEndShow] = useState(false);
  const showDailyDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const onDailyChange = (event, selectedDate) => {
    //  console.log('selectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const removeAllCartApi = () => {
    removeAllCart(token.token.deviceId)
      .then(async function (response) {
        setRemoveAllLoading(false);
        cartListApiCall();
        if (response.data.status === 1) {
          token.dispatch({
            type: 'CART_SET',
            cartData: response?.data?.data || [],
          });
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: null,
          });
          await AsyncStorage.setItem('restaurentId', '');
        }
      })
      .catch(function (error) {
        console.log(error);
        setRemoveAllLoading(false);
      });
  };

  console.log('dddd', moment(date).format('DD/MM/YYYY'));
  const cartListApiCall = () => {
    console.log('token.token.restaurentId', token.token.restaurentId);
    console.log(
      'token.token.promoAppliedData',
      token?.token?.promoAppliedData?.data?.id,
    );
    getCart(
      token.token.userToken,
      parseInt(token.token.restaurentId),
      i18n.language === 'en' ? 'en' : 'ar',
      token.token.deviceId,
      token.token.promoAppliedData === null
        ? ''
        : token?.token?.promoAppliedData?.data?.id,
    )
      .then(response => {
        console.log('cartresponse.datas', JSON.stringify(response?.data));

        response?.data?.data?.cart_list?.forEach(element => {
          // console.log('sss',element?.menu?.id)

          menuIds.push(element?.menu?.id);
        });
        setCart(response.data);
        if (response.data.status == 1) {
          setFetchApi(true);
        } else {
          setFetchApi(false);
        }

        setUpdateCartLoader(false);
        setLoading(true);
        token.dispatch({
          type: 'CART_SET',
          cartData: response?.data?.data || [],
        });
      })
      .catch(error => {
        console.log('errorss', error);
        setUpdateCartLoader(false);
        setLoading(true);
      });
  };

  useEffect(() => {
    cartListApiCall();
  }, [isFocused, token?.token?.promoAppliedData]);

  const removePromoApi = () => {
    removePromo(token.token.userToken, token.token.promoAppliedData.data.code)
      .then(response => {
        console.log('removePromoApiresponse', response.data);

        alert(response.data.message);

        if (response.data.status === 1) {
          token.dispatch({
            type: 'SET_PROMO_DATA',
            promoAppliedData: null,
          });
        }
      })
      .catch(error => {
        console.log('removePromoApierror', error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalDate = () => {
    setModalVisibleDate(!isModalVisibleDate);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <CartListCard
          itemData={item}
          cartListApiCall={cartListApiCall}
          updateCartLoader={updateCartLoader}
          setUpdateCartLoader={setUpdateCartLoader}
          navigation={props.navigation}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}

      {!loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : fetchApi ? (
        <View>
          <View style={{backgroundColor: 'transparent', flex: 8}}>
            <ScrollView>
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <FlatList
                  data={cart ? cart?.data?.cart_list : []}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item.id.toString()}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  removeAllCartApi();
                  setRemoveAllLoading(true);
                }}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: 330,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 7,
                    marginVertical: 20,
                  }}>
                  {removeAllLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: FontFamily.ExpoArabicSemiBold,
                        color: '#fff',
                      }}>
                      {t('Removeallcart')}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  flex: 2,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}>
                {token.token.promoAppliedData === null ? (
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() =>
                      props.navigation.navigate('PromocodeScreen')
                    }>
                    <View
                      style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: '#FFD7D5',
                        borderRadius: 5,
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#972C26',
                          fontFamily: FontFamily.ExpoArabicSemiBold,
                          fontSize: 16,
                        }}>
                        {t('addPromocode')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      width: '90%',
                      height: 60,
                      backgroundColor: '#FFD7D5',
                      borderRadius: 5,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                      }}>
                      <View>
                        <Image
                          source={require('../assets/icons/discount.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>

                      <View style={{marginLeft: 30}}>
                        <Text
                          style={{
                            color: '#972C26',
                            fontFamily: FontFamily.ExpoArabicSemiBold,
                            fontSize: 16,
                          }}>
                          {token.token.promoAppliedData.data.code}
                        </Text>
                        <Text
                          style={{
                            color: '#972C26',
                            fontFamily: FontFamily.ExpoArabicBook,
                            fontSize: 14,
                          }}>
                          Discount{' '}
                          {token?.token?.promoAppliedData?.data?.discount}{' '}
                          Succesfull
                        </Text>
                      </View>
                      <View style={{marginLeft: 90}}>
                        <TouchableOpacity onPress={() => removePromoApi()}>
                          <Image
                            source={require('../assets/icons/remove.png')}
                            style={{height: 25, width: 25}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}

                <BillCard
                  amount_without_tax={cart?.data?.amount_without_tax}
                  delivery_charge={cart?.data?.delivery_charge}
                  igst={cart?.data?.igst}
                  discount={cart?.data?.discount}
                  cart_total={cart?.data?.cart_total}
                />
                
              </View>

              <View style={{backgroundColor: 'transparent', flex: 3}}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback onPress={toggleModal}>
                    <View
                      style={{backgroundColor: 'transparent', marginTop: 15}}>
                      <View style={styles.addDeliveryInstView}>
                        <Text
                          style={{fontFamily: FontFamily.ExpoArabicSemiBold}}>
                          {t('AddDeliveryInstruction')}
                        </Text>
                        <Image
                          source={require('../assets/icons/note.png')}
                          style={{height: 25, width: 25, marginLeft: 15}}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableOpacity
                  onPress={
                    () => {
                      token.token.userToken
                        ? props.navigation.navigate('AddressListScreen', {
                            instructions: instructions,
                          })
                        : showLoginAlert(
                            props?.navigation,
                            t('loginRequired'),
                            t('doYouWantToLogin'),
                            'SignInScreen',
                          );
                    }
                  }
                   >
                    <LinearGradient
                      colors={['#FF0E00', '#4C1613']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={{
                        width: 330,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        marginVertical: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: FontFamily.ExpoArabicSemiBold,
                          color: '#fff',
                        }}>
                        {t('OrderNow')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'transparent',
                      paddingHorizontal: 100,
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}>
                    <TouchableOpacity
                       onPress={() =>
                        token.token.userToken
                          ? props.navigation.navigate('Subscription', {
                              menuIds: menuIds,
                            })
                          : showLoginAlert(
                              props?.navigation,
                              t('loginRequired'),
                              t('doYouWantToLogin'),
                              'SignInScreen',
                            )
                      }
                      >
                      <LinearGradient
                        colors={['#FF0E00', '#4C1613']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{
                          width: 125,
                          height: 45,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 7,
                        }}>
                        {orderNowLoader ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: FontFamily.ExpoArabicSemiBold,
                              color: '#fff',
                            }}>
                            {t('Subscribe')} 
                          </Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>

                    {show && (
                      <DateTimePicker
                        style={{width: '100%'}}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onDailyChange}
                      />
                    )}
                    <TouchableOpacity
                      onPress={
                        () => {
                          if (token.token.userToken) {
                            token.dispatch({
                              type: 'SET_SCEDULE_ORDER_DATE',
                              sceduleOrderDate: moment(date)
                                .format('DD/MM/YYYY')
                                .toString(),
                            });

                            props.navigation.navigate('AddressListScreen', {
                              instructions: instructions,
                            });
                          } else {
                            showLoginAlert(
                              props?.navigation,
                              t('loginRequired'),
                              t('doYouWantToLogin'),
                              'SignInScreen',
                            );
                          }
                     
                        }
                      }>
                      <LinearGradient
                        colors={['#FF0E00', '#4C1613']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{
                          width: 190,
                          height: 45,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 7,
                          flexDirection: 'row',
                          marginLeft: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            showDailyDatepicker();
                          }}>
                          <Image
                            title="Show date picker!"
                            source={require('../assets/icons/calendar-white.png')}
                            style={{height: 25, width: 25}}
                          />
                        </TouchableOpacity>

                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: FontFamily.ExpoArabicSemiBold,
                            color: '#fff',
                            marginLeft: 10,
                          }}>
                          {t('SceduleOrder')}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <Modal
            isVisible={isModalVisible}
            // useNativeDriver={true}
          >
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                height: 250,
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <TextInput
                placeholder={t('addDescription')}
                style={{
                  // borderColor: 'gray',
                  // borderWidth: 1,

                  height: 200,
                  width: '95%',
                  backgroundColor: 'transparent',
                  paddingBottom: 160,
                  marginHorizontal: 15,
                  fontSize: 15,
                }}
                value={value}
                numberOfLines={4}
                maxLength={500}
                multiline={true}
                onChangeText={val => setInstructions(val)}
              />

              <TouchableOpacity onPress={toggleModal}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 125,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      color: '#fff',
                    }}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Modal>

        
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         
          <Image
            source={require('../assets/icons/cartEmpty.png')}
            style={{height: 200, width: 219}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
    borderBottomRightRadius: 70,
    borderWidth: 1,
    borderBottomLeftRadius: 70,
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  descriptionStyle: {
    color: '#CCCCCC',

    fontSize: 15,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#2F2519',
    fontSize: 16,
  },
  card: {
    height: 120,

    flexDirection: 'row',

    backgroundColor: 'transparent',

    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  cardImgWrapper: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardImg: {
    height: 90,
    width: 90,

    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  cardInfo: {
    flex: 2,

    borderLeftWidth: 0,

    backgroundColor: 'transparent',
    height: 100,
    justifyContent: 'center',
    marginLeft: 25,
  },

  cardDetails: {
    fontSize: 20,
    color: '#9c3825',
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  signIn: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  textSign: {
    fontSize: 15,
  },
  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 16,
  },
  deliveryTimeStyle: {
    fontFamily: FontFamily.ExpoArabicBook,
    color: '#CCCCCC',
    fontSize: 13,
  },
  dateAndTimeButton: {
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  priceText: {
    color: '#818181',
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 16,
  },
  billContainer: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  addDeliveryInstView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainTitle: {
    color: '#646464',
  },
});
