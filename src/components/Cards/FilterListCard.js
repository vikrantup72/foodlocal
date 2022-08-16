import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { BASE_URL } from '../../services/apis/api';
import {FontFamily} from '../reusableComponents/Constants';

const FilterListCard = ({itemData, onPress}) => {
  console.log(itemData)
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemView}>
          <ImageBackground
            source={{
              uri: `${BASE_URL}${itemData.image}`,
            }}
            style={{width: '100%', height: '100%'}}
            imageStyle={{borderRadius: 5}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={styles.itemTitle}>{itemData?.name}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'green',
  },

  itemTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  itemContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 1.5,
    // elevation: 8,
    // shadowRadius: 20,
    // shadowOffset: { width: 1, height: 13 },
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },
  itemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',

    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
