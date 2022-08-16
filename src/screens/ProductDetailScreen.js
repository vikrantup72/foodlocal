import React, {useRef, useState, useCallback, useEffect} from 'react';
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
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {BASE_URL} from '../services/apis/api';
import {TokenContext} from '../components/context';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import {useIsFocused} from '@react-navigation/core';
import {
  addCart,
  addOnMenuList,
  getCart,
  menuDetail,
} from '../services/apis/api';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import AddButton from '../components/AddButton';
import IncDecButton from '../components/IncDecButton';
import SingleAddOnListButtonSelector from '../components/SingleAddOnListButtonSelector';
import AddOnListButtonSelector from '../components/AddOnListButtonSelector';
import AddOnListComponent from '../components/AddOnListComponent';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;




const ProductDetailScreen = ({route, navigation}) => {
  const [menuDetailData, setMenuDetailData] = useState([]);
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);
  const [quantityLoading, setQuantityLoading] = useState(false);

  const [loader, setLoader] = useState(false);
  const itemData = route.params.itemData;
  const [success, setSuccess] = useState(true);

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
  const cartListApiCall = () => {
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
  const menuDetailApi = () => {
    menuDetail(
      itemData.restaurant_id,
      i18n.language === 'en' ? 'en' : 'ar',
      token.token.userToken,
      token.token.deviceId,
      itemData.id,
    )
      .then(function (response) {
        setMenuDetailData(response.data);
        {
          response.data.status === 0 ? setMenuDetailData(null) : null;
        }
        setLoader(true);
      })
      .catch(function (error) {
        setLoader(true);
      });
  };
  useEffect(() => {
    menuDetailApi();
  }, [isFocused]);

  const [addOnloader, setAddOnLoader] = useState(false);

  const [addOnListData, setAddOnListData] = useState([]);

  const [addOnMultipleSelected, setAddOnMultipleSelected] = useState([]);
  const [addOnSingleSelected, setAddOnSingleSelected] = useState([]);

  const [multipleSelectedData, setMultipleSelectedData] = useState([]);
  const [defaultSingleData, setDefaultSingleData] = useState([]);
  const [onSelectItemWithIndex, setOnSelectItemWithIndex] = useState({});
  const [orderNowLoader, setOrderNowLoader] = useState(false);

  const addOnData = finalAddOnData => {
    // console.log('multipleSelectedData',multipleSelectedData)
    //console.log('addOnSingleSelected',addOnSingleSelected)

    addCart(
      itemData?.restaurant_id,
      token.token.userToken,
      itemData?.id,
      token.token.deviceId,
      finalAddOnData,
    )
      .then(async function (response) {
        console.warn('response.datazzz', response.data?.status);

        if (response.data.status === 1) {
          await AsyncStorage.setItem(
            'restaurentId',
            JSON.stringify(itemData?.restaurant_id),
          );
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: itemData?.restaurant_id,
          });
        }

        if (response?.data?.status === 1) {
          cartListApiCall(itemData?.restaurant_id);
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log('errorssssssss', error);
      });
  };

  const combineAddOnData = () => {
    let singleDataInArray = [];
    defaultSingleData?.forEach(item => {
      singleDataInArray?.push(parseInt(item?.id));
    });

    let finalAddOnData = [];
    finalAddOnData.push(singleDataInArray, multipleSelectedData);
    //  let finalAddOnData = [...singleDataInArray,...multipleSelectedData]
    console.log('singleDataInArray', singleDataInArray);
    console.log('multipleSelectedData', multipleSelectedData);

    console.log('finalAddOnData', finalAddOnData);

    finalAddOnData.length === 0
      ? alert('Please seelect add on items')
      : addOnData(finalAddOnData);
  };

  const addOnMenuListApi = () => {
    const menu_id = itemData?.id;
    addOnMenuList(menu_id)
      .then(function (response) {
       

        setAddOnListData(response?.data);
      

        setAddOnLoader(true);
      })
      .catch(function (error) {
        console.log('addOnMenuList', error);

        setAddOnLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setAddOnLoader(true));
  };

  useEffect(() => {
    addOnMenuListApi();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%'}}>
        {item?.type === 'single' ? (
          <View>
            <View>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicMedium,
                  marginLeft: 10,
                  marginTop: 30,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                {item?.name}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
             
              <SingleAddOnListButtonSelector
                addOnListData={item?.addon_items || []}
                setAddOnSingleSelected={setAddOnSingleSelected}
                addOnSingleSelected={addOnSingleSelected}
                setDefaultSingleData={setDefaultSingleData}
                defaultSingleData={defaultSingleData}
                singleDataIndex={index}
                setOnSelectItemWithIndex={setOnSelectItemWithIndex}
                onSelectItemWithIndex={onSelectItemWithIndex}
              />
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text
                style={{
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  marginLeft: 37,
                  marginTop: 30,
                  fontSize: 15,
                }}>
                {item?.name}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <AddOnListButtonSelector
                addressListData={addOnListData ? item?.addon_items || [] : []}
                addressListApi={addOnMenuListApi}
                setAddressId={setAddOnMultipleSelected}
                multiple={true}
                setAddOnMultipleSelected={setAddOnMultipleSelected}
                addOnMultipleSelected={addOnMultipleSelected}
                setMultipleSelectedData={setMultipleSelectedData}
                multipleSelectedData={multipleSelectedData}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!loader ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : menuDetailData ? (
        <View style={styles.saveArea}>
          <Animated.ScrollView
            contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 20}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 20,
                  borderBottomWidth: 0.3,
                  borderBottomColor: Colors.lightPrimary,
                  paddingBottom: 5,
                }}>
                <View
                  style={{
                    flex: 7,
                    backgroundColor: 'transparent',
                  }}>
                  <Text
                    style={{
                      color: '#9c3825',
                      fontSize: 22,
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      marginLeft: 10,
                    }}>
                    {menuDetailData?.data?.name}
                  </Text>

                  <Text
                    style={{
                      color: Colors.primary,
                      fontFamily: FontFamily.ExpoArabicBook,
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                    numberOfLines={3}>
                    {menuDetailData?.data?.description}
                  </Text>
                  <Text
                    style={{
                      color: '#9c3825',
                      fontSize: 15,
                      fontFamily: FontFamily.ExpoArabicMedium,
                      marginVertical: 5,
                      marginLeft: 10,
                    }}>
                    {menuDetailData?.data?.calorie} Calories
                  </Text>
                </View>
                {itemData?.type === 'normal' ? (
                  <View style={{backgroundColor: 'transparent', flex: 4}}>
                    {menuDetailData?.data?.cart_quantity === 0 ? (
                      <AddButton
                        itemData={menuDetailData?.data}
                        navigation={navigation}
                        menuListApiFun={menuDetailApi}
                        cartListApiCall={cartListApiCall}
                        quantityLoading={quantityLoading}
                        setQuantityLoading={setQuantityLoading}
                      />
                    ) : (
                      <IncDecButton
                        itemData={menuDetailData.data}
                        menuListApiFun={menuDetailApi}
                        navigation={navigation}
                        cartListApiCall={cartListApiCall}
                        quantityLoading={quantityLoading}
                        setQuantityLoading={setQuantityLoading}
                      />
                    )}
                  </View>
                ) : null}
              </View>
              {itemData?.type === 'custom' ? (
                <AddOnListComponent
                  itemData={itemData}
                  navigation={navigation}
                />
              ) : null}
            </View>
          </Animated.ScrollView>
          <Animated.View
            style={[
              styles.header,
              {transform: [{translateY: headerTranslateY}]},
            ]}>
            <Animated.Image
              style={[
                styles.headerBackground,
                {
                  //   opacity: imageOpacity,
                  transform: [{translateY: imageTranslateY}],
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                },
              ]}
              source={{uri: `${BASE_URL}${menuDetailData?.data?.image}`}}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.topBar,
              {
                transform: [{scale: titleScale}, {translateY: titleTranslateY}],
              },
            ]}
          />
        </View>
      ) : (
        <View style={{marginTop:'50%'}}>
          <OnErrorText title="No Data found" />
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
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
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginTop: -10,
  },
  card: {
    height: 100,

    marginVertical: 10,
    flexDirection: 'row',

    backgroundColor: '#F9F9F9',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardImgWrapper: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: '#F9F9F9',
  },
  cardImg: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 8,
    // backgroundColor:"white"
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',

    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#F9F9F9',
    height: 100,
  },

  cardDetails: {
    fontSize: 25,
    color: '#9c3825',
    fontWeight: 'bold',
    marginTop: 5,
  },

  item: {
    height: 120,
    width: 70,

    marginHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color: '#9c3825',
    marginTop: 5,
  },

  addButtonView: {
    flexDirection: 'row',
    height: 27,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 20,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: FontFamily.ExpoArabicBook,
  },
  IncDecButton: {
    flexDirection: 'row',
    height: 27,
    width: 85,

    borderRadius: 5,

    marginBottom: 15,
    marginLeft: 20,
    backgroundColor: 'transparent',
  },
  countControllerView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  plusText: {
    fontSize: 20,
    color: '#fff',
  },
  minusText: {
    color: '#fff',
    fontSize: 27,
    fontFamily: FontFamily.ExpoArabicBook,
  },
  addOnText: {
    fontFamily: FontFamily.ExpoArabicBook,
    fontSize: 15,
    marginLeft: 30,
    marginTop: 3,
  },
  // image: {
  //   height: MAX_HEIGHT,
  //   width: Dimensions.get('window').width,
  //   alignSelf: 'stretch',
  //   resizeMode: 'cover',
  // },
  navTitle: {
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-Semi-Bold',
  },
  saveArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    // backgroundColor: '#62d1bc',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
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
  title: {
    color: 'white',
    fontSize: 20,
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
});
