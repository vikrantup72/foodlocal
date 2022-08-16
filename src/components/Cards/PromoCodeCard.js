import React from 'react'
import { View,TouchableWithoutFeedback,Image,StyleSheet } from 'react-native';
import { BASE_URL } from '../../services/apis/api';



const PromoCodeCard = ({title, image}) => {
    return (
    
    <TouchableWithoutFeedback>
      <View style={styles.itemPromoCodes}>
        <Image
          style={{
            height: 90,
            width: 90,
            borderRadius: 3,
            alignSelf: 'center',
          }}
          source={{uri:`${BASE_URL}${image}`}}
        />
      </View>
     
    </TouchableWithoutFeedback>
  )}

  
  export default PromoCodeCard;
  
  const styles = StyleSheet.create({
   
    itemPromoCodes: {
      height: 90,
      width: 70,
  
      marginLeft: 30,
      alignItems: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
  });