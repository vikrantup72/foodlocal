import React, {useRef, useState, useTheme} from 'react';
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
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {FontFamily} from '../components/reusableComponents/Constants';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import LinearGradient from 'react-native-linear-gradient';

import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const ChangeAddressScreen = ({route, navigation, item}) => {
  const {t, i18n} = useTranslation();

  const check = 0;

  const initialRegion = {
    latitude: 28.5355,
    longitude: 77.391,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <ScrollView>
        <View style={{height: 300, backgroundColor: '#F7EEEE'}}>
          <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
          />

          <View
            style={{
              position: 'absolute', //use absolute position to show button on top of the map
              top: '80%', //for center align
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity

            //  onPress={() => navigation.navigate('Home')}
            >
              <LinearGradient
                colors={['#4C1613', '#FF0E00']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  {t('CurrentLocation')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#972C26',
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRadius: 5,
                position: 'absolute',
                left: '114%',
              }}>
              <Image
                source={require('../assets/icons/current-location.png')}
                style={{height: 20, width: 20}}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View
            style={{
              shadowOpacity: 1.5,
              elevation: 8,
              shadowRadius: 20,
              shadowOffset: {width: 1, height: 13},
              backgroundColor: 'white',
              borderRadius: 15,
              height: 150,
              width: '80%',
              marginLeft: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: FontFamily.ExpoArabicSemiBold,

                  color: '#9c3825',
                  justifyContent: 'center',
                  marginLeft: 15,
                  marginTop: 15,
                }}>
                {t('Address')}
              </Text>

              <Image
                source={require('../assets/icons/radio2.png')}
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: FontFamily.ExpoArabicBook,

                color: '#7D7D7D',
                justifyContent: 'center',
                marginHorizontal: 15,
              }}>
              56,panacea Residence Kartak Road,London 384005
            </Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewAddressScreen')}>
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
            </TouchableOpacity>

            <TouchableOpacity>
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
                  source={require('../assets/icons/delete.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View
            style={{
              shadowOpacity: 1.5,
              elevation: 8,
              shadowRadius: 20,
              shadowOffset: {width: 1, height: 13},
              backgroundColor: 'white',
              borderRadius: 15,
              height: 150,
              width: '80%',
              marginLeft: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: FontFamily.ExpoArabicSemiBold,

                  color: '#9c3825',
                  justifyContent: 'center',
                  marginHorizontal: 15,
                  marginTop: 15,
                }}>
                {t('FavAddress')}
              </Text>

              <Image
                source={require('../assets/icons/radio1.png')}
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  marginRight: 20,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: FontFamily.ExpoArabicBook,

                color: '#7D7D7D',
                justifyContent: 'center',
                marginHorizontal: 15,
              }}>
              B - Block Sector 4, Noida, Uttar Pradesh
            </Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewAddressScreen')}>
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
            </TouchableOpacity>

            <TouchableOpacity>
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
                  source={require('../assets/icons/delete.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewAddressScreen')}>
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
                alignSelf: 'center',
                marginBottom: 8,
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: '#fff',
                  },
                ]}>
                {t('AddNewAddress')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.buttons}>
            <TouchableOpacity
              checkScreen={check}
              onPress={() => alert('click')}>
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
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: '#fff',
                    },
                  ]}>
                  {t('PlaceOrder')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
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
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: '#fff',
                    },
                  ]}>
                  {t('AddToFavourite')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  signIn: {
    paddingHorizontal: 35,
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 2,
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  allText: {
    fontSize: 12,
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  header: {
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
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
    paddingRight: 25,

    backgroundColor: '#F8F8F8',

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
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  errorMsg: {
    color: '#972C26',
    fontSize: 14,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
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
    fontSize: 16,
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
  },
});
