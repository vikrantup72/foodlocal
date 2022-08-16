import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../components/reusableComponents/Constants';
import {useTranslation} from 'react-i18next';

export default function PaymentDoneScreen({navigation, route}) {
  const {t, i18n} = useTranslation();
  const orderSuccessData = route?.params?.orderSuccessData;
  console.log('orderSuccessData', orderSuccessData);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../assets/orderDetailBackground.png')} />
      </View>
      <View
        style={{flex: 1, backgroundColor: 'transparent', alignItems: 'center'}}>
        <Text
          style={{
            color: '#339710',
            fontSize: 18,
            fontFamily: FontFamily.ExpoArabicMedium,
          }}>
          {' '}
          {t('OrderCompletedSuccessfully')}
        </Text>
        <Text
          style={{
            color: '#339710',
            fontSize: 18,
            fontFamily: FontFamily.ExpoArabicMedium,
            marginBottom: 30,marginTop:5
          }}>
          {' '}
          {orderSuccessData?.order_no}
        </Text>
        {/* order_no */}

        <TouchableOpacity
          style={[
            styles.signIn,
            {
              borderColor: '#9c3825',

              marginTop: 20,
            },
          ]}
          onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            colors={['#4C1613', '#FF0E00']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Home
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
            // onPress={() => navigation.navigate('TrackingScreen',{orderDetailData:orderDetailData.data})}
            // onPress={() => navigation.navigate('Home')}
            onPress={() => navigation.navigate('MyOrderDetailScreen', { itemData: orderSuccessData })}

            style={[styles.signIn, {
                borderColor: '#9c3825',

                marginTop: 20
            }]}
            >
            <LinearGradient
              colors={['#4C1613', '#FF0E00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.ExpoArabicSemiBold,
                  color: '#fff',
                }}>
                {t('TrackOrder')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  signIn: {
    width: '88%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
