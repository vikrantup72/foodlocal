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

const CategoryCard = ({itemData, onPress}) => {
  // console.log('itemData.image',itemData.image)
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.itemView}>
              <ImageBackground
                source={{
                  uri: `${BASE_URL}${itemData.image}`,
                }}

                // source={itemData.fakeImage}
                
                style={{width: '100%', height: '100%'}}
                imageStyle={{borderRadius: 15}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    fontFamily: FontFamily.ExpoArabicSemiBold,
                    alignSelf: 'flex-end',
                    paddingTop: 85,
                    paddingHorizontal: 23,
                  }}>
                  {itemData.name}
                  {/* {itemData.title} */}
                </Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  itemTitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#9c3825',
  },
  itemContainer: {
    height: 150,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: .1,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: {width: 1, height: 13},
    marginTop: 5,
  },
  itemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,

    width: '100%',
  },
});
