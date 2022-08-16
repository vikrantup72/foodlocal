import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import CategoryScreen from './CategoryScreen';
import MyOrderScreen from './MyOrderScreen';
import ResetScreen from './ResetScreen';
import {FontFamily} from '../components/reusableComponents/Constants';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={({route}) => ({
        // title: route.params.title,
        title: 'Address',
        headerStyle: {
          backgroundColor: '#9c3825',
        },
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff',
      })}
    />
    <RootStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={({route}) => ({
        // title: route.params.title,
        title: 'Address',
        headerStyle: {
          backgroundColor: '#9c3825',
        },
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeft: null,
      })}
    />
    <RootStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={({route}) => ({
        // title: route.params.title,
        title: 'Address',
        headerStyle: {
          backgroundColor: '#9c3825',
        },
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff',
        headerBackImage: () => (
          <Image
            source={require('../assets/icons/back-white.png')}
            style={styles.headerBackStyle}
          />
        ),
      })}
    />
    <RootStack.Screen name="MyOrder" component={MyOrderScreen} />
    <RootStack.Screen
      name="ResetScreen"
      component={ResetScreen}
      options={({route}) => ({
        // title: route.params.title,
        title: 'Address',
        headerStyle: {
          backgroundColor: '#9c3825',
        },

        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff',
        headerBackImage: () => (
          <Image
            source={require('../assets/icons/back-white.png')}
            style={styles.headerBackStyle}
          />
        ),
      })}
    />
  </RootStack.Navigator>
);
const styles = StyleSheet.create({
  headerBackStyle: {
    height: 25,
    width: 25,
  },
});
export default RootStackScreen;
