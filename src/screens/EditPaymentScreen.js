import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';

import CustomButton from '../components/reusableComponents/CustomButton';
import {useTranslation} from 'react-i18next';
import {
  Colors,
  FontFamily,
  FontSize,
} from '../components/reusableComponents/Constants';
import {
  createOrderToken,
  createChargeAmount,
  placeOrder,
} from '../services/apis/api';
import {TokenContext} from '../components/context';
import {t} from 'i18next';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-community/async-storage';

const PaymentCard = () => {
  return (
    <View style={{flex: 1, marginTop: 40, backgroundColor: 'transparent'}}>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: FontFamily.ExpoArabicMedium,

            color: '#972C26',
            backgroundColor: 'transparent',

            marginBottom: 14,
            marginLeft: 25,
          }}>
          Your Saved Card
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            backgroundColor: '#FFD7D5',
            borderRadius: 15,
            height: '100%',
            width: '80%',
            marginLeft: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',

                color: '#972C26',

                marginLeft: 20,
              }}>
              Bankname
            </Text>
            <Image
              style={{
                borderRadius: 10,
                height: 25,
                marginRight: 20,
                width: 60,
              }}
              source={require('../assets/visa.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontStyle: 'normal',

                color: '#972C26',

                marginLeft: 20,
                marginTop: 14,
              }}>
              **** **** **** 3067
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 15,
              paddingBottom: 25,
            }}>
            <View>
              <View>
                <Text
                  style={{
                    color: '#972C26',
                    fontWeight: 'bold',
                    fontSize: 8,
                  }}>
                  CARDHOLDER NAME
                </Text>
              </View>
              <View>
                <Text style={{color: '#972C26', fontSize: 16}}>Jhon Doe</Text>
              </View>
            </View>

            <View style={{marginLeft: 40}}>
              <View>
                <Text
                  style={{
                    color: '#972C26',
                    fontWeight: 'bold',
                    fontSize: 8,
                  }}>
                  {t('ExpirationDate')}
                </Text>
              </View>
              <View>
                <Text style={{color: '#972C26', fontSize: 16}}>05/2021</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'space-around', marginRight: 5}}>
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#972C26',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Image
              style={{
                borderRadius: 3,
                height: 20,
                width: 20,
                alignSelf: 'center',
              }}
              source={require('../assets/icons/edit.png')}
            />
          </View>

          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#972C26',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Image
              style={{
                borderRadius: 3,
                height: 20,
                width: 20,
                alignSelf: 'center',
              }}
              source={require('../assets/icons/add.png')}
            />
          </View>

          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#972C26',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Image
              style={{
                borderRadius: 3,
                height: 20,
                width: 20,
                alignSelf: 'center',
                marginLeft: 4,
              }}
              source={require('../assets/icons/delete.png')}
            />
          </View>
        </View>
      </View>

      <View style={{backgroundColor: 'transparent', marginTop: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/icons/money.png')}
            style={{height: 30, width: 30}}
          />

          <Text
            style={{
              fontFamily: FontFamily.ExpoArabicMedium,
              fontSize: 18,
              marginLeft: 10,
              color: '#972C26',
            }}>
            {t('cashOnDelivery')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function EditPaymentScreen({navigation}) {
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);
  const [orderNowLoader, setOrderNowLoader] = useState(false);

  const [checked, setChecked] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(0);
  const [randomId, setRandomId] = useState('');

  React.useEffect(() => {
    const randomId = uuid.v4();
    setRandomId(randomId);
  }, []);
  const [data, setData] = React.useState({
    cardNumber: '4508750015741019',
    month: '7',
    year: '2022',
    cvv: '100',
    cardHolderName: 'demo',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  // console.log('cardNumber',data.cardNumber)
  // console.log('month',data.month)

  // console.log('year',data.year)
  // console.log('cvv',data.cvv)
  // console.log('cardHolderName',data.cardHolderName)

  const [createOrderTokenLoader, setCreateOrderTokenLoader] = useState(false);
  const [dateDevider, setDateDevider] = useState(false);
  const [orderProcess, setOrderProcess] = useState(0);

  const yearRef = useRef();
  const cardNumberTextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        cardNumber: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        cardNumber: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const expiryDateMonthTextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        month: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        month: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const expiryDateYearTextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        year: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        year: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const cvvTextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        cvv: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        cvv: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const cardHolderNameTextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        cardHolderName: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        cardHolderName: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const placeOrderApi = () => {
    setCreateOrderTokenLoader(true);
    placeOrder(
      token.token.userToken,
      token.token.restaurentId,
      token.token.promoAppliedData === null
        ? ''
        : token.token.promoAppliedData.data.id,
      paymentMethod,
      token.token.paymentInstruction,
      token.token.addressId,
      token?.token?.sceduleOrderDate,
      token.token.deviceId,
    )
      .then(async function (response) {
        if (response?.data?.status === 1) {
          paymentMethod === 1
            ? createOrderTokenApi(response?.data?.data)
            : navigation.navigate('PaymentDoneScreen', {
                orderSuccessData: response.data.data,
              });
        }

        {
          response?.data?.status === 1
            ? token.dispatch({
                type: 'SET_PROMO_DATA',
                promoAppliedData: null,
              })
            : null;
        }

        if (response.data.status === 1) {
          token.dispatch({
            type: 'CART_SET',
            cartData: null,
          });
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: null,
          });
          await AsyncStorage.setItem('restaurentId', '');
        }

        setCreateOrderTokenLoader(false);
      })
      .catch(function (error) {
        setCreateOrderTokenLoader(false);

        // setLoader(true);
        // setQuantityLoading(false);
      });
  };

  const createOrderTokenApi = placeOrderResponse => {
    createOrderToken(
      token.token.userToken,
      data.cardNumber,
      data.month,
      data.year,
      data.cvv,
      '192.168.1.20',
      placeOrderResponse?.order_no,
    )
      .then(function (response) {
        // console.log('response.datassssssssssssssasas',response.data)
        // {response.data.status===1 ? setOrderToken(response.data.data.id): null }
        // {response.data.status===1 ? setOrderProcess(1): null }
        {
          response.data.status === 1
            ? createChargeAmountApi(response.data.data.id, placeOrderResponse)
            : null;
        }

        setCreateOrderTokenLoader(false);
      })
      .catch(function (error) {
        setCreateOrderTokenLoader(false);
      });
  };

  const createChargeAmountApi = (orderToken, placeOrderResponse) => {
    //token,payment_token,amount,order_no,transaction_no
    setCreateOrderTokenLoader(true);
    createChargeAmount(
      token.token.userToken,
      orderToken,
      placeOrderResponse?.total,
      placeOrderResponse?.order_no,
      randomId,
    )
      .then(function (response) {
        // {response.data.status===1?alert('1'):alert('2')}
        navigation.navigate('PaymentWebView', {
          url: response.data.data.transaction.url,
          placeOrderResponse: placeOrderResponse,
        });
        // console.log('response.data.data.transaction.url)',response.data.data.transaction.url)
        setCreateOrderTokenLoader(false);
      })
      .catch(function (error) {
        setCreateOrderTokenLoader(false);
      });
  };

  useEffect(() => {
    if (data.month.length === 2) yearRef.current.focus();
  }, [data.month]);

  const cardDetail = () => {
    return (
      <View
        style={{
          justifyContent: 'space-around',
        }}>
        <View style={styles.action}>
          <Text style={styles.credentialText}>{t('CardNumber')}</Text>

          <TextInput
            placeholder="1234   5678    3456    2456"
            placeholderTextColor={Colors.lightPrimary}
            style={styles.textInput}
            keyboardType="number-pad"
            maxLength={16}
            autoCapitalize="none"
            onChangeText={val => cardNumberTextInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'transparent',
              borderBottomColor: '#a35450',
              justifyContent: 'center',

              marginTop: 15,
              width: '50%',
            }}>
            <Text style={styles.credentialText}>{t('ExpirationDate')}</Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                borderWidth: 0.3,
                borderColor: Colors.primary,
                borderRadius: 4,
                paddingVertical: 8,
              }}>
              <TextInput
                placeholder="SS"
                placeholderTextColor={Colors.lightPrimary}
                style={{
                  color: '#972C26',
                  fontFamily: FontFamily.ExpoArabicMedium,
                  fontSize: 13,

                  paddingLeft: 10,
                }}
                keyboardType="number-pad"
                maxLength={2}
                autoCapitalize="none"
                onChangeText={val => expiryDateMonthTextInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                onSubmitEditing={() => yearRef.current.focus()}
              />
              {!dateDevider ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginBottom: 0,
                    fontFamily: FontFamily.ExpoArabicBold,
                    fontSize: 15,
                    color: '#972C26',
                  }}>
                  /
                </Text>
              ) : null}
              <TextInput
                placeholder="YY"
                placeholderTextColor={Colors.lightPrimary}
                style={{
                  color: '#972C26',
                  fontFamily: FontFamily.ExpoArabicMedium,
                  fontSize: 13,
                  width: '65%',
                }}
                keyboardType="number-pad"
                maxLength={4}
                autoCapitalize="none"
                onChangeText={val => expiryDateYearTextInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                ref={yearRef}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#972C26',
              justifyContent: 'center',

              marginLeft: 20,
              marginTop: 15,
              flex: 1,
            }}>
            <Text style={styles.credentialText}>{t('SecurityCode')}</Text>

            <TextInput
              placeholder="123"
              placeholderTextColor={Colors.lightPrimary}
              style={styles.textInput}
              keyboardType="number-pad"
              maxLength={4}
              autoCapitalize="none"
              onChangeText={val => cvvTextInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.action}>
            <Text style={styles.credentialText}>{t('NameOnCard')}</Text>

            <TextInput
              placeholder="Test user"
              placeholderTextColor={Colors.lightPrimary}
              style={styles.textInput}
              maxLength={30}
              autoCapitalize="none"
              onChangeText={val => cardHolderNameTextInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>
          {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={'#972C26'}
                  uncheckedColor={'#972C26'}
                />
                <Text style={styles.credentialText}>SAVE CARD</Text>
              </View> */}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 17,
                color: Colors.primary,
              }}>
              {t('ChooseAPaymentMethod')}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 13,
                color: Colors.primary,
                marginTop: 5,
              }}>
              {t('paymentChooseDiscription')}
            </Text>
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}
            onPress={() => setPaymentMethod(0)}>
            {paymentMethod === 0 ? (
              <Image
                source={require('../assets/icons/radio1.png')}
                style={{height: 20, width: 20}}
              />
            ) : (
              <Image
                source={require('../assets/icons/radio2.png')}
                style={{height: 20, width: 20}}
              />
            )}

            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicMedium,
                fontSize: 15,
                color: Colors.primary,
                marginLeft: 10,
              }}>
              {t('cashOnDelivery')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}
            onPress={() => setPaymentMethod(1)}>
            {paymentMethod === 1 ? (
              <Image
                source={require('../assets/icons/radio1.png')}
                style={{height: 20, width: 20}}
              />
            ) : (
              <Image
                source={require('../assets/icons/radio2.png')}
                style={{height: 20, width: 20}}
              />
            )}

            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicMedium,
                fontSize: 15,
                color: Colors.primary,
                marginLeft: 10,
              }}>
              {t('CreditCard')}
            </Text>
          </TouchableOpacity>

          {paymentMethod === 1 ? cardDetail() : null}

          {/* <PaymentCard /> */}

          <View
            style={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'flex-end',
              alignSelf: 'center',
              paddingVertical: 20,
              marginTop: 50,
            }}>
            <CustomButton
              title={t('Proceed')}
              navigation={navigation}
              onPress={() => placeOrderApi()}
              loading={createOrderTokenLoader}
            />

            {/* <CustomButton
        title="Proceed1"
        navigation={navigation}
        onPress={() => createChargeAmountApi()}
        loading={createOrderTokenLoader}
      /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicMedium,
    borderWidth: 0.3,
    borderColor: Colors.primary,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 4,
    paddingLeft: 10,
  },
  signIn: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
  },
  mainTitle: {
    color: '#646464',
  },

  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  itemTitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#972C26',
  },
  itemContainer: {
    height: 150,
    width: '100%',

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: {width: 1, height: 13},
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  itemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,

    width: '100%',
  },
  action: {
    backgroundColor: 'transparent',
    borderBottomColor: '#972C26',
    justifyContent: 'center',

    marginTop: 15,
    flex: 1,
  },

  credentialText: {
    color: '#972C26',
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 2,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  checkbox: {
    alignSelf: 'center',
    color: '#972C26',
  },
});
