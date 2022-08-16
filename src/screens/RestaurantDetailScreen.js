/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect, useCallback, memo} from 'react';

import {
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Alert,
  Animated,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  LogBox,
} from 'react-native';

import ItemListCard from '../components/Cards/ItemListCard';

import {useTranslation} from 'react-i18next';
import { BASE_URL } from '../services/apis/api';
import {TokenContext} from '../components/context';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/core';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {
  menuCategory,
  menuList,
  removeAllCart,
  restaurantDetail,
} from '../services/apis/api';
import Star from '../components/reusableComponents/Star';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import Choosebutton from '../components/Choosebutton';

const MIN_HEIGHT = Platform.OS === 'ios' ? 110 : 120;
const MAX_HEIGHT = 200;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 180;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const RestaurantDetailScreen = ({navigation, route}) => {
  const token = React.useContext(TokenContext);
  const restaurant_id = route.params.restaurant_id;
  // console.warn('restauranzzzzzzt_id',restaurant_id)
  const {t, i18n} = useTranslation();

  const [loader, setLoader] = useState(false);
  const [menuListloader, setMenuListLoader] = useState(false);

  const [restaurantDetailData, setRestaurantDetailData] = useState([]);

  // console.log(
  //   'restaurantDetailData?.data?.rating',
  //   restaurantDetailData?.data?.rating,
  // );
  const [menuListData, setMenuListData] = useState([]);
  const [menuCategoryListData, setMenuCategoryListData] = useState([]);

  // console.log('menuListData.staus',menuListData)
  // console.log('menuListData',menuListData.data.category)
  const [categoryId, setCategoryId] = useState(null);
  //  alert(categoryId)

  const isFocused = useIsFocused();

  const menuListApi = () => {
    menuList(
      restaurant_id,
      i18n.language === 'en' ? 'en' : 'ar',
      token.token.userToken,
      token.token.deviceId,
      categoryId,
    )
      .then(function (response) {
        setMenuListData(response.data);
        //console.log('response.data ', response.data.data[0].menu_list);

        setMenuListLoader(false);
        {
          response.data.status === 0 ? setLoader(true) : setLoader(true);
        }
      })
      .catch(function (error) {
        console.log('getMenuById', error);
        setLoader(true);
        setMenuListLoader(false);
      });
  };

  const menuCategoryListApi = () => {
    menuCategory(restaurant_id, i18n.language === 'en' ? 'en' : 'ar')
      .then(function (response) {
        //  console.log('menuCategoryListApi ', response.data);
        setMenuCategoryListData(response.data);
      })
      .catch(function (error) {
        console.log('menuCategory', error);
        setLoader(true);
      });
  };

  const restaurentDetailApi = () => {
    restaurantDetail(restaurant_id, i18n.language === 'en' ? 'en' : 'ar')
      .then(function (response) {
        setRestaurantDetailData(response.data);

        // console.log('response.data.data.menu',response.data.data.rating);
      })
      .catch(function (error) {
        setRestaurantDetailData(null);
        setLoader(true);
      });
  };

  useEffect(() => {
    // menuListApiFun();
    menuListApi();
    menuCategoryListApi();
    restaurentDetailApi();
  }, [isFocused]);
  useEffect(() => {
    // menuListApiFun();
    // alert('ssss')
    setMenuListLoader(true);

    menuListApi();
  }, [isFocused, categoryId]);

  // console.log('itemData', itemData.id);
  const renderItem = ({item, index}) => {
    // console.log('itesssm', item?.id);

    return (
      <View>
        <ItemListCard
          itemData={item}
          navigation={navigation}
          menuListApiFun={menuListApi}
          // restaurantDetail={item.restaurant}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              itemData: item,
              restaurantDetail: item?.restaurant,
            })
          }

         
        />
      </View>
    );
  };

  const subCategorySelector = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: Colors.lightShadeGray,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#9c3825',
              fontFamily: FontFamily.ExpoArabicSemiBold,
              paddingVertical: 10,
              marginLeft: 20,
              fontSize: 17,
            }}>
            {item?.name}
          </Text>
        </View>

        {/* <FlatList
                data={item.menu_list}
                renderItem={renderItem}
                
                
                // keyExtractor={(item, index) => item.id.toString()}
              /> */}
        {item?.menu_list?.map((item, index) => {
          return renderItem({item, index});
        })}
      </View>
    );
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.saveArea}>
      <Animated.ScrollView
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 32}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={{marginTop: 40, justifyContent: 'center'}}>
          {!loader ? (
            <ActivityIndicator size="large" color="#9c3825" />
          ) : menuListData ? (
            <View>
              <Choosebutton
                addressListTypeData={
                  menuCategoryListData ? menuCategoryListData?.data : []
                }
                addressListApi={menuListApi}
                setAddressTypeId={setCategoryId}
                multiple={false}
              />
              <View style={{justifyContent: 'center', marginTop: 20}}>
                {menuListloader ? (
                  <ActivityIndicator size="large" color="#9c3825" />
                ) : menuListData?.status === 1 ? (
                  menuListData?.data?.map((item, index) => {
                    return subCategorySelector({item, index});
                  })
                ) : (
                  <View style={{marginTop: 40}}>
                    <OnErrorText title="No Data found" />
                  </View>
                )}
              </View>
            </View>
          ) : (
            <View style={{marginTop: 40}}>
              <OnErrorText title="No Data found" />
            </View>
          )}
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: headerTranslateY,
              },
            ],
            backgroundColor: '#F7EEEE',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            alignItems: 'center',
          },
        ]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              bottom: 50,
            },
          ]}
          source={{
            uri: `${BASE_URL}${restaurantDetailData?.data?.image}`,
          }}
        />

        <View style={styles.titleMainContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.headerTrans}>
              <View style={styles.restaurantNameViewContainer}>
                <View style={styles.restaurantNameView}>
                  <Text style={styles.restaurantName}>
                    {restaurantDetailData?.data?.name}
                  </Text>

                  <View
                    style={{backgroundColor: 'transparent', marginTop: '5%'}}>
                    <Text style={styles.deliveryTimeStyle}>
                      {t('DeliveryTime')}
                    </Text>
                  </View>

                  <View style={styles.timeTextView}>
                  
                    <Text style={styles.timeTextStyle}>
                      {restaurantDetailData?.data?.delivery_time} min
                    </Text>
                  </View>

                  <View style={styles.ratingTextAndIconView}>
                    <Star rating={restaurantDetailData?.data?.rating} />
                  </View>
                </View>
              </View>

              <View style={styles.disTimeMainContainer}>
                <View style={styles.resDiscriptionTextView}>
                  <ScrollView style={{paddingVertical: 10}}>
                    <Text style={styles.descriptionStyle} numberOfLines={3}>
                      {restaurantDetailData?.data?.description}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{scale: titleScale}, {translateY: titleTranslateY}],
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addOnText: {
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 15,
    marginLeft: 30,
    marginTop: 3,
  },

  navTitle: {
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-Semi-Bold',
  },
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
    paddingHorizontal:10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    //  top: 0,
    left: 0,
    right: 0,

    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
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

  timeTextStyle: {
    color: '#BABBB9',
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 15,
    marginTop: '1%',
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  descriptionStyle: {
    color: '#CCCCCC',
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 14,
  },

  sectionLarge: {
    minHeight: 300,
  },

  restaurantName: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
  deliveryTimeStyle: {
    fontFamily: FontFamily.ExpoArabicBook,
    color: '#CCCCCC',
    fontSize: 15,
  },
  offerTextStyle: {
    color: '#9c3825',
    fontSize: 15,
    fontFamily: FontFamily.ExpoArabicBook,
    marginTop: 12,
  },
  titleMainContainer: {
    height: 130,
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  deliveryTimeTextView: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  timeTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  disTimeMainContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  resDiscriptionTextStyle: {
    color: '#BABBB9',
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 10,
  },
  resDiscriptionTextView: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  ratingTextStyle: {
    marginHorizontal: 8,
    fontSize: 14,
    fontFamily: FontFamily.ExpoArabicBook,
    color: '#CCCCCC',
  },
  ratingTextAndIconView: {
    backgroundColor: 'transparent',
    // flexDirection: 'row',
    // alignItems: 'center',
    marginTop: '3%',
  },
  restaurantNameViewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantNameView: {
    backgroundColor: 'transparent',
    height: '100%',
    // justifyContent: 'space-around',
    width: '80%',
    marginLeft: 25,
  },
  headerTrans: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});

export default memo(RestaurantDetailScreen);
