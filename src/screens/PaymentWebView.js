import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
 Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { TokenContext } from '../components/context';
import { getCart, placeOrder } from '../services/apis/api';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';



export default function PaymentWebView({route,navigation}) {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();

  const uri = route?.params?.url

  const placeOrderResponse = route?.params?.placeOrderResponse
  const [orderNowLoader,setOrderNowLoader] = useState(false)


 

         
      
  // console.warn(uri)
  const placeOrderApi = ()=>{
    setOrderNowLoader(true)
    placeOrder(token.token.userToken,token.token.restaurentId,token.token.promoAppliedData===null?'':token.token.promoAppliedData.data.id, 'COD',token.token.paymentInstruction,token.token.addressId)
    .then( async function(response) {
    console.log('response.placeOrder',response.data)
    console.log('token.token.deviceId',token.token.deviceId)
    {response.data.status===1? 
      token.dispatch({
      type: 'SET_PROMO_DATA',
      promoAppliedData: null,
    })
    :null}
    {response.data.status===1? 
      navigation.navigate('PaymentDoneScreen',{orderSuccessData:response.data.data})

    :null}

    if(response.data.status===1){
      token.dispatch({
        type: 'CART_SET',
        cartData: null,
      });
      token.dispatch({
        type: 'RESTAURENT_ID_SET',
        restaurentId: null,
      });
      await AsyncStorage.setItem('restaurentId', '');
    
    }

     
    setOrderNowLoader(false)
    })
    .catch(function(error) {
      console.log('placeOrder',error);
      setOrderNowLoader(false)

      // setLoader(true);
      // setQuantityLoading(false);
  
    });
  }

  return <WebView
  //ref={(ref) => { this.webview = ref; }}
  source={{ uri }}
  onNavigationStateChange={(event) => {
    // if (event.url !== uri) {
    //   Linking.openURL(event.url);
    // }
    console.log('event',event)
    if(event.canGoBack){
      // placeOrderApi()
      navigation.navigate('PaymentDoneScreen',{orderSuccessData:placeOrderResponse})

    }
  }}
/>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'transparent',
    alignItems: 'center',
  },

});
