import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import {TokenContext} from '../components/context';

import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import CustomButton from '../components/reusableComponents/CustomButton';
import {FontFamily} from '../components/reusableComponents/Constants';
// import messaging from '@react-native-firebase/messaging';
import {BASE_URL} from '../services/apis/api';

const SignInScreen = ({navigation}) => {
  const [t, i18n] = useTranslation();

  const [data, setData] = React.useState({
    loginData: [],
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loading: false,
    userToken: null,
  });

  const [fcmToken, setFcmToken] = useState('');
  console.log('fcmToken', fcmToken);

  

  const token = React.useContext(TokenContext);
  console.log('token.token.deviceId', token.token.deviceId);

  const textInputChange = val => {
    if (i18n.language === 'ar') {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      var emailCre =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValidEmail = emailCre.test(val);
      if (isValidEmail) {
        setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true,
        });
      } else {
        setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false,
        });
      }
    }
  };

  const handlePasswordChange = val => {
    if (i18n.language === 'ar') {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      if (
        val.trim().length >= 8 &&
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/i.test(val)
      ) {
        setData({
          ...data,
          password: val,
          isValidPassword: true,
        });
      } else {
        setData({
          ...data,
          password: val,
          isValidPassword: false,
        });
      }
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = async () => {
    if (i18n.language === 'ar') {
      if (data.username.length === 0) {
        setData({
          ...data,
          isValidUser: false,
        });
      } else if (data.password.length === 0) {
        setData({
          ...data,
          isValidPassword: false,
        });
      } else if (!data.isValidPassword || !data.isValidUser) {
        alert(t('Please check inputs'));
      } else {
        console.warn('2Api Running');
        console.log('token.token.deviceId', token.token.deviceId);
        console.log('fcmToken.length', fcmToken.length?fcmToken:token.token.deviceId);
        setData({...data, loading: true});
        axios
          .post(`${BASE_URL}api/v1/login`, {
            email: data.username,
            password: data.password,
            device_token: fcmToken.length?fcmToken:token.token.deviceId,
            device_id: token.token.deviceId,
          })
          .then(function (response) {
            console.log('data', response.data.data);

            setData({...data, status: response.data.status});

            if (response.data.status === 1) {
              token.dispatch({
                type: 'TOKENSET',
                value: response.data.data.token,
                profileData: response.data.data,
              });
              AsyncStorage.setItem('userToken', response.data.data.token);
              AsyncStorage.setItem(
                'profileData',
                JSON.stringify(response.data.data),
              );
            } else {
              null;
            }
            Snackbar.show({
              text: response.data.message,
              duration: Snackbar.LENGTH_SHORT,
            });
            setData({...data, loading: false});

            if (response.data.status === 0) {
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            } else {
              navigation.replace('Category');
            }
          })
          .catch(function (error) {
            Snackbar.show({
              text: error,
              duration: Snackbar.LENGTH_SHORT,
            });
            setData({...data, loading: false});
          });
      }
    } else {
      if (data.username.length === 0) {
        setData({
          ...data,
          isValidUser: false,
        });
      } else if (data.password.length === 0) {
        setData({
          ...data,
          isValidPassword: false,
        });
      } else if (!data.isValidPassword || !data.isValidUser) {
        alert(t('Please check inputs'));
      } else {
        console.warn('Api Running');
        console.log('fcmToken.length', fcmToken.length?fcmToken:token.token.deviceId);
        setData({...data, loading: true});
        axios
          .post(`${BASE_URL}api/v1/login`, {
            email: data.username,
            password: data.password,
            device_token: fcmToken.length?fcmToken:token.token.deviceId,
            device_id: token.token.deviceId,
          })
          .then(function (response) {
            console.log('data', response.data.data);

            setData({...data, status: response.data.status});

            if (response.data.status === 1) {
              token.dispatch({
                type: 'TOKENSET',
                value: response.data.data.token,
                profileData: response.data.data,
              });
              AsyncStorage.setItem('userToken', response.data.data.token);
              AsyncStorage.setItem(
                'profileData',
                JSON.stringify(response.data.data),
              );
            } else {
              null;
            }
            Snackbar.show({
              text: response.data.message,
              duration: Snackbar.LENGTH_SHORT,
            });
            setData({...data, loading: false});

            if (response.data.status === 0) {
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            } else {
              navigation.replace('Category');
            }
          })
          .catch(function (error) {
            Snackbar.show({
              text: error,
              duration: Snackbar.LENGTH_SHORT,
            });
            setData({...data, loading: false});
          });
      }
    }
  };

  const ref_input2 = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/loginBackground.jpg')}
        style={{width: '100%', height: '100%', borderRadius: 100}}>
        {/* <StatusBar backgroundColor='#FF6347' barStyle="light-content" /> */}
        <View style={styles.header}>
          <Text style={styles.text_header}>{t('LogIn')}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.language}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/icons/language.png')}
              />

              <Text style={styles.text_footer}>{t('ChooseYourLanguage')}</Text>
            </View>
            <View style={{}}>
              <View style={styles.switcherContainer}>
                <TouchableWithoutFeedback
                  disabled={i18n.language === 'ar' ? false : true}
                  onPress={() => {
                    i18n
                      .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                      .then(() => {
                        I18nManager.forceRTL(i18n.language === 'ar');
                        RNRestart.Restart();
                      });
                  }}>
                  <View
                    style={
                      i18n.language === 'ar'
                        ? styles.switcherUnSelectedButton
                        : styles.switcherSelectedButton
                    }>
                    <Text
                      style={
                        i18n.language === 'ar'
                          ? styles.switcherUnSelectedText
                          : styles.switcherSelectedText
                      }>
                      English
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  disabled={i18n.language === 'en' ? false : true}
                  onPress={() => {
                    i18n
                      .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                      .then(() => {
                        I18nManager.forceRTL(i18n.language === 'ar');
                        RNRestart.Restart();
                      });
                  }}>
                  <View
                    style={
                      i18n.language === 'ar'
                        ? styles.switcherSelectedButton
                        : styles.switcherUnSelectedButton
                    }>
                    <Text
                      style={
                        i18n.language === 'ar'
                          ? styles.switcherSelectedText
                          : styles.switcherUnSelectedText
                      }>
                      عربي
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.action}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/icons/email.png')}
              />
              <TextInput
                // returnKeyType="next"

                // blurOnSubmit={false}
                maxLength={50}
                placeholder={t('Email')}
                placeholderTextColor="#7D7D7D"
                style={[
                  styles.textInput,
                  {
                    color: '#7D7D7D',
                    textAlign: i18n.language == 'ar' ? 'right' : 'left',
                  },
                ]}
                autoCapitalize="none"
                // autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => ref_input2.current.focus()}
                onChangeText={val => textInputChange(val)}
              />
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {t('Please enter valid email')}
                </Text>
              </Animatable.View>
            )}
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.action}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/icons/lock.png')}
              />
              <TextInput
                maxLength={50}
                placeholder={t('YourPassword')}
                placeholderTextColor="#7D7D7D"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: '#7D7D7D',
                    textAlign: i18n.language == 'ar' ? 'right' : 'left',
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
                // ref={(val) => { secondTextInput = val; }}
                ref={ref_input2}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Image
                    source={require('../assets/icons/eyeOn.png')}
                    style={{height: 22, width: 22}}
                  />
                ) : (
                  <Image
                    source={require('../assets/icons/eyeOff.png')}
                    style={{height: 22, width: 22}}
                  />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {t('Password must be Alphanumeric and 8 characters long')}
                </Text>
              </Animatable.View>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ResetScreen')}>
            <Text
              style={{
                color: '#972C26',
                textDecorationLine: 'underline',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
              }}>
              {t('ForgotPassword')}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  loginHandle();
                }}>
                <LinearGradient
                  colors={['#4C1613', '#FF0E00']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.button}>
                  {!data.loading ? (
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: '#fff',
                        },
                      ]}>
                      {t('LogIn')}
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color="#fff" />
                  )}
                </LinearGradient>
              </TouchableOpacity> */}
              <CustomButton
                title={t('LogIn')}
                navigation={navigation}
                onPress={() => loginHandle()}
                loading={data.loading}
              />

              {/* <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderColor: '#9c3825',

                    marginTop: 15,
                  },
                ]}
                onPress={() => navigation.navigate('SignUpScreen')}>
                <LinearGradient
                  colors={['#4C1613', '#FF0E00']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.button}>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: '#fff',
                      },
                    ]}>
                    {t('SignUp')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity> */}
              <CustomButton
                title={t('SignUp')}
                navigation={navigation}
                onPress={() => navigation.navigate('SignUpScreen')}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  footer: {
    flex: 3,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,

    fontSize: 50,
    // marginBottom:-25,
  },
  text_footer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    color: '#000',
  },
  action: {
    flexDirection: 'row',
    // marginTop: 20,
    paddingLeft: 15,
    paddingRight: 25,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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

    paddingLeft: 15,
    paddingVertical: 8,

    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  errorMsg: {
    color: '#972C26',
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    height: 125,
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  englishTextSign: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
  arabicTextSign: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: 'Poppins-Medium',
  },
  language: {
    marginBottom: 30,
  },
  english: {
    width: '50%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  switcherContainer: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderRadius: 7,
  },
  switcherSelectedButton: {
    backgroundColor: '#972C26',
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcherUnSelectedButton: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcherSelectedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
  switcherUnSelectedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#7D7D7D',
  },
  actionContainer: {
    backgroundColor: 'transparent',
    height: 70,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
