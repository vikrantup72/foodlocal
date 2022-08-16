import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  Image,
  Alert,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  LogBox,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Crust from '../components/StepperScreen/Crust';
import Size from '../components/StepperScreen/Size';
import Addon from '../components/StepperScreen/Addon';
import {FontFamily} from '../components/reusableComponents/Constants';
import {
  addCart,
  addOnMenuList,
  addressList,
  getCart,
} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import {TokenContext} from '../components/context';
import AddOnListButtonSelector from '../components/AddOnListButtonSelector';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import AddOnSingle from '../components/AddOnSingle';
import { BASE_URL } from '../services/apis/api';
import AsyncStorage from '@react-native-community/async-storage';
import SingleAddOnListButtonSelector from '../components/SingleAddOnListButtonSelector';
import AddOnListComponent from '../components/AddOnListComponent';

// const MIN_HEIGHT = Platform.OS === 'ios' ? 110 : 120;
// const MAX_HEIGHT = 200;

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ItemDetailStepperScreen = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);
  const [singleItemLength, setSingleItemLength] = useState(null);
  const [multipleItemLength, setMultipleItemLength] = useState(null);
  const itemData = route?.params?.itemData;
console.log('itemData',itemData?.image)
  const menu_id = itemData?.id;
  const restaurant_id = itemData?.restaurant_id;
  const menu_image = itemData?.image;
  const navTitleView = useRef(null);
  const [orderNowLoader, setOrderNowLoader] = useState(false);

  const [loader, setLoader] = useState(false);

  const [addOnListData, setAddOnListData] = useState([]);

  const [addOnMultipleSelected, setAddOnMultipleSelected] = useState([]);
  const [addOnSingleSelected, setAddOnSingleSelected] = useState([]);

  const [multipleSelectedData, setMultipleSelectedData] = useState([]);
  const [defaultSingleData, setDefaultSingleData] = useState([]);
  const [onSelectItemWithIndex, setOnSelectItemWithIndex] = useState({});
  // console.log('multipleSelectedData',multipleSelectedData)

  // console.log('multipleSelectedData',multipleSelectedData)
  // console.log('addOnSingleSelected',addOnSingleSelected)

  const cartListApiCall = restaurant_id => {
    getCart(
      token.token.userToken,
      parseInt(token.token.restaurentId) || restaurant_id,
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

  const addOnData = finalAddOnData => {
    // console.log('multipleSelectedData',multipleSelectedData)
    //console.log('addOnSingleSelected',addOnSingleSelected)

    addCart(
      restaurant_id,
      token.token.userToken,
      menu_id,
      token.token.deviceId,
      finalAddOnData,
    )
      .then(async function (response) {
        console.warn('response.datazzz', response.data);

        if (response.data.status === 1) {
          await AsyncStorage.setItem(
            'restaurentId',
            JSON.stringify(restaurant_id),
          );
          token.dispatch({
            type: 'RESTAURENT_ID_SET',
            restaurentId: restaurant_id,
          });
        }

        if (response.data.status === 1) {
          cartListApiCall(restaurant_id);
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log('errorssssssss', error);
      });
  };
  const addOnMenuListApi = () => {
    addOnMenuList(menu_id)
      .then(function (response) {
        // console.log('response.addOnMenuList', response?.data?.data?.[0]?.addon_items?.length);
        // console.log('response.response?.data?.data?.[0]?.addon_items', response?.data?.data);

        setAddOnListData(response?.data);
        // let singleFilterAddon = response?.data?.data.filter(data => {
        //   return data.type === 'single';
        // });
        // let multipleFilterAddon = response?.data?.data.filter(data => {
        //   return data.type === 'multiple';
        // });
        // setSingleItemLength(singleFilterAddon?.length);
        // setMultipleItemLength(multipleFilterAddon?.length);

        //  console.log('singleFilterAddon',singleFilterAddon)
        // console.log('multipleFilterAddon',multipleFilterAddon)

        setLoader(true);
      })
      .catch(function (error) {
        console.log('addOnMenuList', error);
        alert('Error');

        setLoader(true);
        // setQuantityLoading(false);
      })
      .finally(() => setLoader(true));
  };

  useEffect(() => {
    addOnMenuListApi();
  }, []);
  const combineAddOnData = () => {
    let singleDataInArray = [];
    defaultSingleData?.forEach(item => {
      singleDataInArray.push(parseInt(item?.id));
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

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%'}}>
        {item?.type === 'single' ? (
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
              {/* <Crust
                title="Pizza"
                addOnListData={item?.addon_items || []}
                setAddOnSingleSelected={setAddOnSingleSelected}
                addOnSingleSelected={addOnSingleSelected}
              /> */}
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
    <SafeAreaView style={styles.saveArea}>
      <Animated.ScrollView
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 32}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={{marginTop: 20, }}>

           <AddOnListComponent itemData={itemData} navigation={navigation}/> 



        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
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
          source={{uri: `${BASE_URL}${menu_image}`}}
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
    backgroundColor: '#eff3fb',
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

export default ItemDetailStepperScreen;
