
import React, { useRef, useState } from 'react';
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
    FlatList
} from 'react-native';


import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../components/reusableComponents/Constants';
import {useTranslation} from 'react-i18next';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;




const TrackingScreen = ({ route, navigation, item }) => {
    const orderDetailData = route.params.orderDetailData
    const {t, i18n} = useTranslation();

    console.log('orderDetailData',orderDetailData)
    const initialRegion ={ 
        latitude: 28.5355,
        longitude: 77.3910,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

   
    //   const itemData = route.params.itemData;
    const navTitleView = useRef(null);
    //   const [homeData, setHomeData] = useState(null)
    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="light-content" /> */}

            <View style={{height:200,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <Text style={{color:'#9c3825',fontFamily:FontFamily.ExpoArabicSemiBold,fontSize:20}}>Order is on the wayd</Text>
                <Text style={{color:'#9c3825',fontFamily:FontFamily.ExpoArabicMedium,fontSize:10}}>Arriving in 20 minuts</Text>

            </View>
            <View style={{ flex: 7,}}>

            <MapView 
        style={{ flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
    
      />

            </View>

          
          
            {/* <View style={{ flex: 5, backgroundColor: "#fff", alignItems: "center", marginTop:30}}>
                <View style={{
                    
                    marginHorizontal:15,
                    backgroundColor: "#fff",
                    
                    shadowColor: '#999',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    flexDirection:"row",
                    borderRadius:10

                }}>
                    <View style={{  backgroundColor: "transparent", justifyContent:"space-around",paddingLeft:5,}}>
                  <View style={{flexDirection:"row",marginVertical:15}}>
                  <Image source={require('../assets/icons/track.jpg')} style={{width:30,height:170,alignSelf:"center"}}/>
                            <View style={{marginLeft:10,backgroundColor:"transparent",justifyContent:"space-between"}}>
                                <Text style={{fontSize:12,color:"#972C26",fontFamily:FontFamily.ExpoArabicMedium,}}>Picked up</Text>
                                <Text style={{fontSize:12,color:"#972C26",fontFamily:FontFamily.ExpoArabicMedium,}}>Out of Delivery</Text>
                                <Text style={{fontSize:12,color:"#972C26",fontFamily:FontFamily.ExpoArabicMedium,}}>Dilivered</Text>
                                </View>

                     </View>     
                        
                    </View>
                       
                        <View style={{backgroundColor:"transparent",flex: 1, borderRadius: 5, alignItems: "flex-end",  justifyContent: "space-between" }}>
                            <View style={{flex:1,paddingRight:40,alignItems:"center",backgroundColor:"transparent",justifyContent:"center"}}>
<Image source={require('../assets/avtar.png')} style={{height:70,width:70,marginVertical:5}}/>
<Text style={styles.allText}>Martin Gameti</Text>
<Text style={styles.allText}>+91 1223456789</Text>


<View style={{shadowColor: '#999',paddingHorizontal:10,
paddingVertical:10,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 1,
                    
                    elevation: 6,marginVertical:10,borderRadius:50,backgroundColor:"white"}}>
<TouchableOpacity >

<Image source={require('../assets/icons/call-red.png')} style={{height:25,width:25,alignSelf:"center"}}/>

</TouchableOpacity>
</View>


                            </View>
                        </View> 
                   


                </View>
            </View>

           
           
           
           
            <View style={{flex:1,backgroundColor:"transparent",alignItems:"center",}}>
          

            </View> */}


                    <View style={{height:150,justifyContent:'center',paddingHorizontal:40}}>
                    <TouchableOpacity
                                                
                                                onPress={() => navigation.navigate('Home')}
                                        >
                                            <LinearGradient
                                                colors={['#4C1613', '#FF0E00']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.signIn}
                                            >
                                                <Text style={[styles.textSign, {
                                                    color: '#fff'
                                                }]}>{t('Home')}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                    </View>
                   










        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    
    signIn: {
       
        paddingHorizontal:120,
        alignItems: 'center',
        borderRadius: 6,
        paddingVertical:3,
        
    },
    textSign:{
        fontSize:20
    }
    ,
    allText:{
        fontSize:12,color:"#972C26",fontFamily:FontFamily.ExpoArabicMedium,
    }
});