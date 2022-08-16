import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FavouriteListCard from '../components/Cards/FavouriteListCard';
import {TokenContext} from '../components/context';
import axios from 'axios';
import { BASE_URL } from '../services/apis/api';
import {FontFamily} from '../components/reusableComponents/Constants';
import {useTranslation} from 'react-i18next';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import Snackbar from 'react-native-snackbar';

const FavouriteScreen = ({navigation}) => {
  const token = React.useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const [favouriteList, setFavouriteList] = useState([]);
  console.log('favouriteList.status', favouriteList);

  const favouriteListApiFun = useCallback(() => {
    console.warn('Api Running');
    console.log('token.token.userToken', token.token.userToken);
    axios
      .post(`${BASE_URL}api/v1/restaurants/favorite-list`, {
        token: token.token.userToken,
        category_id: token.token.categoryId,
        language:i18n.language === 'en' ? 'en' : 'ar'
      })

      .then(function(response) {
        console.log('favorite.data ', response.data);
        // console.warn('response.data.status ', response.data.status);
        // console.warn('response.data.message', response.data.message);
        // console.warn('response.data.data ', response.data.data);
        setFavouriteList(response.data);
        // console.warn('response.data.data[0]', response.data.data[0]);
        setLoading(true);
        if(response.data.status===0){
          
          Snackbar.show({
            text: response.data.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          setFavouriteList(null);

        }
      })
      .catch(function(error) {
        console.log('restaurantListApiFun', error);
        Snackbar.show({
          text: error,
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(true);
      });
  }, [
    // favouriteList
  ]);
  useEffect(() => {
    favouriteListApiFun();
  }, [
    // favouriteList
  ]
  );

  const renderItem = ({item}) => {
    return (
      <View>
        <FavouriteListCard
          itemData={item}
          // onPress={()=> navigation.navigate('CardListScreen', {itemData: item})}
          onPress={() =>
            navigation.navigate('RestaurantDetailScreen', {restaurant_id: item.restaurant_id})

            
          }
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {!loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : favouriteList ? (
        <FlatList
          data={favouriteList ? favouriteList.data : []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <OnErrorText title='No data found'/>
        </View>
      )}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  card: {
    height: 120,

    flexDirection: 'row',

    backgroundColor: '#F9F9F9',

    borderRadius: 10,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImgWrapper: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  cardImg: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    // backgroundColor:"green"
  },
  cardInfo: {
    flex: 1,
    paddingLeft: 10,
    borderColor: '#ccc',

    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#F9F9F9',
    height: 100,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    color: '#2F2519',
    fontSize: 16,
  },
  cardDetails: {
    fontSize: 20,
    color: '#9c3825',
    // fontFamily:FontFamily.ExpoArabicSemiBold,
    fontWeight: 'bold',
    marginTop: 5,
  },
  signIn: {
    width: 120,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },

  textSign: {
    fontSize: 10,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
