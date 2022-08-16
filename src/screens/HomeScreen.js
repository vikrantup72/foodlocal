import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import TopRestaurantCard from '../components/Cards/TopRestaurantCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {BASE_URL, restaurentSearch} from '../services/apis/api';
import {TokenContext} from '../components/context';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {
  topRestaurants,
  promoList,
  getCart,
  removeAllCart,
  topTrending,
  topRecommended,
} from '../services/apis/api';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {useIsFocused} from '@react-navigation/core';

const Item2 = ({itemData, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.itemFavourite}>
      <View style={{backgroundColor: 'transparent', width: 120}}>
        <View
          style={{
            backgroundColor: '#972C26',
            width: '100%',
            top: 40,
            height: 7,
            elevation: 5,
          }}
        />
        <Image
          style={{
            height: 70,
            width: 70,
            borderRadius: 70,
            alignSelf: 'center',
            elevation: 6,
          }}
          source={{uri: `${BASE_URL}${itemData.image}`}}
        />
      </View>
      <Text style={styles.title}>{itemData.name}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const Item3 = ({title, image}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.itemPromoCodes}>
        <Image
          style={{
            height: 90,
            width: 90,
            borderRadius: 3,
            alignSelf: 'center',
          }}
          source={{uri: `${BASE_URL}${image}`}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const HomeScreen = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);
  const isFocused = useIsFocused();

  const itemData = route?.params?.itemData;
  const [topRecommendedData, setTopRecommendedData] = useState([]);
  const [topTranding, setTopTranding] = useState([]);
  const [topTrandingLoading, setTopTrandingLoading] = useState([]);

  const [promoListData, setPromoListData] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  const header = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('../assets/icons/menu.png')}
              style={[{marginLeft: 30, height: 22, width: 22, marginTop: 10}]}
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', flex: 3}}>
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
            }}
            numberOfLines={2}>
            {token?.token?.location?.formattedAddress}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style={{alignSelf: 'flex-end', marginRight: '20%'}}>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <Image
                source={require('../assets/icons/cart_red.png')}
                style={{height: 22, width: 22, alignSelf: 'center'}}
              />
              <Text style={{color: '#9c3825', marginTop: -5}}>
                {token?.token?.cartData?.cart_quantity}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const removeAllCartApi = () => {
    removeAllCart(token?.token?.deviceId)
      .then(async function (response) {
        {
          response.data.status === 1 ? console.log('cart remove') : null;
        }
        console.log('response.dataddd', response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const topRecommendedApi = () => {
    setRecommendedLoading(true);

    topRecommended(token.token.categoryId, i18n.language === 'en' ? 'en' : 'ar')
      .then(response => {
        //    console.log('respo',response.data)
        {
          response?.data?.status === 1
            ? setTopRecommendedData(response.data)
            : setTopRecommendedData(null);
        }

        setRecommendedLoading(false);
      })
      .catch(error => {
        setRecommendedLoading(false);
        setTopRecommendedData(null);

        console.log('topRestaurant error', error);
      });
  };

  const topTrandingApi = () => {
    setTopTrandingLoading(true);
    topTrending(token.token.categoryId, i18n.language === 'en' ? 'en' : 'ar')
      .then(response => {
        setTopTranding(response.data);
        {
          response?.data?.status === 1
            ? setTopTranding(response.data)
            : setTopTranding(null);
        }
        setTopTrandingLoading(false);
      })
      .catch(error => {
        setTopTrandingLoading(false);
        setTopTranding(null);

        console.log('topRestaurant error', error);
      });
  };

  const promoListApi = () => {
    setPromoLoading(true);
    promoList(i18n.language === 'en' ? 'en' : 'ar')
      .then(response => {
        setPromoListData(response.data);
        setPromoLoading(false);
      })
      .catch(error => {
        console.log('topRestaurant error', error);
        setPromoLoading(false);
      });
  };

  const cartListApiCall = () => {
    console.log('token.token.restaurentId', token.token.restaurentId);
    getCart(
      token.token.userToken,
      parseInt(token.token.restaurentId),
      i18n.language === 'en' ? 'en' : 'ar',
      token.token.deviceId,
      token.token.promoAppliedData === null
        ? ''
        : token.token.promoAppliedData.data.id,
    )
      .then(response => {
        console.log('cartResponse', response.data);
        if (response.data.status === 1) {
          token.dispatch({
            type: 'CART_SET',
            cartData: response.data.data,
          });
        }
      })
      .catch(error => {
        console.log('errorss', error);
      });
  };

  useEffect(() => {
    promoListApi();
    topRecommendedApi();
    topTrandingApi();
    token?.token?.restaurentId ? cartListApiCall() : null;
  }, [isFocused]);
  useEffect(() => {
    !token.token.restaurentId ? removeAllCartApi() : null;
  }, []);

  const theme = useTheme();
  const renderItem = ({item}) => {
    return (
      <View>
        <TopRestaurantCard
          itemData={item}
          onPress={() =>
            navigation.navigate('RestaurantDetailScreen', {
              restaurant_id: item.id,
            })
          }
        />
      </View>
    );
  };
  const renderItem2 = ({item}) => {
    return (
      <View>
        <Item2
          itemData={item}
          onPress={() =>
            navigation.navigate('RestaurantDetailScreen', {
              restaurant_id: item.id,
            })
          }
        />
      </View>
    );
  };

  const renderItem3 = ({item}) => (
    <Item3 title={item.title} image={item.image} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      {header()}
      <View style={styles.view1}>
        <View
          style={{
            flex: 3,
            paddingTop: 2,
            marginTop: '3%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,

              color: '#9c3825',
              fontFamily: FontFamily.ExpoArabicBook,
              alignSelf: 'center',
            }}>
            {t('ClientsChoice')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',

            borderRadius: 5,
            paddingTop: 15,
          }}>
          <TouchableOpacity
            style={styles.iconsBackGround}
            onPress={() => navigation.navigate('SearchResult')}>
            <Image
              source={require('../assets/icons/search.png')}
              style={styles.imageStyle}
            />
            <Text
              style={{
                color: '#972C26',
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 16,
                backgroundColor: 'transparent',
              }}>
              {t('Search')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconsBackGround}
            onPress={() => navigation.navigate('Category')}>
            <Image
              source={require('../assets/icons/home.png')}
              style={styles.imageStyle}
            />
            <Text
              style={{
                color: '#972C26',
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 16,
                backgroundColor: 'transparent',
              }}>
              {t('Home')}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilterScreen', {title: 'Restaurant'})
            }>
            <ImageBackground
              source={require('../assets/filterBack.png')}
              style={{height: 45, width: 100, alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',

                  paddingTop: 5,
                }}>
                <Image
                  source={require('../assets/icons/filter.png')}
                  style={{height: 15, width: 15, marginTop: 3}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#972C26',
                    fontFamily: FontFamily.ExpoArabicBook,
                    marginLeft: 5,
                  }}>
                  {t('Filter')}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilterScreen', {title: 'Restaurant'})
            }
            style={styles.iconsBackGround}>
            <Image
              source={require('../assets/icons/filter.png')}
              style={{height: 15, width: 15, marginTop: 4}}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#972C26',
                fontFamily: FontFamily.ExpoArabicBook,
                marginLeft: 5,
                marginTop: 5,
              }}>
              {t('Filter')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 4,
          justifyContent: 'center',
        }}>
        <View style={{backgroundColor: 'transparent'}}>
          {topTrandingLoading ? (
            <ActivityIndicator size="large" color="#972C26" />
          ) : topTranding ? (
            <FlatList
              data={topTranding ? topTranding?.data : []}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // extraData={renderItem2}
            />
          ) : (
            <OnErrorText title={`Top ${itemData?.name} not found`} />
          )}
        </View>
      </View>
      <View
        style={{
          height: '20%',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('RestaurantListScreen', {
              title: 'Restaurant',
              categoryId: itemData?.id,
              categoryName: itemData?.name,
            })
          }>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              paddingHorizontal: 15,
              paddingVertical: 0,
              justifyContent: 'space-between',
            }}>
            <ImageBackground
              source={{
                uri: `${BASE_URL}${itemData.image}`,
              }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
              }}
              imageStyle={{borderRadius: 10}}>
              <View style={{backgroundColor: 'transparent'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    fontFamily: FontFamily.ExpoArabicSemiBold,

                    paddingTop: 10,
                    paddingHorizontal: 11,
                  }}>
                  {t('All')} {itemData?.name}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontFamily.ExpoArabicMedium,
                    color: Colors.white,
                    alignSelf: 'center',
                  }}>
                  {t('ViewAll')}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          flex: 5,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            paddingHorizontal: 20,
            color: '#2F2519',
            fontFamily: FontFamily.ExpoArabicBook,
          }}>
          {t('Recommended')}
        </Text>
        <View>
          {recommendedLoading ? (
            <ActivityIndicator size="large" color="#972C26" />
          ) : topRecommendedData ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              rowWrapperStyle={{justifyContent: 'space-between'}}
              horizontal={true}
              data={topRecommendedData ? topRecommendedData.data : []}
              renderItem={renderItem2}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={{width: 0}} />}
              numRows={2}
            />
          ) : (
            <OnErrorText title="Recommended not found" />
          )}
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          flex: 4,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 20,
            color: '#972C26',
            fontFamily: FontFamily.ExpoArabicBook,
            backgroundColor: 'transparent',
          }}>
          {t('PromoCodes')}
        </Text>
        {/* <Text onPress={()=>handleNotification()}>aaaa</Text> */}
        <View style={{marginBottom: 20}}>
          {promoLoading ? (
            <ActivityIndicator size="large" color="#972C26" />
          ) : promoListData ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              rowWrapperStyle={{justifyContent: 'space-between'}}
              horizontal={true}
              data={promoListData ? promoListData.data : []}
              renderItem={renderItem3}
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
            <OnErrorText title="Promo codes not found" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    color: '#646464',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemFavourite: {
    width: 95,

    backgroundColor: 'transparent',
    marginHorizontal: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
    color: '#972C26',
    marginTop: 5,
    fontFamily: FontFamily.ExpoArabicBook,
    lineHeight: 17,
  },
  itemPromoCodes: {
    height: 90,
    width: 70,

    marginLeft: 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 15,
    width: 15,
    backgroundColor: 'transparent',
    marginRight: 4,
    marginBottom: Platform.OS === 'android' ? 3 : 5,
  },
  iconsBackGround: {
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginHorizontal:5
  },
});

export default HomeScreen;
