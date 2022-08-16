import React, {useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {TokenContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {FontFamily} from '../components/reusableComponents/Constants';

const ProfileScreen = ({navigation}) => {
  const token = React.useContext(TokenContext);

  console.log('userToken', token.token.userToken);

 

  const [t, i18n] = useTranslation();

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const [profileData, setProfileData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    check_textInputChange: false,
    isValidname: true,
    isValidLastName: true,
    isValidPhone: true,
    isValidemail: true,
    loading: false,
  });

  const nameTextInputChange = val => {
    if (/^([a-zA-Z0-9]+)$/i.test(val)) {
      setProfileData({
        ...profileData,
        first_name: val,
        isValidname: true,
      });
    } else {
      setProfileData({
        ...profileData,
        first_name: val,
        isValidname: false,
      });
    }
  };
  const lastNameTextInputChange = val => {
    if (/^([a-zA-Z0-9]+)$/i.test(val)) {
      setProfileData({
        ...profileData,
        last_name: val,
        isValidLastName: true,
      });
    } else {
      setProfileData({
        ...profileData,
        last_name: val,
        isValidLastName: false,
      });
    }
  };

  const handleSubmit = e => {
    if (profileData.first_name.length === 0) {
      setProfileData({
        ...profileData,
        isValidname: false,
      });
    } else if (profileData.last_name.length === 0) {
      setProfileData({
        ...profileData,
        isValidLastName: false,
      });
    } else if (!profileData.isValidname || !profileData.isValidLastName) {
      alert('Please check inputs');
    } else {
      console.warn('Api Running');
      setProfileData({...profileData, loading: true});

      axios
        .post('http://netdemo.site/food/api/v1/users/editMyProfile', {
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          email: profileData.email,
          token: token.token.userToken,
        })
        .then(function(response) {
          console.warn('response.data', response.data);
          AsyncStorage.setItem(
            'profileData',
            JSON.stringify(response.data.data),
          );
          token.dispatch({
            type: 'PROFILE_UPDATE',
            profileData: response.data.data,
          });
          if (response.data.status === 1) {
            alert(response.data.message);

            setProfileData({...profileData, loading: false});
          } else {
            setProfileData({...profileData, loading: false});
            alert(response.data.message);
          }
        })
        .catch(function(error) {
          console.warn(error);
          setProfileData({...profileData, loading: false});
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Avatar.Image source={require('../assets/avtar.png')} size={70} />
          <View style={{}}>
            <Text
              style={[
                styles.title,
                {
                  marginVertical: 10,
                  color: '#972C26',
                },
              ]}>
              {token?.token?.profileData?.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonTop} onPress={() => {}}>
            <LinearGradient
              colors={['#4C1613', '#FF0E00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.buttonTop}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: '#fff',
                  },
                ]}>
                {t('ChangePhoto')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <Image
            style={{height: 22, width: 22}}
            source={require('../assets/icons/user-red.png')}
          />
          <TextInput
            placeholder={token.token.profileData.first_name}
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
            // autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() => ref_input2.current.focus()}
          />
        </View>
        <View style={{width: '100%'}}>
          {profileData.isValidname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Please enter valid first name</Text>
            </Animatable.View>
          )}
        </View>

        <View style={styles.action}>
          <Image
            style={{height: 22, width: 22}}
            source={require('../assets/icons/user-red.png')}
          />
          <TextInput
            placeholder={token?.token?.profileData?.last_name}
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
        <View style={{width: '100%'}}>
          {profileData.isValidLastName ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Please enter valid last name</Text>
            </Animatable.View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: '#9c3825',

              marginTop: 15,
            },
          ]}
          onPress={() => {
            // navigation.navigate('Home');
            handleSubmit();
          }}>
          <LinearGradient
            colors={['#4C1613', '#FF0E00']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.button}>
            {!profileData.loading ? (
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: '#fff',
                  },
                ]}>
                {t('Done')}
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,

    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    fontSize: 17,

    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  caption: {
    fontSize: 17,
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    backgroundColor: 'blue',
    flex: 2,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  buttonTop: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flex: 2,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,

    backgroundColor: '#F8F8F8',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    width: '100%',
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
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  errorMsg: {
    color: '#972C26',
    fontSize: 12,
  },
});
