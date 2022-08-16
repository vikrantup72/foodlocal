import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {addCart, addOnMenuList, getCart} from '../services/apis/api';
import {useState, useEffect} from 'react';
import OnErrorText from './reusableComponents/OnErrorText';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, FontFamily} from './reusableComponents/Constants';
import SingleAddOnListButtonSelector from './SingleAddOnListButtonSelector';
import AddOnListButtonSelector from './AddOnListButtonSelector';
import {TokenContext} from './context';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

const AddOnListComponent = ({itemData, navigation}) => {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();

  const [addOnloader, setAddOnLoader] = useState(false);

  const [addOnListData, setAddOnListData] = useState([]);

  const [addOnMultipleSelected, setAddOnMultipleSelected] = useState([]);
  const [addOnSingleSelected, setAddOnSingleSelected] = useState([]);

  const [multipleSelectedData, setMultipleSelectedData] = useState([]);
  const [defaultSingleData, setDefaultSingleData] = useState([]);
  const [onSelectItemWithIndex, setOnSelectItemWithIndex] = useState({});
  const [orderNowLoader, setOrderNowLoader] = useState(false);
  const [selectedMultipleArray, setSelectedMultipleArray] = useState([]);

  const addOnData = finalAddOnData => {
    // console.log('multipleSelectedData',multipleSelectedData)
    //console.log('addOnSingleSelected',addOnSingleSelected)
    // console.log('itemDataitemData', itemData);
    addCart(
      itemData?.restaurant_id,
      token.token.userToken,
      itemData?.id,
      token.token.deviceId,
      finalAddOnData.toString(),
    )
      .then(async function (response) {
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
      singleDataInArray?.push([item?.id]);
    });

    let selectedMultipleDataInArray = [];

    selectedMultipleArray.forEach(element => {
      selectedMultipleDataInArray.push(element?.id);
    });

    // const combineSelectedMultipleArrayIdWithParentIndex =
    //   selectedMultipleArray.reduce((acc, {id, parentIndex}) => {
    //     acc[parentIndex] ??= {parentIndex: parentIndex, id: []};
    //     if (Array.isArray(id))
    //       acc[parentIndex].id = acc[parentIndex].id.concat(id);
    //     else acc[parentIndex].id.push(id);

    //     return acc;
    //   }, {});

    // let selectedMultipleDataInArray = [];

    // Object.values(combineSelectedMultipleArrayIdWithParentIndex).forEach(
    //   element => {
    //     selectedMultipleDataInArray.push(element?.id); // for future work
    //   },
    // );

    let finalAddOnData = [...singleDataInArray, ...selectedMultipleDataInArray];

    finalAddOnData.length === 0
      ? alert('Please seelect add on items')
      : addOnData(finalAddOnData);
  };

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
                parentIndex={index}
                setSelectedMultipleArray={setSelectedMultipleArray}
                selectedMultipleArray={selectedMultipleArray}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
  return (
    <View>
      {!addOnloader ? (
        <View style={{marginTop: 40}}>
          <ActivityIndicator size="large" color="#972C26" />
        </View>
      ) : addOnListData ? (
        <FlatList data={addOnListData?.data} renderItem={renderItem} />
      ) : (
        <OnErrorText title="No data found" />
      )}

      <View style={{width: '100%', height: 100, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => combineAddOnData()}>
          <LinearGradient
            colors={['#FF0E00', '#4C1613']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: '80%',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              alignSelf: 'center',
            }}>
            {orderNowLoader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  color: '#fff',
                }}>
                Add
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddOnListComponent;
