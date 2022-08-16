import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import RestaurantListCard from '../components/Cards/RestaurantListCard';
import {restaurentSearch} from '../services/apis/api';
import {TokenContext} from '../components/context';
import {restaurantsList} from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import OnErrorText from '../components/reusableComponents/OnErrorText';
import {useIsFocused} from '@react-navigation/core';
import ItemListCard from '../components/Cards/ItemListCard';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';

const SearchResult = ({navigation, route}) => {
  const {t, i18n} = useTranslation();

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const token = React.useContext(TokenContext);
  const [search, setSearch] = useState('');

  const [restaurantList, setRestaurantList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const categoryName = route?.params?.categoryName;

  const SearchApi = val => {
    setLoading(true);

    restaurentSearch(
      token.token.userToken,
      i18n.language === 'en' ? 'en' : 'ar',
      val,
    )
      .then(response => {
        // console.log('sea', JSON.stringify(response?.data));
        console.log('response', response?.data?.status);

        if (response?.data?.status === 1) {
          setRestaurantList(response?.data?.data?.restaurant);
          setMenuList(response?.data?.data?.menus);
        }

        setLoading(false);
      })
      .catch(error => {
        console.log('serrorea', error);
        setRestaurantList([]);
        setMenuList([]);
        setLoading(false);
      });
  };

  const onChangeText = val => {
    if (val?.length) {
      SearchApi(val);
      setSearch(val);
    } else {
      setSearch('');
      setRestaurantList([]);
      setMenuList([]);
    }
  };

  let errorName = `No ${categoryName} found nearby`;

  const restaurantRenderItem = ({item}) => {
    return (
      <RestaurantListCard
        itemData={item}
        restaurantListApiFun={() => {}}
        onPress={() =>
          navigation.navigate('RestaurantDetailScreen', {
            restaurant_id: item.id,
          })
        }
        fromSearch={true}
      />
    );
  };

  const menuRenderItem = ({item, index}) => {
    return (
      <View>
        <ItemListCard
          itemData={item}
          navigation={navigation}
          menuListApiFun={() => {}}
          fromSearch={true}
          // restaurantDetail={item.restaurant}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              itemData: item,
              restaurantDetail: item.restaurant,
            })
          }
        />
      </View>
    );
  };

  const renderTitle = title => {
    return (
      <View
        style={{
          backgroundColor: Colors.lightShadeGray,
          alignItems: 'center',
          // marginHorizontal: 10,
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
          {title}
        </Text>
      </View>
    );
  };
  const renderRestaurantData = () => {
    return (
      <View>
        {restaurantList?.length ? renderTitle('Restaurants') : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurantList}
          renderItem={restaurantRenderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  const renderMenuData = () => {
    return (
      <View>
        {menuList?.length ? renderTitle('Menus') : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={menuList}
          renderItem={menuRenderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={val => onChangeText(val)}
        value={search}
        placeholder="Search"
        placeholderTextColor={Colors.gray}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : restaurantList?.length || menuList?.length ? (
        <View style={{flex: 1, paddingBottom: 10}}>
          {renderRestaurantData()}

          {renderMenuData()}
        </View>
      ) : (
        <View style={{marginTop: 100}}>
          <OnErrorText title={'No data found'} />
        </View>
      )}
    </ScrollView>
  );
};

export default memo(SearchResult);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.lightPrimary,
    borderRadius: 10,
  },
});
