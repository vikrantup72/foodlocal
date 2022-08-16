import React, {useEffect} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import {useTheme, Avatar} from 'react-native-paper';
import RestaurantListScreen from './RestaurantListScreen';
import RestaurantDetailScreen from './RestaurantDetailScreen';
import CategoryScreen from './CategoryScreen';
import MyOrderScreen from './MyOrderScreen';
import SubscriptionScreen from './SubscriptionScreen';
import NotificationScreen from './NotificationScreen';
import FavouriteScreen from './FavouriteScreen';
import AddressScreen from './AddressScreen';
// import PaymentScreen from './PaymentScreen';
import ProductDetailScreen from './ProductDetailScreen';
import TrackingScreen from './TrackingScreen';
import FilterScreen from './FilterScreen';
import EditAddressScreen from './EditAddressScreen';
import CartScreen from './CartScreen';
import ChangeAddressScreen from './ChangeAddressScreen';
import EditPaymentScreen from './EditPaymentScreen';
import MyOrderDetailScreen from './MyOrderDetailScreen';
import AddNewAddressScreen from './AddNewAddressScreen';
import PromocodeScreen from './PromocodeScreen';

import ItemDetailStepperScreen from './ItemDetailStepperScreen';
import PaymentDoneScreen from './PaymentDoneScreen';
// import PaymentScreen1 from './PaymentScreen1';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ResetScreen from './ResetScreen';
import AddItemDetail from '../components/AddItemDetail';
import {useTranslation} from 'react-i18next';
import ProfileScreen from './ProfileScreen';
import {FontFamily} from '../components/reusableComponents/Constants';
import AddressListScreen from './AddressListScreen';
import {TokenContext} from '../components/context';
import PaymentWebView from './PaymentWebView';
import SubscriptionList from './SubscriptionList';
import CustomBackImage from '../components/reusableComponents/CustomBackImage';
import AddressLocationMapScreen from './AddressLocationMapScreen';
import SearchResult from './SearchResult';

const HomeStack = createStackNavigator();

