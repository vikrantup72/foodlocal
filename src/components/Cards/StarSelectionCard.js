
import React, { Component,useState } from "react";
import { View, FlatList, StyleSheet, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground,ActivityIndicator } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next'
import {FontFamily} from '../reusableComponents/Constants';
import { deleteAddress } from "../../services/apis/api";
import { TokenContext } from "../context";



export default function StarSelectionCard({ navigation,selector,item,onSelect,onSelectIndex,index,addressListApi,manageAddress }) {
    const { t, i18n } = useTranslation();
    const [deleteAddressLoader,setDeleteAddressLoader] = useState(false)

    const [orderNowLoader,setOrderNowLoader] = useState(false)
    const token = React.useContext(TokenContext);

    const deleteAddressApi = ()=>{
        setDeleteAddressLoader(true)
        deleteAddress(token.token.userToken,item.id)
        .then(function(response) {
        
        setDeleteAddressLoader(false)  
        addressListApi()       
        })
        .catch(function(error) {
          setDeleteAddressLoader(false)
    
          // setLoader(true);
          // setQuantityLoading(false);
      
        }).finally(()=>
        setDeleteAddressLoader(false)

        )
      }

      const editAddressApi = ()=>{
        setEditAddressLoader(true)
        editEdd(token.token.userToken,item.id)
        .then(function(response) {
        
        setEditAddressLoader(false)  
        alert(response.data.message) 
        addressListApi()       
        })
        .catch(function(error) {
          alert('Error')
          setEditAddressLoader(false)
    
          // setLoader(true);
          // setQuantityLoading(false);
      
        }).finally(()=>
        setEditAddressLoader(false)

        )
      }
    return (

        <View style={{flex:1, 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:2,
        }}>

                {/* <TouchableOpacity style={{
                     flex:8,
                    
                    shadowOpacity: .1,
                    elevation: 8,
                    shadowRadius: 5,
                    shadowOffset: { width: 1, height: 1 }, 
                    backgroundColor: "white", 
                    borderRadius: 15,  
                    width: '100%',alignSelf:'center',
                    paddingBottom:20,
                    paddingTop:5,marginBottom:15,marginTop:10
                }} onPress={()=>{
                    onSelect(item.id);
                onSelectIndex(index);
                }}>

          

                <View style={{flexDirection:"row",alignItems:'center',paddingHorizontal:15}}>
               
                <View style={{flex:1}}>
                <Text style={{fontSize: 20,
                                fontFamily: FontFamily.ExpoArabicSemiBold,

                                color: "#9c3825",
                                }}>
                    {item.address_type}
                </Text>
                </View>

               {manageAddress?null: <View style={{flex:1,alignItems:'flex-end'}}>
              {selector?  <Image source={require('../../assets/icons/radio1.png')} style={{ height: 20, width: 20,}} />
               : <Image source={require('../../assets/icons/radio2.png')} style={{ height: 20, width: 20,}} />}

                </View>}
                </View>

                <View>
                        <Text style={{
                    fontSize: 17,
                    fontFamily:FontFamily.ExpoArabicBook,
                    
                    color: "#7D7D7D",
                    justifyContent: 'center',
                       marginHorizontal:15
                }}>{item.address} {item.city} {item.state} -{item.zipcode}</Text>
 
                  </View>

            </TouchableOpacity>
                       {manageAddress?
                                        <View style={{flex:1,alignItems:'center',height:'100%',justifyContent:'space-evenly',marginLeft:5}}>
                                        <TouchableOpacity style={styles.deleteIconAndEditView} 
                                        onPress={()=>deleteAddressApi()}>
                                                    <Image style={styles.deleteIconAndEditiconStyle}
                                                        source={require('../../assets/icons/delete.png')} />
                                            </TouchableOpacity>

                                          
                    </View>:null} */}

<TouchableOpacity>
              <View style={[styles.ratingNumberContainer2,{opacity:selector?.5:1}]}>
               
                <Image
                  source={require('../../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../../assets/icons/star-red.png')}
                  style={styles.star}
                />
                <Image
                  source={require('../../assets/icons/star-red.png')}
                  style={styles.star}
                />
              </View>
            </TouchableOpacity>
                    
            </View>








    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,

    //     backgroundColor: "#fff"


    // },



    // signIn: {
    //     width: 300,
    //     height: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 5,

    // },
    // textSign: {
    //     fontSize: 18,
    //     fontFamily: FontFamily.ExpoArabicMedium
    // },
    // deleteIconAndEditiconStyle:{
    //     borderRadius: 3, height: 20, width: 20,  marginLeft: 4
    // },
    // deleteIconAndEditView:{
    //     height: 30, width: 30, backgroundColor: "#972C26", borderRadius: 5, justifyContent: "center",alignItems:'center' 

    // }

    ratingNumberContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#9c3825',
        borderWidth: 0.5,paddingVertical:5,paddingHorizontal:10
      },
      star: {height: 10, width: 10, },
});