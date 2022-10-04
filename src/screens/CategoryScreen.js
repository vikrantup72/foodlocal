import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';
import CategoryCard from '../components/Cards/CategoryCard';

import {useTranslation} from 'react-i18next';

import {TokenContext} from '../components/context';
import {FontFamily} from '../components/reusableComponents/Constants';
import {fetchCategory, promoList} from '../services/apis/api';
import ImageCarousel from '../components/carousel/ImageCarousel';

export default function CategoryScreen(props) {
  // console.log('propssss',props)
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);

  const [data, setData] = useState([]);
  const [promoListData, setPromoListData] = useState([]);
  const [promoLoading, setPromoLoading] = useState(false);

  const [loading, setLoading] = useState(false);

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
  const fetchCategoryApi = () => {
    fetchCategory(i18n.language === 'en' ? 'en' : 'ar')
      .then(response => {
        console.log(response.data.data)
        setData(response.data.data);
        setLoading(true);
      })
      .catch(error => {
        console.log('fetchCategoryApierrors', error);
        setLoading(true);
      });
  };
  React.useEffect(() => {
    fetchCategoryApi();
    promoListApi();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{backgroundColor: 'transparent', marginBottom: 20}}>
        <CategoryCard
          itemData={item}
          // onPress={()=> navigation.navigate('CardListScreen', {itemData: item})}
          onPress={() => {
            props.navigation.replace('Home', {itemData: item});
            token.dispatch({
              type: 'CATEGORY_ID_SET',
              categoryId: item.id,
            });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            backgroundColor: 'transparent',
            // flex: 1,
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontFamily: FontFamily.ExpoArabicBold,
              fontSize: 11,
              color: '#231F20',
            }}>
            {t('DeliveryAddress')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/locationArea.png')}
              style={{height: 13, width: 13, marginBottom: 2}}
            />
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicBook,
                fontSize: 11,
                color: '#696969',
              }}>
              {token?.token?.location?.formattedAddress}
            </Text>
          </View>
        </View>

        <View style={styles.imageSliderView}>
          {/* <ImageSlider navigation={props.navigation} /> */}
          <ImageCarousel promoListData={promoListData} />
        </View>
      </View>
      <View style={styles.footer}>
       

        <Text
          style={{
            fontSize: 30,
            color: '#972C26',
            fontFamily: FontFamily.ExpoArabicSemiBold,
            marginBottom: 10,
            marginTop: 10,
          }}>
          {t('Home')}
        </Text>
      

        {!loading ? (
          <ActivityIndicator size="large" color="#972C26" />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: 50,
                  marginTop: 0,
                  backgroundColor: 'pink',
                }}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  header: {
    flex: 1,

    color: '#646464',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 20,

    justifyContent: 'space-around',
  },
  imageSliderView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    flex: 4,

    color: '#646464',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 15,
  },
 
});