const HomeStackScreen = (props, {navigation}) => {
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);

  const {colors} = useTheme();
  return (
    <HomeStack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={() => ({
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

      <HomeStack.Screen
        headerMode="false"
        name="Category"
        component={CategoryScreen}
        options={() => ({
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          title: 'Category',
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTintColor: '#9c3825',
          headerTransparent: 'true',
          swipeEnabled: false,
          headerShown: false,
        })}
      />

      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Loresm,Ipsum',
          // headerTitle:false,
          headerTintColor: '#972C26',
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicBook,
            fontSize: 18,
            alignSelf: 'center',
          },
          headerTitle: false,
          headerLeft: () => (
            <View style={{marginLeft: 0, flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image
                  source={require('../assets/icons/menu.png')}
                  style={[
                    {marginLeft: 30, height: 22, width: 22, marginTop: 10},
                  ]}
                />
              </TouchableOpacity>
              <View
                style={{paddingLeft: '5%', flexDirection: 'row', width: '60%'}}>
                <Image
                  source={require('../assets/icons/locationArea.png')}
                  onPress={() => props.navigation.openDrawer()}
                  style={{height: 22, width: 22, alignSelf: 'center'}}
                />
                <Text
                  style={{
                    fontFamily: FontFamily.ExpoArabicBook,
                    fontSize: 12,
                    alignSelf: 'center',
                    color: '#972C26',
                    paddingLeft: 10,
                  }}>
                  {token?.token?.location?.formattedAddress}
                </Text>
              </View>
            </View>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CartScreen')}>
              <View
                style={{
                  marginRight: 20,
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                }}>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/icons/cart_red.png')}
                    style={{height: 22, width: 22, alignSelf: 'center'}}
                  />
                  <Text style={{color: '#9c3825', marginTop: -8}}>
                    {token?.token?.cartData?.cart_quantity}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          title: t('Filter'),
          headerBackTitleVisible: false,
          // headerTitle:false,
          headerTintColor: '#9c3825',

          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
          },
          headerBackImage: () => <CustomBackImage color="red" />,
        }}
      />

      <HomeStack.Screen
        name="RestaurantListScreen"
        component={RestaurantListScreen}
        options={({route}) => ({
          // title: route.params.title,
          title: t('ViewAll'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,

          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            color: '#fff',
          },
          headerBackImage: () => <CustomBackImage color="white" />,
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          //     <View
          //       style={{marginRight: 20, flexDirection: 'row', marginTop: 0}}>
          //       <Image
          //         source={require('../assets/icons/home.png')}
          //         style={{height: 22, width: 22, alignSelf: 'center'}}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <HomeStack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={({route, navigation}) => ({
          // title: route.params.title,
          title: t('Restaurant'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          // headerTitle: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CartScreen')}>
              <View
                style={{
                  marginRight: 20,
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                }}>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/icons/cart.png')}
                    style={{height: 22, width: 22, alignSelf: 'center'}}
                  />
                  <Text style={{marginTop: -8, color: '#fff'}}>
                    {token?.token?.cartData?.cart_quantity}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ),
        })}
      />

      <HomeStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={() => ({
          title: t('ProductDetails'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CartScreen')}>
              <View
                style={{
                  marginRight: 20,
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                }}>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/icons/cart.png')}
                    style={{height: 22, width: 22, alignSelf: 'center'}}
                  />
                  <Text style={{marginTop: -8, color: '#fff'}}>
                    {token?.token?.cartData?.cart_quantity}
                  </Text>
                </View>
                {/* <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    height: 15,
                    width: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#9c3825',
                      fontFamily: FontFamily.ExpoArabicBook,
                      fontSize: 12,
                    }}>
                    1
                  </Text>
                </View> */}
              </View>
            </TouchableOpacity>
          ),
        })}
      />

      <HomeStack.Screen
        name="ItemDetailStepperScreen"
        component={ItemDetailStepperScreen}
        options={() => ({
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          // headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitle: false,
          headerBackImage: () => (
            <View style={{marginTop: '50%'}}>
              <CustomBackImage color="white" />
            </View>
          ),
        })}
      />

      <HomeStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({
          title: t('Cart'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="AddressLocationMapScreen"
        component={AddressLocationMapScreen}
        options={() => ({
          title: 'AddressLocationMapScreen',
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          // headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitle: false,
          headerBackImage: () => (
            <View style={{marginTop: '50%'}}>
              <CustomBackImage color="white" />
            </View>
          ),
        })}
      />

      <HomeStack.Screen
        name="PromocodeScreen"
        component={PromocodeScreen}
        options={() => ({
          title: 'Apply Coupons',
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="ChangeAddressScreen"
        component={ChangeAddressScreen}
        options={() => ({
          title: t('ChangeAddress'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="MyOrder"
        component={MyOrderScreen}
        icon="star"
        options={() => ({
          title: t('MyOrder'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="MyOrderDetailScreen"
        component={MyOrderDetailScreen}
        icon="star"
        options={() => ({
          title: t('OrderDetail'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerTransparent: true,
          headerTitle: false,
          headerBackImage: () => (
            <View style={{marginTop: '50%'}}>
              <CustomBackImage color="white" />
            </View>
          ),
        })}
      />

      {/* <HomeStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={() => ({
          title: t('Payment'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
            marginLeft: -55,
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => (
            <Image
              source={require('../assets/icons/back-white.png')}
              style={styles.backImageStyle}
            />
          ),
        })}
      /> */}
      {/* <HomeStack.Screen
        name="Payment1"
        component={PaymentScreen1}
        options={() => ({
          title: t('Payment'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
            marginLeft: -55,
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => (
            <Image
              source={require('../assets/icons/back-white.png')}
              style={styles.backImageStyle}
            />
          ),
        })}
      /> */}
      <HomeStack.Screen
        name="EditPayment"
        component={EditPaymentScreen}
        options={() => ({
          title: t('Payment'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="PaymentDoneScreen"
        component={PaymentDoneScreen}
        options={() => ({
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          // headerBackTitleVisible: false,
          // headerTransparent: false,
          // headerTintColor: '#fff',

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: null,

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="AddressListScreen"
        component={AddressListScreen}
        options={() => ({
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="Address"
        component={AddressScreen}
        options={() => ({
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="AddNewAddressScreen"
        component={AddNewAddressScreen}
        options={() => ({
          title: t('AddAddress'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={() => ({
          title: t('Edit'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={() => ({
          title: t('Favourites'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={() => ({
          title: t('Notification'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => ({
          title: t('ProfileSetting'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={() => ({
          // title: route.params.title,
          title: t('Subscription'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },

          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

    
      <HomeStack.Screen
        name="TrackingScreen"
        component={TrackingScreen}
        options={() => ({
          title: t('Delivery'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',

          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

      <HomeStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={({route}) => ({
          // title: route.params.title,
          title: t('Address'),
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
      <HomeStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={({route}) => ({
          // title: route.params.title,
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={() => ({
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
      <HomeStack.Screen
        name="AddItemDetail"
        component={AddItemDetail}
        options={() => ({
          title: t('Address'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />
   

      <HomeStack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
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

      <HomeStack.Screen
        name="SubscriptionList"
        component={SubscriptionList}
        options={() => ({
          title: t('subscriptions'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTintColor: '#fff',
          headerShown: true,
          headerBackImage: () => <CustomBackImage color="white" />,
        })}
      />

<HomeStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={({route}) => ({
          // title: route.params.title,
          title: t('SearchResult'),
          headerStyle: {
            backgroundColor: '#9c3825',
          },
          headerBackTitleVisible: false,

          headerTitleStyle: {
            fontFamily: FontFamily.ExpoArabicSemiBold,
            fontSize: 22,
            alignSelf: 'center',
            color: '#fff',
          },
          headerBackImage: () => <CustomBackImage color="white" />,
         
        })}
      />


    </HomeStack.Navigator>
  );
};
const styles = StyleSheet.create({
  backImageStyle: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});
export default HomeStackScreen;
