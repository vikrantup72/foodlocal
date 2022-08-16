import React, {useEffect, useReducer, useState} from 'react';
import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {CartContext, TokenContext} from './components/context';

import {DrawerContent} from './screens/DrawerContent';

import HomeStackScreen from './screens/MainTabScreen';

import {AuthContext} from './components/context';

import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import store from './services/reducers/store';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';

import {netInfo} from './utils/netInfo';

const Drawer = createDrawerNavigator();

const Root = () => {
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'te',
    });
  };
  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    dispatch({
      type: 'SET_DEVICE_ID',
      deviceId: uniqueId,
    });
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(loc => {
        var NY = {
          lat: loc.latitude,
          lng: loc.longitude,
        };
        Geocoder.geocodePosition(NY)
          .then(res => {
            dispatch({
              type: 'SET_Location',
              location: res[0],
            });
          })
          .catch(err => {
            console.log('SET_Locationerr', err);
          });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn('code', code, message);
      });
  };

  const initialState = {
    isLoading: true,
    userToken: null,

    profileData: [],
    cartData: null,
    categoryId: '1',
    restaurentId: 'null',
    deviceId: null,
    promoAppliedData: null,
    deviceLocation: null,
    addOnMultipleData: [],
    addOnData: [],
    lat: null,
    long: null,
    location: null,
    addressId: null,
    paymentInstruction: null,
    sceduleOrderDate: '',
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const initialReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          // defaultScreen: action.defaultScreen,
          profileData: action.profileData,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'TOKENSET':
        return {
          ...prevState,
          userToken: action.value,
          profileData: action.profileData,
        };
      case 'PROFILE_UPDATE':
        return {
          ...prevState,
          profileData: action.profileData,
        };
      case 'CART_SET':
        return {
          ...prevState,
          cartData: action.cartData,
        };
      case 'CATEGORY_ID_SET':
        return {
          ...prevState,
          categoryId: action.categoryId,
        };
      case 'RESTAURENT_ID_SET':
        return {
          ...prevState,
          restaurentId: action.restaurentId,
        };
      case 'SET_DEVICE_ID':
        return {
          ...prevState,
          deviceId: action.deviceId,
        };
      case 'SET_DEVICE_LOCATION':
        return {
          ...prevState,
          deviceLocation: action.deviceLocation,
        };
      case 'SET_PROMO_DATA':
        return {
          ...prevState,
          promoAppliedData: action.promoAppliedData,
        };
      case 'SET_addOnMultipleData':
        return {
          ...prevState,
          addOnMultipleData: action.addOnMultipleData,
        };
      case 'SET_addOnData':
        return {
          ...prevState,
          addOnData: action.addOnData,
        };
      case 'SET_Location':
        return {
          ...prevState,
          lat: action.lat,
          long: action.long,
          location: action.location,
        };
      case 'SET_ADDRESS_ID':
        return {
          ...prevState,
          addressId: action.addressId,
        };
      case 'SET_INSTRUCTION':
        return {
          ...prevState,
          paymentInstruction: action.paymentInstruction,
        };
      case 'SET_SCEDULE_ORDER_DATE':
        return {
          ...prevState,
          sceduleOrderDate: action.sceduleOrderDate,
        };
    }
  };
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [state, dispatch] = React.useReducer(initialReducer, initialState);

  const authContext = React.useMemo(
    navigation => ({
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          // await AsyncStorage.removeItem('defaultScreen');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(navigation => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      // let defaultScreen = null;
      let profileData = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        // defaultScreen = await AsyncStorage.getItem('defaultScreen');
        profileData = await AsyncStorage.getItem('profileData');

        const restaurentId = await AsyncStorage.getItem('restaurentId');

        dispatch({
          type: 'RESTAURENT_ID_SET',
          restaurentId: restaurentId,
        });
        console.log('staterestaurentId', state.restaurentId);
        console.log('staterestauredeviceIdd', state.deviceId);

        let oldFcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('oldFcssssssmToken', oldFcmToken);
      } catch (error) {
        console.log('eroor', error);
      }
      console.log('user token2: ', userToken);
      dispatch({
        type: 'RETRIEVE_TOKEN',
        token: userToken,
        // defaultScreen,
        profileData: JSON.parse(profileData),
      });
    }, 1000);
    getdeviceId();
    getLocation();
    // getLocationName()
    createChannel();
    // createNotificationListeners()
    // requestUserPermission();
    // notificationListener();
    netInfo();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <TokenContext.Provider value={{token: state, dispatch: dispatch}}>
            <CartContext.Provider
              value={{cartProvider: state, dispatchProvider: dispatch}}>
              <NavigationContainer>
                <Drawer.Navigator
                  drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen
                    // screen={state.defaultScreen ?? 'Category'}
                    name="HomeDrawer"
                    component={HomeStackScreen}
                  />
                </Drawer.Navigator>
              </NavigationContainer>
            </CartContext.Provider>
          </TokenContext.Provider>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default Root;
