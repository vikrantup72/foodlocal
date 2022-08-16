import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';


import {useTranslation} from 'react-i18next';
import {FontFamily, Colors} from '../components/reusableComponents/Constants';
import {applyPromo, promoList, removePromo} from '../services/apis/api';
import {TokenContext} from '../components/context';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {showLoginAlert} from '../utils/showAlert';

const PromocodeScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [promo, setPromo] = React.useState('');
  const [promoListData, setPromoListData] = React.useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const curruntDateTime = new Date().getTime();
  // console.log('date',date)

  // console.log('promoListData',promoListData)

  const token = React.useContext(TokenContext);

  const applyPromoApi = promo => {
    token?.token?.userToken
      ? applyPromo(token.token.userToken, promo)
          .then(response => {
            console.log('applyPromoApiresponse', response.data);
            // setPromoData(response.data)

            //  {response.data.status===1||response.data.status===0? alert(response.data.message):null}
            {
              response.data.status === 1
                ? token.dispatch({
                    type: 'SET_PROMO_DATA',
                    promoAppliedData: response.data,
                  })
                : null;
            }

            {
              response.data.status === 1
                ? navigation.navigate('CartScreen')
                : null;
            }

            {
              !token.token.userToken
                ? navigation.navigate('SignInScreen')
                : null;
            }
            console.log(
              'token.token.promoAppliedData',
              token.token.promoAppliedData,
            );
          })
          .catch(error => {
            console.log('applyPromoApierror', error);
            // alert(error)
          })
      : showLoginAlert(
          navigation,
          t('loginRequired'),
          t('doYouWantToLogin'),
          'SignInScreen',
        );
  };

  const removePromoApi = () => {
    removePromo(token.token.userToken, promo)
      .then(response => {
        console.log('removePromoApiresponse', response.data);
      })
      .catch(error => {
        console.log('removePromoApierror', error);
      });
  };

  const promoListApi = () => {
    promoList(i18n.language === 'en' ? 'en' : 'ar')
      .then(response => {
        setPromoListData(response.data);
        setCouponLoading(true);
      })
      .catch(error => {
        console.log('topRestaurant error', error);
        setCouponLoading(true);
      });
  };

  useEffect(() => {
    promoListApi();
  }, []);

  const promoDetailRender = ({item}) => {
    console.log(item)
    const promoDateTime = new Date(item?.expiry_date).getTime();
    let dateDiffrence = promoDateTime - curruntDateTime;

    return (
      <View>
        {dateDiffrence > 0 ? (
          <View style={{backgroundColor: 'transparent'}}>
            <View
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#fff',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  flex: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#D2D2D2',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0.2,
                    height: 40,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={{height: 25, width: 25}}
                  />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#D2D2D2',
                    flex: 3,
                    borderWidth: 0.2,
                    height: 40,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      fontSize: 13,
                      color: '#972C26',
                      alignSelf: 'center',
                    }}>
                    {item?.code}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={{flex: 6}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    flex: 6,
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      fontSize: 15,
                      color: '#fff',
                      alignSelf: 'flex-end',
                      marginRight: 20,
                      color: '#972C26',
                    }}
                    onPress={() => applyPromoApi(item?.code)}>
                    {t('Apply')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 45,
                width: '95%',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  color: Colors.black,
                }}>
                {item?.title}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderBottomWidth: 0.2,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                marginLeft: 10,
                marginBottom: 20,
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicBook,
                  fontSize: 12,
                  color: Colors.black,
                }}>
                {item?.description}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.action}>
            <TextInput
              placeholder={t('EnterCouponCode')}
              placeholderTextColor="#7D7D7D"
              // secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => setPromo(val)}
            />
            <TouchableOpacity onPress={() => applyPromoApi(promo)}>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                {  t('Apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#D2D2D2',
            justifyContent: 'center',
            height: 40,
            marginTop: 20,
            marginBottom: 30,
          }}>
          <Text
            style={{
              marginLeft: 15,
              fontFamily: FontFamily.ExpoArabicBook,
              fontSize: 13,
              color: Colors.black,
            }}>
            {t('EnterCouponCode')}
          </Text>
        </View>

        {!couponLoading ? (
          <ActivityIndicator size="large" color="#972C26" />
        ) : promoListData ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            rowWrapperStyle={{justifyContent: 'space-between'}}
            data={promoListData ? promoListData.data : []}
            renderItem={promoDetailRender}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: 5,
                  backgroundColor: '',
                }}
              />
            )}
          />
        ) : (
          <OnErrorText title="No data found" />
        )}
      </ScrollView>

      <View></View>
    </SafeAreaView>
  );
};

export default PromocodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#fff'
  },
  header: {
    flex: 1,

    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },

  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,

    fontSize: 50,
    // marginBottom:-25,
  },

  action: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 25,

    backgroundColor: Colors.whiteSmoke,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },

  textInput: {
    flex: 1,

    marLeft: 15,
    paddingVertical: 8,

    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: FontFamily.ExpoArabicMedium,backgroundColor:Colors.whiteSmoke
  },
});
