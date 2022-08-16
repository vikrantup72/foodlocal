import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {FontFamily} from '../reusableComponents/Constants';
import { useTranslation } from 'react-i18next'

const BillCard = props => {
  const {t, i18n} = useTranslation();
  console.log('props',props)


  return (
    <View
      style={{
        width: '90%',
        // height: 170,
        backgroundColor: '#D8D8D8',
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        paddingVertical: 15,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
        }}>
        <View style={styles.billContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View style={styles.billTextView}>
              <Text numberOfLines={1} style={styles.priceText}>
                {t('Total')}
                <Text numberOfLines={1} style={{fontSize: 8}}>
                  {'('}
                  {t('WithoutTax')}
                  {')'}
                </Text>
              </Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {parseFloat(props?.amount_without_tax)} {t('SAR')}
              </Text>
            </View>

            <View style={styles.billTextView}>
              <Text numberOfLines={1} style={styles.priceText}>
                {t('Delivery')}
              </Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {parseFloat(props?.delivery_charge).toFixed(2)} {t('SAR')}
              </Text>
            </View>
            <View style={styles.billTextView}>
              <Text numberOfLines={1} style={styles.priceText}>
                {t('VAT')}
              </Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {parseFloat(props?.igst).toFixed(2)} {t('SAR')}
              </Text>
            </View>
            <View style={styles.billTextView}>
              <Text numberOfLines={1} style={styles.priceText}>
                {t('Discount')}
              </Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {parseFloat(props?.discount).toFixed(2)} {t('SAR')}
              </Text>
            </View>

            <View style={styles.billTextView}>
              <Text
                numberOfLines={1}
                style={[styles.priceText, {color: '#000'}]}>
                {t('NetTotal')}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.priceText, {color: '#000'}]}>
                {parseFloat(props?.cart_total).toFixed(2)} {t('SAR')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  priceText: {
    color: '#818181',
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 16,
    maxWidth: 200,
  },
  billContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  billTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
