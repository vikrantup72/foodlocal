import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {addAddress, addressListType} from '../services/apis/api';
import {TokenContext} from '../components/context';
import * as Animatable from 'react-native-animatable';
import Choosebutton from '../components/Choosebutton';
import OnErrorText from '../components/reusableComponents/OnErrorText';

const AddNewAddressScreen = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const subLocality = route?.params?.subLocality;
  const address = route?.params?.address;

  const token = React.useContext(TokenContext);
  const [addressLoader, setAddressLoader] = useState(false);
  const [addressListTypeData, setAddressListTypeData] = useState([]);
  const [addressTypeId, setAddressTypeId] = useState(null);

  const addressListTypeApi = () => {    
    addressListType(token.token.userToken, i18n.language === 'en' ? 'en' : 'ar')
      .then(function (response) {
        console.log('addressListTypeApi', response.data);

        setAddressLoader(true);
        setAddressListTypeData(response.data);
        setAddressTypeId(response.data.data[0].id);
      })
      .catch(function (error) {
        console.log('addressListTypeApi', error);
        //   alert('Error')
        setAddressLoader(true);

        // setLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setAddressLoader(true));
  };
  React.useEffect(() => {
    addressListTypeApi();
  }, []);
  const [data, setData] = React.useState({
    firstName: 'Aass',
    lastName: 'Aass',
    mobileNumber: '1234567899',
    secureTextEntry: true,
    email: 'assas@gmail.com',
    address: '',
    city: '',
    state: '',
    appartment: 'ssdsdd',
    pinCode: '',
    country: 'India',
    isValidName: true,
    isvalidLastName: true,
    isValidMobileNumber: true,
    isValidSecureTextEntry: true,
    isValidEmail: true,
    isValidAddress: true,
    isValidCity: true,
    isValidState: true,
    isValidAppartment: true,
    isValidPinCode: true,
    isValidCountry: true,
    loading: false,
  });

  const addressChange = val => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        address: val,
        isValidAddress: true,
      });
    } else {
      setData({
        ...data,
        address: val,
        isValidAddress: false,
      });
    }
  };

  const cityChange = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        city: val,
        isValidCity: true,
      });
    } else {
      setData({
        ...data,
        city: val,
        isValidCity: false,
      });
    }
  };

  const stateChange = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        state: val,
        isValidState: true,
      });
    } else {
      setData({
        ...data,
        state: val,
        isValidState: false,
      });
    }
  };

  const pinCodeChange = val => {
    const reg = /^(\d{4}|\d{6})$/;

    if (val.trim().length >= 4 && reg.test(val)) {
      setData({
        ...data,
        pinCode: val,
        isValidPinCode: true,
      });
    } else {
      setData({
        ...data,
        pinCode: val,
        isValidPinCode: false,
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
  const addAddressApi = () => {
    if (data.address.length === 0) {
      setData({
        ...data,

        isValidAddress: false,
      });
    } else if (!data.isValidAddress) {
      alert('Please check inputs');
    } else {
      setData({...data, loading: true});

      addAddress(
        token?.token?.userToken,
        addressTypeId,
        data?.address,
        'تبوك',

        token?.token?.location?.position?.lat,
        token?.token?.location?.position?.lng,
        address,
      )
        .then(function (response) {
          setData({...data, loading: false});
          console.log('sssassas', response.data);
          {
            response.data.status === 1 ? navigation.goBack() : null;
          }
        })
        .catch(function (error) {
          console.log('addAddresserror', error);
          setData({...data, loading: false});
        });
    }
  };

  return (
    <View style={styles.container}>
      {!addressLoader ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : addressListTypeData ? (
        <ScrollView>
          <View style={{flex: 1, alignSelf: 'center', marginTop: 0}}>
            <View style={{paddingHorizontal: 10, marginBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  style={{height: 22, width: 22}}
                  source={require('../assets/icons/location.png')}
                />
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: FontFamily.ExpoArabicBold,
                    fontSize: 25,
                    marginTop: 4,
                    marginLeft: 5,
                  }}>
                  {subLocality}
                </Text>
              </View>
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: FontFamily.ExpoArabicMedium,
                  marginTop: 2,
                  marginLeft: 5,
                  fontSize: 15,
                }}>
                {address}
              </Text>
            </View>
            <Choosebutton
              addressListTypeData={
                addressListTypeData ? addressListTypeData.data : []
              }
              addressListApi={addressListTypeApi}
              setAddressTypeId={setAddressTypeId}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.addressDetailHead}>
              <Text style={styles.text_header}>{t('AddressDetail')}</Text>
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder={t('EnterFullAdress')}
                placeholderTextColor="#7D7D7D"
                style={[
                  styles.textInput,
                  {
                    color: '#7D7D7D',
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => addressChange(val)}
                multiline={true}
              />
            </View>
            {data.isValidAddress ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={[styles.errorMsg, {marginTop: 5}]}>
                  {t('PleaseEnterValidFullAddress')}
                </Text>
              </Animatable.View>
            )}

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderColor: '#9c3825',

                    marginTop: 30,
                  },
                ]}
                onPress={() => addAddressApi()}>
                <LinearGradient
                  colors={['#4C1613', '#FF0E00']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.button}>
                  {data.loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: '#fff',
                        },
                      ]}>
                      {t('Done')}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <OnErrorText title="No restaurant found" />
      )}
    </View>
  );
};

export default AddNewAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  addressDetailHead: {
    backgroundColor: 'transparent',

    marginTop: 22,
  },
  personalDetailHead: {
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,

    fontSize: 18,
    // marginBottom:-25,
  },
  text_footer: {
    fontFamily: FontFamily.ExpoArabicMedium,
    fontSize: 12,
    paddingLeft: 10,
    color: '#000',
  },
  action: {
    flexDirection: 'row',
    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#F8F8F8',

    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    borderRadius: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 10,
    height: 250,

    // alignContent: 'center',
    // alignItems: 'center',
    fontSize: 12,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  errorMsg: {
    color: '#972C26',
    fontSize: 14,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  englishTextSign: {
    fontSize: 12,
    fontFamily: FontFamily.ExpoArabicMedium,
    color: '#fff',
  },
  arabicTextSign: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  language: {
    marginBottom: 40,
  },
  english: {
    width: '50%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
