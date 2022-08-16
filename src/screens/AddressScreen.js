import React, {Component, useState} from 'react';
import {
  View,
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
import {data} from '../model/mapData';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {FontFamily} from '../components/reusableComponents/Constants';
import {TokenContext} from '../components/context';
import {addressList, addressListType, placeOrder} from '../services/apis/api';
import ListButtonSelector from '../components/ListButtonSelector';
import Choosebutton from '../components/Choosebutton';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {useIsFocused} from '@react-navigation/core';

export default function AddressScreen({navigation}) {
  const isFocused = useIsFocused();

  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);


  const [addressListData, setAddressListData] = useState([]);
  const [addressId, setAddressId] = useState(null);

  const [addressLoader, setAddressLoader] = useState(false);
 
  const addressListApi = () => {
    setAddressLoader(true);
    addressList(token.token.userToken, i18n.language === 'en' ? 'en' : 'ar')
      .then(function (response) {
       console.log('response.datassssssssssssssasas', response.data);

        setAddressLoader(false);
        response.data.status === 1
          ? setAddressListData(response.data)
          : setAddressListData(null);
        setAddressId(response.data.data[0].id);
      })
      .catch(function (error) {
        console.log('addressList', error);
        setAddressLoader(false);

        // setLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setAddressLoader(false));
  };

  React.useEffect(() => {
    addressListApi();

    // AsyncStorage.setItem('defaultScreen', "Category")
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {addressLoader ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#972C26" />
        </View>
      ) : addressListData ? (
        <View style={styles.container}>
          <View style={{flex: 10, marginTop: 20}}>
            <ListButtonSelector
              addressListData={addressListData ? addressListData.data : []}
              addressListApi={addressListApi}
              setAddressId={setAddressId}
              manageAddress={true}
            />
          </View>

         
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <OnErrorText title="No Address found" />
        </View>
      )}

      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          paddingVertical: 40,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddressLocationMapScreen')}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  signIn: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
