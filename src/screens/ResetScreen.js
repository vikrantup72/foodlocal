import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';

import {useTranslation} from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from '../services/apis/api';
import CustomButton from '../components/reusableComponents/CustomButton';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {forgotPassword} from '../services/apis/api';

const ResetScreen = ({navigation}) => {
  const [t, i18n] = useTranslation();

  const [data, setData] = React.useState({
    email: '',
    isValidEmail: true,
    check_textInputChange: false,
    loading: false,
  });

  const forgotPasswordApi = () => {
    forgotPassword(data.email)
      .then(response => {
        console.log('response.data', response.data);
        setData({...data, loading: false});
      })
      .catch(error => {
        console.log('response.error', error);
        setData({...data, loading: false});
      });
  };

  const emailTextInputChange = val => {
    if (i18n.language === 'ar') {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidEmail: true,
      });
    } else {
      var emailCre =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValidEmail = emailCre.test(val);
      if (isValidEmail) {
        setData({
          ...data,
          email: val,
          check_textInputChange: true,
          isValidEmail: true,
        });
      } else {
        setData({
          ...data,
          email: val,
          check_textInputChange: false,
          isValidEmail: false,
        });
      }
    }
  };

  const resetHandle = async () => {
    if (i18n.language === 'ar') {
      if (data.email.length === 0) {
        setData({
          ...data,
          isValidEmail: false,
        });
      } else if (!data.isValidEmail) {
        alert('Please check email');
      }
    } else {
      if (data.email.length === 0) {
        setData({
          ...data,
          isValidEmail: false,
        });
      } else if (!data.isValidEmail) {
        alert(t('Please check inputs'));
      } else {
        console.warn('Api Running');
        setData({...data, loading: true});
        forgotPasswordApi();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/loginBackground.jpg')}
        style={{width: '100%', height: '100%', borderRadius: 100}}>
        {/* <StatusBar backgroundColor='#FF6347' barStyle="light-content" /> */}
        <View style={styles.header}>
          <Text style={styles.text_header}>{t('ForgotPassword')}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.actionContainer}>
            <View style={styles.action}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/icons/email.png')}
              />
              <TextInput
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
                onChangeText={val => emailTextInputChange(val)}
              />
            </View>
            {data.isValidEmail ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Please enter valid email</Text>
              </Animatable.View>
            )}
          </View>

          <View style={styles.buttons}>
            <CustomButton
              title={t('Submit')}
              navigation={navigation}
              onPress={() => {
                resetHandle();
              }}
              loading={data.loading}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 200,
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: 20,
  },
  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 40,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 25,

    backgroundColor: Colors.white,

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
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
  arabicTextSign: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
  },
  actionContainer: {
    backgroundColor: 'transparent',
    height: 70,
  },
});
