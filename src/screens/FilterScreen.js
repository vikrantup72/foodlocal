import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {data} from '../model/dataFIlter';
import FilterListCard from '../components/Cards/FilterListCard';
import {FontFamily} from '../components/reusableComponents/Constants';
import { fetchCategory, filterRestaurant } from '../services/apis/api';
import { useTranslation } from 'react-i18next';
import CategorySelector from '../components/CategorySelector';
import StarSelector from '../components/StarSelector';

const FilterScreen = ({itemData, onPress, navigation}) => {
  const {i18n, t} = useTranslation();
  const [data, setData] = useState([]);
  const [applyLoader, setApplyLoader] = useState(false);

  const [addressId, setAddressId] = useState(null);

  const [categoryId, setCategoryId] = useState(11);
  // console.log("categoryId",categoryId)
  // console.log("categoryId",typeof(categoryId))


  const [categorySelected, setCategorySelected] = useState([]);

  const [loading, setLoading] = useState(false);
  //console.log("categorySelected",categorySelected.toString())

  const [starSelected,setStarSelected] = useState(5)
  //console.log(starSelected)
  const fetchCategoryApi = ()=>{
    fetchCategory(i18n.language === 'en' ? 'en' : 'ar')
    .then((response)=>{
      console.log('fetchCategoryApi',response?.data?.data[0]?.id)
      response?.data?.data[0]?.id?setCategoryId(Number(response?.data?.data[0]?.id)):null

        setData(response.data);
        setLoading(true);
    })
    .catch((error)=>{
      console.log('fetchCategoryApierrors',error)
      setLoading(true);

    })
  }
  const renderItem = ({item}) => {
    return (
      <View style={{backgroundColor: 'transparent', marginBottom: 20}}>
        <FilterListCard
          itemData={item}
          // onPress={()=> navigation.navigate('CardListScreen', {itemData: item})}
          // onPress={() => navigation.replace('Home', { itemData: item })}
        />
      </View>
    );
  };

  const filterRestaurantApi = ()=>{
    setApplyLoader(true)
      filterRestaurant(categoryId.toString(),starSelected, i18n.language === 'en' ? 'en' : 'ar').then((response)=>{
        console.log("response.data.",response?.data)
        setApplyLoader(false)
        response.data.status===1?navigation.navigate('RestaurantListScreen'):null

      }).catch((error)=>{
        console.log("response.errror",error)
        setApplyLoader(false)

      })
  }

  useEffect(()=>{
    fetchCategoryApi()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Meal Type</Text>
      </View>
      {/* <View style={styles.itemContainer}>
        <View
          style={{
            backgroundColor: 'transparent',
            width: '87%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={data?.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            // onEndThreshold={2}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: 30,
                  marginTop: 0,
                  backgroundColor: 'transparent',
                }}
              />
            )}
          />
        </View>
      </View> */}
      <CategorySelector
                    addressListData={data?.data}
                    setCategoryId={setCategoryId}
                    setCategorySelected={setCategorySelected}
                    initialValue={categoryId}
                  />
      <View style={{backgroundColor: 'transparent', flex: 4, width: '100%'}}>
        <View
          style={{
            flex: 2,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '85%',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 20,
                marginLeft: 3,
              }}>
              Rating
            </Text>
          </View>

          <View
            style={{
              width: '85%',
              height: 50,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={()=>setStarSelected(1)}>
              <View style={[styles.ratingNumberContainer,{borderColor:starSelected===1?"#9c3825":"#d2d2d2"}]}>
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStarSelected(2)}>
              <View style={[styles.ratingNumberContainer,{borderColor:starSelected===2?"#9c3825":"#d2d2d2"}]}>
                {/* <Text style={styles.ratingNumber}
  >4</Text> */}
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStarSelected(3)}>
              <View style={[styles.ratingNumberContainer,{borderColor:starSelected===3?"#9c3825":"#d2d2d2"}]}>
                {/* <Text style={styles.ratingNumber}
  >5</Text> */}
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '85%',
              height: 50,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={()=>setStarSelected(4)}>
              <View style={[styles.ratingNumberContainer2,{borderColor:starSelected===4?"#9c3825":"#d2d2d2"}]}>
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setStarSelected(5)}}>
              <View style={[styles.ratingNumberContainer2,{borderColor:starSelected===5?"#9c3825":"#d2d2d2"}]}>
               
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => filterRestaurantApi()}
            style={[
              styles.signIn,
              {
                borderColor: '#9c3825',
              },
            ]}
            //  onPress={() => navigation.navigate('Payment')}
          >
            <LinearGradient
              colors={['#FF0E00', '#4C1613']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.signIn}>
              {applyLoader? <ActivityIndicator size="small" color="#fff" />:<Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Apply
              </Text>}
            </LinearGradient>
          </TouchableOpacity>

          {/* <StarSelector
                addressListData={[
                  {id: '1', name: 'One'},
                  {id: '2', name: 'Two'},
                  {id: '3', name: 'Three'},
                  {id: '4', name: 'Four'},
                  {id: '5', name: 'Five'},
                  
                ]}
                setAddressId={setAddressId}
                manageAddress={false}
              /> */}
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // flexDirection: "column",
    // alignItems: "center",
  },

  itemTitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#9c3825',
  },
  itemContainer: {
    flex: 6,
    height: 150,

    flexDirection: 'row',

    marginTop: 20,

    // shadowColor: '#000',
    // shadowOpacity: 1.5,
    // elevation: 8,
    // shadowRadius: 20,
    // shadowOffset: { width: 1, height: 13 },
    // backgroundColor:"#fff",
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemView: {
    flex: 1,

    borderRadius: 20,

    width: '100%',
    backgroundColor: 'transparent',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 5,
    marginLeft: 30,
    // paddingBottom: 30,
  },
  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 22,
  },
  signIn: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 16,
    fontFamily: FontFamily.ExpoArabicBook,
  },
  ratingNumber: {
    fontFamily: 'Poppins-SemiRegular',
    color: '#9c3825',
  },
  ratingNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 95,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#9c3825',
    borderWidth: 0.5,
  },
  ratingNumberContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  star: {height: 15, width: 15, marginHorizontal: 2},
});
