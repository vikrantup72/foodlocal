import React, {useEffect, useRef, useState} from 'react';
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
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {TokenContext} from '../components/context';
import {FontFamily, FontSize} from '../components/reusableComponents/Constants';
import {orderDetail} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import BillCard from '../components/Cards/BillCard';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const MyOrderDetailScreen = ({route, navigation}) => {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();
  const [orderDetailData, setorderDetailData] = useState([]);
 

  const [orderDetailLoader, setorderDetailLoader] = useState(false);

  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: token?.token?.location?.position?.lat,
    longitude: token?.token?.location?.position?.lng,
  });
  const itemData = route.params.itemData;
  const navTitleView = useRef(null);
  const orderDetailApi = () => {
    // console.log('itemData.id',itemData.id)
    orderDetail(
      token.token.userToken,
      i18n.language === 'en' ? 'en' : 'ar',
      itemData.id,
    )
      .then(response => {
        console.log('orderDetailresponse', response.data);
        setorderDetailData(response.data);
        setorderDetailLoader(true);
        //  {response.data.status===1||response.data.status===0? alert(response.data.message):null}
      })
      .catch(error => {
        console.log('orderDetailerror', error);
        // alert(error)
        setorderDetailLoader(true);
      });
  };
  const orderDetailDataRenderItem = ({item}) => {
    // console.log('item', item);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 3,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/icons/dot.png')}
            style={{height: 10, width: 10}}
          />
        </View>
        <View style={{flex: 7}}>
          <Text
            style={{
              color: '#404040',
              fontFamily: FontFamily.ExpoArabicSemiBold,
              fontSize: 13,
            }}>
            {item?.name}
          </Text>
        </View>
        <View style={{flex: 3, alignItems: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#404040',
              fontFamily: FontFamily.ExpoArabicBook,
              fontSize: 13,
            }}>
            {parseInt(item?.price).toFixed(2)} {t('SAR')}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    orderDetailApi();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}

      {!orderDetailLoader ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : orderDetailData ? (
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <View
              style={{
                backgroundColor: '#28aa1e',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  fontSize: 24,
                }}>
                {t('orderIs')} {orderDetailData?.data?.order_status?.name}
              </Text>
            </View>

            <View style={styles.container}>
              <MapView
                style={{flex: 1}}
                initialRegion={region}
                onRegionChangeComplete={region => setRegion(region)}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}>
                <Marker
                  coordinate={{
                    latitude: parseFloat(
                      orderDetailData?.data?.restaurant?.latitude,
                    ),
                    longitude: parseFloat(
                      orderDetailData?.data?.restaurant?.longitude,
                    ),
                  }}
                  pinColor={'#972C26'}
                  onPress={() => {}}
                />
              </MapView>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#9c3825',
                    fontFamily: FontFamily.ExpoArabicBold,
                    fontSize: FontSize[15],
                    marginLeft: 10,
                  }}>
                  {orderDetailData?.data?.order_no}
                </Text>
              </View>

              <View style={{flex: 2, backgroundColor: 'transparent'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/locationDot.png')}
                      style={{height: 55, width: 55}}
                    />
                  </View>
                  <View style={{flex: 9, backgroundColor: 'transparent'}}>
                    <View
                      style={{
                        flex: 2,
                        backgroundColor: 'transparent',
                        marginLeft: 10,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#404040',
                          fontFamily: FontFamily.ExpoArabicSemiBold,
                          fontSize: 13,
                        }}>
                        {orderDetailData?.data?.restaurant?.name}
                      </Text>
                      <Text
                        style={{
                          color: '#404040',
                          fontFamily: FontFamily.ExpoArabicBook,
                          fontSize: 10,
                        }}>
                        {orderDetailData?.data?.restaurant?.address}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assets/icons/homeDot.png')}
                        style={{height: 55, width: 55}}
                      />
                    </View>
                    <View style={{flex: 9, backgroundColor: 'transparent'}}>
                      <View
                        style={{
                          flex: 2,
                          backgroundColor: 'transparent',
                          marginLeft: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#404040',
                            fontFamily: FontFamily.ExpoArabicSemiBold,
                            fontSize: 13,
                          }}>
                          {orderDetailData?.data?.address_type_name}
                        </Text>
                        <Text
                          style={{
                            color: '#404040',
                            fontFamily: FontFamily.ExpoArabicBook,
                            fontSize: 10,
                          }}>
                          {orderDetailData?.data?.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#D2D2D2',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      fontSize: 13,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}>
                    {t('BillDetail')}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 3,
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                }}>
                <FlatList
                  data={orderDetailData?.data?.order_details || []}
                  renderItem={orderDetailDataRenderItem}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <BillCard
                amount_without_tax={orderDetailData?.data?.subtotal}
                delivery_charge={orderDetailData?.data?.delivery_charge}
                igst={orderDetailData?.data?.igst}
                discount={orderDetailData?.data?.discount}
                cart_total={orderDetailData?.data?.total}
              />

              <View
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '92%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('TrackingScreen')}
                  onPress={() => navigation.navigate('Home')}>
                  <LinearGradient
                    colors={['#FF0E00', '#4C1613']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{
                      width: 350,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 7,
                      marginTop: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: FontFamily.ExpoArabicSemiBold,
                        color: '#fff',
                      }}>
                      {t('Home')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <OnErrorText title="No restaurant found" />
      )}
    </SafeAreaView>
  );
};

export default MyOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    marginBottom: 10,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
    borderBottomRightRadius: 70,
    borderWidth: 1,
    borderBottomLeftRadius: 70,
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  descriptionStyle: {
    color: '#CCCCCC',

    fontSize: 15,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#2F2519',
    fontSize: 16,
  },
  card: {
    height: 120,

    flexDirection: 'row',

    backgroundColor: 'transparent',

    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  cardImgWrapper: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardImg: {
    height: 90,
    width: 90,

    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  cardInfo: {
    flex: 2,

    borderLeftWidth: 0,

    backgroundColor: 'transparent',
    height: 100,
    justifyContent: 'center',
    marginLeft: 25,
  },

  cardDetails: {
    fontSize: 20,
    color: '#9c3825',
    // fontFamily:FontFamily.ExpoArabicSemiBold,
    fontWeight: 'bold',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  textSign: {
    fontSize: 15,
  },
  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 16,
  },
  deliveryTimeStyle: {
    fontFamily: FontFamily.ExpoArabicBook,
    color: '#CCCCCC',
    fontSize: 13,
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
});
