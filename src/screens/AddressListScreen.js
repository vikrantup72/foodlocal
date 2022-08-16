import React, {Component, useState} from 'react';
import {
  View,
  ToastAndroid,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CategoryCard from '../components/Cards/CategoryCard';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {FontFamily} from '../components/reusableComponents/Constants';
import {TokenContext} from '../components/context';
import {
  addressList,
  addressListType,
  createOrderId,
  placeOrder,
} from '../services/apis/api';
import ListButtonSelector from '../components/ListButtonSelector';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {useIsFocused} from '@react-navigation/core';

export default function AddressListScreen({navigation, route}) {
  const isFocused = useIsFocused();

  const instructions = route.params.instructions;
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);
  const [orderNowLoader, setOrderNowLoader] = useState(false);
  const [addressLoader, setAddressLoader] = useState(false);

  const [addressListData, setAddressListData] = useState([]);
  const [addressListTypeData, setAddressListTypeData] = useState([]);

  const [addressId, setAddressId] = useState(null);
  const [addressTypeId, setAddressTypeId] = useState(null);

  const addressListApi = () => {
    setAddressLoader(true);
    addressList(token.token.userToken, i18n.language === 'en' ? 'en' : 'ar')
      .then(function (response) {
        console.log('response.datassssssssssssssasas',response.data)

        setAddressLoader(false);
        {
          response.data.status == 1
            ? setAddressListData(response.data)
            : setAddressListData(null);
        }
        {
          response.data.status == 1
            ? setAddressId(response.data.data[0].id)
            : null;
        }
      })
      .catch(function (error) {
        console.log('addressList', error);
        setAddressLoader(false);

        // setLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setAddressLoader(false));
  };

  const goToPayment = () => {
    token.dispatch({
      type: 'SET_ADDRESS_ID',
      addressId: addressId,
    });

    token.dispatch({
      type: 'SET_INSTRUCTION',
      paymentInstruction: instructions,
    });

    navigation.navigate('EditPayment');
  };

  React.useEffect(() => {
    addressListApi();
  }, [isFocused]);
  const renderItem = ({item}) => {
    return (
      <View>
        <CategoryCard
          itemData={item}
          // onPress={()=> navigation.navigate('CardListScreen', {itemData: item})}
          onPress={() => navigation.replace('Home', {itemData: item})}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>
      <View style={styles.container}>
        {addressLoader ? (
          <ActivityIndicator size="large" color="#972C26" />
        ) : addressListData ? (
          <View style={{flex: 1}}>
            <View style={{flex: 8, marginBottom: 20,paddingTop:20}}>
              <ListButtonSelector
                addressListData={addressListData ? addressListData.data : []}
                addressListApi={addressListApi}
                setAddressId={setAddressId}
                manageAddress={false}
              />
            </View>
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <OnErrorText title="No address found" />
          </View>
        )}
      </View>

      <View
        style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddressLocationMapScreen')}
          style={styles.signIn}>
          <LinearGradient
            colors={['#FF0E00', '#4C1613']}
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
              {t('AddNewAddress')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={
            () =>
              //    {token.token.userToken?placeOrderApi():props.navigation.navigate('SignInScreen')}
              {
                token?.token?.userToken
                  ? goToPayment()
                  : props.navigation.navigate('SignInScreen');
              }

            //  createOrderIdApi()
          }
          style={styles.signIn}>
          {addressListData?.data ? (
            <LinearGradient
              colors={['#FF0E00', '#4C1613']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.signIn}>
              {orderNowLoader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: FontFamily.ExpoArabicSemiBold,
                    color: '#fff',
                  }}>
                  {t('OrderNow')}
                </Text>
              )}
            </LinearGradient>
          ) : null}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  signIn: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,marginVertical:10
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
