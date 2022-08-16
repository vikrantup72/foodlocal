import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
// import Feather from 'react-native-vector-icons/Feather';

import {useTranslation} from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from '../services/apis/api';
import CustomButton from '../components/reusableComponents/CustomButton';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {TokenContext} from '../components/context';
import Snackbar from 'react-native-snackbar';

const SignUpScreen = ({navigation}) => {
  const token = React.useContext(TokenContext);

  const {t, i18n} = useTranslation();

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const [driverSignUp, setDriverSignUp] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: 'user',
    check_textInputChange: false,
    passwordSecureTextEntry: true,
    confirmPasswordSecureTextEntry: true,
    isValidname: true,
    isValidLastName: true,
    isValidPhone: true,
    isValidemail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    status: 0,
    message: [],
    loading: false,
  });

  const nameTextInputChange = val => {
    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        first_name: val,
        isValidname: true,
      });
    } else {
      if (/^([a-zA-Z0-9]+)$/i.test(val)) {
        setDriverSignUp({
          ...driverSignUp,
          first_name: val,
          isValidname: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          first_name: val,
          isValidname: false,
        });
      }
    }
  };
  const lastNameTextInputChange = val => {
    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        last_name: val,
        isValidLastName: true,
      });
    } else {
      if (/^([a-zA-Z0-9]+)$/i.test(val)) {
        setDriverSignUp({
          ...driverSignUp,
          last_name: val,
          isValidLastName: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          last_name: val,
          isValidLastName: false,
        });
      }
    }
  };
  const phoneTextInputChange = val => {
    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        phone: val,
        isValidPhone: true,
      });
    } else {
      if (val.trim().length >= 10 && /^([a-zA-Z0-9]+)$/i.test(val)) {
        setDriverSignUp({
          ...driverSignUp,
          phone: val,
          isValidPhone: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          phone: val,
          isValidPhone: false,
        });
      }
    }
  };
  const emailTextInputChange = val => {
    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        email: val,
        isValidemail: true,
      });
    } else {
      var emailCre =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValidEmail = emailCre.test(val);

      if (isValidEmail) {
        setDriverSignUp({
          ...driverSignUp,
          email: val,
          isValidemail: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          email: val,
          isValidemail: false,
        });
      }
    }
  };

  const handlePasswordChange = val => {
    var hasUpper = val.match(/[A-Z]/);
    var hasLower = val.match(/[a-z]/g);
    var hasNumber = val.match(/[0-9]/g);

    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        password: val,
        isValidPassword: true,
      });
    } else {
      if (
        // /^([a-zA-Z0-9]+)$/i.test(val) && for not using@#
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/i.test(val) &&
        val.trim().length >= 8
        // && hasUpper && hasLower && hasNumber
      ) {
        setDriverSignUp({
          ...driverSignUp,
          password: val,
          isValidPassword: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          password: val,
          isValidPassword: false,
        });
      }
    }
  };
  const handleConfirmPasswordChange = val => {
    if (i18n.language === 'ar') {
      setDriverSignUp({
        ...driverSignUp,
        confirmPassword: val,
        isValidConfirmPassword: true,
      });
    } else {
      if (
        // /^([a-zA-Z0-9]+)$/i.test(val) && for not using@#
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/i.test(val) &&
        val.trim().length >= 8
        // && hasUpper && hasLower && hasNumber
      ) {
        setDriverSignUp({
          ...driverSignUp,
          confirmPassword: val,
          isValidConfirmPassword: true,
        });
      } else {
        setDriverSignUp({
          ...driverSignUp,
          confirmPassword: val,
          isValidConfirmPassword: false,
        });
      }
    }
  };

  const handleSubmit = e => {
    if (i18n.language === 'ar') {
      if (driverSignUp.first_name.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidname: false,
        });
      } else if (driverSignUp.last_name.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidLastName: false,
        });
      } else if (driverSignUp.phone.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidPhone: false,
        });
      } else if (driverSignUp.email.length === 0) {
        setDriverSignUp({
          ...driverSignUp,

          isValidemail: false,
        });
      } else if (driverSignUp.password.length === 0) {
        setDriverSignUp({
          ...driverSignUp,

          isValidPassword: false,
        });
      } else if (driverSignUp.confirmPassword.length === 0) {
        setDriverSignUp({
          ...driverSignUp,

          isValidConfirmPassword: false,
        });
      } else if (driverSignUp.confirmPassword !== driverSignUp.password) {
        alert(t('Passwordnotmatch'));
      } else if (
        !driverSignUp.isValidname ||
        !driverSignUp.isValidLastName ||
        !driverSignUp.isValidPhone ||
        !driverSignUp.isValidemail ||
        !driverSignUp.isValidPassword ||
        !driverSignUp.isValidConfirmPassword
      ) {
        alert(t('Please check inputs'));
      } else {
        console.warn('Api Running');
        setDriverSignUp({...driverSignUp, loading: true});
        console.log('token.token.deviceId', token.token.deviceId);
        axios
          .post(`${BASE_URL}api/v1/register`, {
            first_name: driverSignUp.first_name,
            last_name: driverSignUp.last_name,
            phone: driverSignUp.phone,
            email: driverSignUp.email,
            password: driverSignUp.password,
            device_token: '1',
            device_id: token.token.deviceId,
          })
          .then(function (response) {
            console.warn('Api Data ', response.data);
            console.warn('Api Data ', response.data.status);
            console.warn('Api Data ', response.data.message);
            if (response.data.status === 1) {
              setDriverSignUp({...driverSignUp, loading: false});
            } else {
              null;
            }

            if (response.data.status === 0) {
              setDriverSignUp({...driverSignUp, loading: false});
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            } else {
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#28aa1e',
                textColor: '#fff',
              });
              navigation.navigate('SignInScreen');
            }
          })
          .catch(function (error) {
            console.log(error);
            setDriverSignUp({...driverSignUp, loading: false});
            alert(error);
          });
      }
    }

    else{
      if (driverSignUp.first_name.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidname: false,
        });
      } else if (driverSignUp.last_name.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidLastName: false,
        });
      } else if (driverSignUp.phone.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
          isValidPhone: false,
        });
      } else if (driverSignUp.email.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
  
          isValidemail: false,
        });
      } else if (driverSignUp.password.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
  
          isValidPassword: false,
        });
      } else if (driverSignUp.confirmPassword.length === 0) {
        setDriverSignUp({
          ...driverSignUp,
  
          isValidConfirmPassword: false,
        });
      } else if (driverSignUp.confirmPassword !== driverSignUp.password) {
        alert(t('Passwordnotmatch'));
      } else if (
        !driverSignUp.isValidname ||
        !driverSignUp.isValidLastName ||
        !driverSignUp.isValidPhone ||
        !driverSignUp.isValidemail ||
        !driverSignUp.isValidPassword ||
        !driverSignUp.isValidConfirmPassword
      ) {
        alert(t('Please check inputs'));
      } else {
        console.warn('Api Running');
        setDriverSignUp({...driverSignUp, loading: true});
        console.log('token.token.deviceId', token.token.deviceId);
        axios
          .post(`${BASE_URL}api/v1/register`, {
            first_name: driverSignUp.first_name,
            last_name: driverSignUp.last_name,
            phone: driverSignUp.phone,
            email: driverSignUp.email,
            password: driverSignUp.password,
            device_token: '1',
            device_id: token.token.deviceId,
          })
          .then(function (response) {
            console.warn('Api Data ', response.data);
            console.warn('Api Data ', response.data.status);
            console.warn('Api Data ', response.data.message);
            if (response.data.status === 1) {
              setDriverSignUp({...driverSignUp, loading: false});
            } else {
              null;
            }
  
            if (response.data.status === 0) {
              setDriverSignUp({...driverSignUp, loading: false});
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            } else {
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#28aa1e',
                textColor: '#fff',
              });
              navigation.navigate('SignInScreen');
            }
          })
          .catch(function (error) {
            console.log(error);
            setDriverSignUp({...driverSignUp, loading: false});
            alert(error);
          });
      }
    }
    
  };

  const passwordSecureTextEntry = () => {
    setDriverSignUp({
      ...driverSignUp,
      passwordSecureTextEntry: !driverSignUp.passwordSecureTextEntry,
    });
  };
  const confirmPasswordSecureTextEntry = () => {
    setDriverSignUp({
      ...driverSignUp,
      confirmPasswordSecureTextEntry:
        !driverSignUp.confirmPasswordSecureTextEntry,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/loginBackground.jpg')}
        style={{width: '100%', height: '100%', borderRadius: 100}}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.text_header}>{t('SignUpText')}</Text>
          </View>
          <View style={styles.center}>
            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/icons/user.png')}
                />
                <TextInput
                  placeholder={t('FirstName')}
                  placeholderTextColor="#7D7D7D"
                  style={[
                    styles.textInput,
                    {
                      color: '#7D7D7D',
                      textAlign: i18n.language == 'ar' ? 'right' : 'left',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={val => nameTextInputChange(val)}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_input2.current.focus()}
                />
              </View>
              {driverSignUp.isValidname ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {t('Please enter valid name')}
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/icons/user.png')}
                />
                <TextInput
                  placeholder={t('LastName')}
                  placeholderTextColor="#7D7D7D"
                  style={[
                    styles.textInput,
                    {
                      color: '#7D7D7D',
                      textAlign: i18n.language == 'ar' ? 'right' : 'left',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={val => lastNameTextInputChange(val)}
                  onSubmitEditing={() => ref_input3.current.focus()}
                  ref={ref_input2}
                />
              </View>
              {driverSignUp.isValidLastName ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {t('Please enter valid name')}
                  </Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/icons/callBorder.png')}
                />
                <TextInput
                  placeholder={t('MobileNumber')}
                  placeholderTextColor="#7D7D7D"
                  maxLength={i18n.language == 'ar' ? 12 : 10}
                  style={[
                    styles.textInput,
                    {
                      color: '#7D7D7D',
                      textAlign: i18n.language == 'ar' ? 'right' : 'left',
                    },
                  ]}
                  keyboardType={'number-pad'}
                  autoCapitalize="none"
                  onChangeText={val => phoneTextInputChange(val)}
                  onSubmitEditing={() => ref_input4.current.focus()}
                  ref={ref_input3}
                />
              </View>
              {driverSignUp.isValidPhone ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {t('Please enter valid number')}
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <Image
                  style={styles.iconStyle}
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
                  onSubmitEditing={() => ref_input5.current.focus()}
                  ref={ref_input4}
                />
              </View>
              {driverSignUp.isValidemail ? null : (
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
                  style={styles.iconStyle}
                  source={require('../assets/icons/lock.png')}
                />
                <TextInput
                  placeholder={t('Password')}
                  placeholderTextColor="#7D7D7D"
                  secureTextEntry={
                    driverSignUp.passwordSecureTextEntry ? true : false
                  }
                  style={[
                    styles.textInput,
                    {
                      color: '#7D7D7D',
                      textAlign: i18n.language == 'ar' ? 'right' : 'left',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={val => handlePasswordChange(val)}
                  onSubmitEditing={() => ref_input6.current.focus()}
                  ref={ref_input5}
                />
                <TouchableOpacity onPress={passwordSecureTextEntry}>
                  {driverSignUp.passwordSecureTextEntry ? (
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
              {driverSignUp.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {t('Password must be Alphanumeric and 8 characters long')}
                  </Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <Image
                  style={styles.iconStyle}
                  source={require('../assets/icons/lock.png')}
                />
                <TextInput
                  placeholder={t('ConfirmPassword')}
                  placeholderTextColor="#7D7D7D"
                  secureTextEntry={
                    driverSignUp.confirmPasswordSecureTextEntry ? true : false
                  }
                  style={[
                    styles.textInput,
                    {
                      color: '#7D7D7D',
                      textAlign: i18n.language == 'ar' ? 'right' : 'left',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={val => handleConfirmPasswordChange(val)}
                  ref={ref_input6}
                />
                <TouchableOpacity onPress={confirmPasswordSecureTextEntry}>
                  {driverSignUp.confirmPasswordSecureTextEntry ? (
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
              {driverSignUp.isValidConfirmPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    {t('Password must be Alphanumeric and 8 characters long')}
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title={t('SignUpText')}
                navigation={navigation}
                onPress={() => handleSubmit()}
                loading={driverSignUp.loading}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flex: 1,

    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: 50,
  },
  center: {
    flex: 4,
    backgroundColor: 'transparent',

    paddingHorizontal: 20,
    paddingTop: 30,
  },
  text_header: {
    color: Colors.primary,
    fontFamily: FontFamily.poppinsSemiBold,

    fontSize: 50,
    marginTop: 40,
  },
  text_footer: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    paddingLeft: 10,
    color: '#000',
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
  iconStyle: {
    height: 22,
    width: 22,
  },
  textInput: {
    flex: 1,

    paddingLeft: 15,
    paddingVertical: 8,

    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'transparent',
  },
  errorMsg: {
    color: Colors.primary,
    fontSize: 12,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    paddingTop: 15,
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
    fontFamily: FontFamily.poppinsMedium,
    color: '#fff',
  },
  arabicTextSign: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: FontFamily.poppinsMedium,
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

  actionContainer: {
    backgroundColor: 'transparent',
    height: 70,
  },
});
