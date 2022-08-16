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
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {FontFamily} from '../reusableComponents/Constants';
import {deleteAddress} from '../../services/apis/api';
import {TokenContext} from '../context';

export default function AddOnListCard({
  navigation,
  selector,
  item,
  onSelect,
  onSelectIndex,
  index,
  addressListApi,
  onSelectMultipleIndex,
  parentIndex
}) {
  const {t, i18n} = useTranslation();
  const [deleteAddressLoader, setDeleteAddressLoader] = useState(false);

  const [orderNowLoader, setOrderNowLoader] = useState(false);
  const token = React.useContext(TokenContext);

  const deleteAddressApi = () => {
    setDeleteAddressLoader(true);
    deleteAddress(token.token.userToken, item.id)
      .then(function (response) {

        setDeleteAddressLoader(false);
        alert(response.data.message);
        addressListApi();
      })
      .catch(function (error) {
        alert('Error');
        setDeleteAddressLoader(false);

        // setLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setDeleteAddressLoader(false));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical: 10,
          width: '100%',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: '#9c3825',
        }}
        onPress={() => {
          onSelect(item.id);
          onSelectIndex(item.id);
           onSelectMultipleIndex({id:item.id,parentIndex:parentIndex});

        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          {selector ? (
            <Image
              source={require('../../assets/icons/selectCheck.png')}
              style={{height: 20, width: 20}}
            />
          ) : (
            <Image
              source={require('../../assets/icons/unSelectCheck.png')}
              style={{height: 20, width: 20}}
            />
          )}
          <View
            style={{
              marginLeft: 30,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 15,
                color: '#972C26',
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 30,
              marginVertical: 10,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 15,
                color: '#972C26',
              }}>
              {item.price} {t('SAR')}
            </Text>
          </View>

          {/*
                <View style={{flex:1}}>
                <Text style={{fontSize: 22,
                                fontFamily: FontFamily.ExpoArabicSemiBold,

                                color: "#9c3825",
                                }}>
                    {item.address_type}
                </Text>
                </View>

                <View style={{flex:1,alignItems:'flex-end'}}>
              {selector?  <Image source={require('../../assets/icons/radio1.png')} style={{ height: 20, width: 20,}} />
               : <Image source={require('../../assets/icons/radio2.png')} style={{ height: 20, width: 20,}} />}

                </View>
                </View>

                <View>
                        <Text style={{
                    fontSize: 22,
                    fontFamily:FontFamily.ExpoArabicBook,
                    
                    color: "#7D7D7D",
                    justifyContent: 'center',
                       marginHorizontal:15
                }}>{item.name}</Text>
*/}
        </View>
      </TouchableOpacity>
    </View>
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
  deleteIconAndEditiconStyle: {
    borderRadius: 3,
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  deleteIconAndEditView: {
    height: 30,
    width: 30,
    backgroundColor: '#972C26',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
