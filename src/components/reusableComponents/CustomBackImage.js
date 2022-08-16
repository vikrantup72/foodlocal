import {View, Text, Image} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const CustomBackImage = props => {
  const {t, i18n} = useTranslation();

  return (
    <View>
      <Image
        source={
          props?.color === 'red'
            ? require('../../assets/icons/back-red.png')
            : require('../../assets/icons/back-white.png')
        }
        style={{
          height: 20,
          width: 20,
          marginLeft: 10,
          transform: [{rotateY: i18n.language === 'en' ? '0deg' : '180deg'}],
        }}
      />
    </View>
  );
};

export default CustomBackImage;
