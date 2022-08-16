import React from 'react';
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { BASE_URL } from '../../services/apis/api';
import {FontFamily} from '../reusableComponents/Constants';


const TopRestaurantCard = ({itemData, onPress}) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.item}>
        <View style={{}}>
          <Image
            style={{
              height: 70,
              width: 70,
              borderRadius: 8,
              alignSelf: 'center',
            }}
            source={{uri: `${BASE_URL}${itemData.image}`}}
          />
        </View>
        <Text style={styles.title}>{itemData.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopRestaurantCard;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems:"center",justifyContent:"center"
  },
  cardImgWrapper: {
    flex: 1,width:50,height:50
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 1,
    
    borderColor: '#ccc',
    
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  item: {
    
    
    
    width:95,
    
    backgroundColor:"transparent",
    marginHorizontal: 0,alignItems:"center",
  },
  title: {
    fontSize: 13,
    textAlign:"center",
    color:"#972C26",
    marginTop:5,
    fontFamily:FontFamily.ExpoArabicBook,
    lineHeight:17
  },
});
