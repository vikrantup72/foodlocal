import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  I18nManager,
  Button,
  Alert
} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {useTranslation} from 'react-i18next';

import {AuthContext} from '../components/context';
import RNRestart from 'react-native-restart';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TokenContext} from '../components/context';
import {FontFamily} from '../components/reusableComponents/Constants';
import { showLoginAlert } from '../utils/showAlert';

export function DrawerContent(props) {
  const token = React.useContext(TokenContext);
  // console.log('userToken', token.token.userToken);
  // console.log('token.token.profileData', token.token.profileData);

  const [rtl, setRTL] = useState(true);

  const options = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'عربي',
      value: 'ar',
    },
  ];
  const {t, i18n} = useTranslation();

  const paperTheme = useTheme();

  const {signOut, toggleTheme} = React.useContext(AuthContext);

  const handleDelete = e => {
    
    axios
      .post('https://www.get-cup.com/company/api/v1/delete_user', {
        token: token.token.userToken,
      })
      .then(function(response) {
        if(response.data.message == 'Deleted User'){
          alert('User deleted')
          signOut();
        }else{
          alert('User not deleted plz try again..')
        }
        
        
      })
  
};

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {token.token.userToken === null ? null : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileScreen')}>
            <View style={styles.userInfoSection}>
              {/* 
            <View style={{backgroundColor:"white"}}>

              <Avatar.Image style={{borderStartColor:"white"}}
              source={require("../assets/avtar.png")}/>
            </View> */}

              <Text
                style={{
                  color: '#972C26',
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  fontSize: 19,
                }}>
                {token?.token?.profileData?.name}
              </Text>

              <Text
                style={{
                  color: '#972C26',
                  fontFamily: FontFamily.ExpoArabicBook,
                  fontSize: 14,
                }}>
                {token.token.profileData.phone}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.sectionsContainer}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/order.png')}
                  style={styles.imageStyle}
                />
              )}
              //  style={{ backgroundColor: '#64ffda' }}

              onPress={() =>
                token?.token?.userToken
                  ? props.navigation.navigate('MyOrder', {title: 'Restaurant'})
                  : showLoginAlert(
                    props?.navigation,
                    t('loginRequired'),
                    t('doYouWantToLogin'),
                    'SignInScreen',
                  )
              }
              label={t('MyOrders')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>
          {/* <View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    source={require('../assets/icons/payment.png')}
                    style={styles.imageStyle}
                  />
                )}
                label={t('Payments')}
                labelStyle={styles.labelStyle}
                onPress={() => props.navigation.navigate('Payment')}
              />
            </Drawer.Section>
          </View> */}

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/location.png')}
                  style={styles.imageStyle}
                />
              )}
              onPress={() =>
                token?.token?.userToken
                  ? props.navigation.navigate('Address')
                  : showLoginAlert(
                    props?.navigation,
                    t('loginRequired'),
                    t('doYouWantToLogin'),
                    'SignInScreen',
                  )
              }
              label={t('Address')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/heart.png')}
                  style={styles.imageStyle}
                />
              )}
              onPress={() =>
                token?.token?.userToken
                  ? props.navigation.navigate('Favourite')
                  : showLoginAlert(
                    props?.navigation,
                    t('loginRequired'),
                    t('doYouWantToLogin'),
                    'SignInScreen',
                  )
              }
              label={t('Favourite')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/bell.png')}
                  style={styles.imageStyle}
                />
              )}
              onPress={() =>
                token?.token?.userToken
                  ? props.navigation.navigate('Notification')
                  : showLoginAlert(
                    props?.navigation,
                    t('loginRequired'),
                    t('doYouWantToLogin'),
                    'SignInScreen',
                  )
              }
              label={t('Notification')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/subscription.png')}
                  style={styles.imageStyle}
                />
              )}
              onPress={() =>
                token?.token?.userToken
                  ? props.navigation.navigate('SubscriptionList')
                  : showLoginAlert(
                    props?.navigation,
                    t('loginRequired'),
                    t('doYouWantToLogin'),
                    'SignInScreen',
                  )
              }
              label={t('Subscription')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>

          {token.token.userToken === null ? (
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    source={require('../assets/icons/logout.png')}
                    style={styles.imageStyle}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate('SignInScreen')
                  // signOut()
                }}
                label={t('SignIn')}
                labelStyle={styles.labelStyle}
              />
            </Drawer.Section>
          ) : (<>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    source={require('../assets/icons/logout.png')}
                    style={styles.imageStyle}
                  />
                )}
                onPress={() => {
                  signOut();
                }}
                label={t('LogOut')}
                labelStyle={styles.labelStyle}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={require('../assets/icons/logout.png')}
                  style={styles.imageStyle}
                />
              )}
              onPress={() => {
                Alert.alert(
                  "Delete Account",
                  "Are you sure you want to delete account permanently?",
                  [
                    
                    {
                      text: "Confirm",
                      onPress: () => handleDelete(),
                      style: "cancel"
                    },
                    { text: "Cancel", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }}
              label={t('Delete Account')}
              labelStyle={styles.labelStyle}
            />
          </Drawer.Section>
          </>
          )}
        </View>
      </DrawerContentScrollView>

      {/* <Drawer.Section style={{ flexDirection: "row", height: 70, }}>
        <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
          <SwitchSelector
            initial={0}
            borderWidth={0}
            backgroundColor={'#F8F8F8'}
            //   height={45}
            //   onPress={(language) => {
            //     i18n
            //         .changeLanguage(language)
            //         .then(()=>{
            //         I18nManager.forceRTL(i18n.language === 'en');

            //         RNRestart.Restart();
            //         setRTL(!rtl);

            //   });
            // }}

            onPress={() => {
              i18n
                .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                .then(() => {
                  I18nManager.forceRTL(i18n.language === 'ar');
                  RNRestart.Restart();
                });
            }}
            textColor={'#7D7D7D'} //'#7a44cf'
            selectedColor={'#fff'}
            buttonColor={'#972C26'}
            borderRadius={5}
            textStyle={{ fontFamily: FontFamily.ExpoArabicMedium, fontSize: 12 }}
            selectedTextStyle={{ fontFamily: FontFamily.ExpoArabicMedium, fontSize: 12 }}
            //   borderColor={'transparent'}

            style={{}}
            // borderColor={colors.purple}
            hasPadding
            options={options}
          />

        </View>


      </Drawer.Section> */}

      <View
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          alignItems: 'center',
        }}>
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

      <View style={{marginBottom: '10%'}} />
      {/* <View style={{}}>
        <Drawer.Section>
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../assets/icons/logout.png')}
                style={styles.imageStyle}
              />
            )}
            label={t('Categories')}
            labelStyle={styles.labelStyle}
            onPress={() => props.navigation.navigate('Category')}
          />
        </Drawer.Section>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    flex: 1,

    marginLeft: 37,
    marginTop: 30,
  },
  drawerSection: {
    flex: 1,
    // flexDirection: 'row',
    borderBottomWidth: 0.2,
    // height: 58,
    borderColor: 'rgba(158, 150, 150, .2)',
    // alignItems: 'center',
  },
  sectionsContainer: {
    marginTop: 20,

    marginLeft: 20,
  },

  labelStyle: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 16,
    backgroundColor: 'transparent',
  },

  imageStyle: {
    height: 28,
    width: 28,
    backgroundColor: 'transparent',
  },
  switcherContainer: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    width: '85%',
    height: 40,
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
});
