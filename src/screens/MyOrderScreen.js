import React, {useRef,useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';


import MyOrderListCard from '../components/Cards/MyOrderListCard';
import {FontFamily} from '../components/reusableComponents/Constants';
import { orderList } from '../services/apis/api';
import {TokenContext} from '../components/context';
import {useTranslation} from 'react-i18next';
import OnErrorText from '../components/reusableComponents/OnErrorText';

const MyOrderScreen = ({itemData, onPress,navigation}) => {
  const {t, i18n} = useTranslation();
  const token = React.useContext(TokenContext);

  const [orderListData, setOrderListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const orderListApi =()=>{
    setLoading(true)
    orderList(token.token.userToken,i18n.language === 'en' ? 'en' : 'ar').then((response)=>{
      // console.log('orderListApi.data', response.data);
      response.data.status===1?setOrderListData(response?.data):setOrderListData(null)
      setLoading(false)

    })
    .catch((error)=>{
      console.log('orderListApi error', error);
      
      setLoading(false)

    })
  
  }

  React.useEffect(() => {

    orderListApi()
    // netInfo()
  
  }, []);


  const renderItem = ({ item ,}) => {
    return (<View >

      <MyOrderListCard
        itemData={item}
        // onPress={()=> navigation.navigate('CardListScreen', {itemData: item})}
        onPress={() => navigation.navigate('MyOrderDetailScreen', { itemData: item })}
        navigation={navigation}
      />

    </View>

    );
  };
  return (
    <View style={{flex:1,}}>


       {loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : orderListData ? (
      
<FlatList 
            data={orderListData?orderListData.data:[]}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      ) : (
        <View style={{justifyContent:'center',flex:1}}>
                  <OnErrorText title={(t('NoOrderfound'))}/>

          </View>

      )}
  
      </View>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  card: {
    
    height: 120,
   
    
    flexDirection: 'row',
    
     backgroundColor:"#F9F9F9",
    
    borderRadius: 10,paddingRight:5,alignItems:"center",justifyContent:"center"
    
  },
  cardImgWrapper: {
    
    height:100,
    width:100,
    backgroundColor:"transparent",justifyContent:"center"
  },
  cardImg: {
    height: 90,
    width:90,
    alignSelf: 'center',
    borderRadius: 8,
    alignSelf:"center"
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
    height:100,justifyContent:"center"
  },
  cardTitle: {
    fontFamily:FontFamily.ExpoArabicSemiBold,
    color:"#2F2519",
    fontSize:16,
  },
  cardDetails: {
    fontSize: 20,
    color: '#9c3825',
    // fontFamily:FontFamily.ExpoArabicSemiBold,
    fontWeight:"bold",
    marginTop:5
    
  },
  signIn: {
    width: 120,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    
},

    textSign:{
        fontSize:10,
        fontFamily:FontFamily.ExpoArabicMedium
    }
});
