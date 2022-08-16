import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FontFamily} from '../../components/reusableComponents/Constants';

export default function ChooseButtonCard({
  selector,
  item,
  onSelect,
  onSelectIndex,
  index,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(item.id);
        onSelectIndex(index);
      }}>
      <View
        style={{
          borderRadius: 7,

          paddingHorizontal: 20,
          paddingVertical: 3,
          backgroundColor: selector ? Colors.primary : Colors.white,
          marginHorizontal: 10,
          borderWidth: 1,

          fontFamily: FontFamily.ExpoArabicSemiBold,
          borderColor: selector ? Colors.white : Colors.primary,
        }}>
        <Text
          style={{
            color: selector ? Colors.white : Colors.primary,
            fontFamily: FontFamily.ExpoArabicMedium,
            fontSize: 15,
          }}>
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },

  signIn: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  deleteIconAndEditiconStyle: {
    borderRadius: 3,
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  deleteIconAndEditView: {
    height: 30,
    width: 30,
    backgroundColor: '#972C26',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
