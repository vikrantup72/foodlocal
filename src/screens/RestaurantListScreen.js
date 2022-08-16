import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import RestaurantListCard from '../components/Cards/RestaurantListCard';
import axios from 'axios';
import { BASE_URL } from '../services/apis/api';
import AsyncStorage from '@react-native-community/async-storage';
import {TokenContext} from '../components/context';
import {FontFamily} from '../components/reusableComponents/Constants';
import {restaurantsList} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {useIsFocused} from '@react-navigation/core';

const RestaurantListScreen = ({navigation,route }) => {
  const {t, i18n} = useTranslation();

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const token = React.useContext(TokenContext);

  const [restaurantList, setRestaurantList] = useState([]);
  const categoryName = route?.params?.categoryName

 let errorName = `No ${categoryName} found nearby`
  const restaurantListApi = () => {
    restaurantsList(
      token?.token?.categoryId,
      i18n?.language === 'en' ? 'en' : 'ar',
      token?.token?.userToken,
      token?.token?.location?.position?.lat,
      token?.token?.location?.position?.lng,
      token?.token?.profileData?.id,
    )
      .then(function (response) {
        // console.log('restaurantListApiresponse.data', response.data);

        setRestaurantList(response.data);
        setLoading(true);
        {
          response.data.status === 0 ? setRestaurantList(null) : null;
        }
      })
      .catch(function (error) {
        // console.log('restaurantListApiFun', error);
        setLoading(true);
      });
  };
  useEffect(() => {
    // restaurantListApiFun();
    restaurantListApi();
  }, [isFocused]);

  const renderItem = ({item}) => {
    // console.log('item', item);
    return (
      <RestaurantListCard
        itemData={item}
        restaurantListApiFun={restaurantListApi}
        onPress={() =>
          navigation.navigate('RestaurantDetailScreen', {
            restaurant_id: item.id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : restaurantList ? (
        <FlatList
          data={restaurantList ? restaurantList.data : []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <OnErrorText title={errorName} />
      )}
    </View>
  );
};

export default memo(RestaurantListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
