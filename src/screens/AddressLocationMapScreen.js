import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {View, Image, Text,StyleSheet, Dimensions} from 'react-native';
import Geocoder from 'react-native-geocoder';
import MapView from 'react-native-maps';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import CustomButton from '../components/reusableComponents/CustomButton';
import {t} from 'i18next';
import { TokenContext } from '../components/context';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const AddressLocationMapScreen = ({navigation}) => {
  const token = React.useContext(TokenContext);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
    const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: token?.token?.location?.position?.lat,
    longitude: token?.token?.location?.position?.lng
  });
  //   latitude: 28.5355,
  //longitude: 77.391,
  console.log('token?.token?.location?.position?.lat',token?.token?.location?.position?.lat)
  console.log('token?.token?.location?.position?.lng',token?.token?.location?.position?.lng)


  const [address, setAddress] = useState('');
  const [subLocality, setSubLocality] = useState(token?.token?.location?.position?.subLocality);
  const [loading, setLoading] = useState(false);


  
  const mapRef = useRef(null);

  const onChangeValue = region => {
    setRegion(region);
    getAddress(region);
  };

  const getAddress = region => {
    var NY = {
      lat: region.latitude,
      lng: region.longitude,
    };
    Geocoder.geocodePosition(NY)
      .then(res => {
        console.log(res)
        setAddress(res?.[0]?.formattedAddress);
        setSubLocality(res?.[0]?.subLocality)
      })
      .catch(err => {
        console.log('SET_Locationerr', err);
      });
  };

  useEffect(() => {
    handleUserLocation();
  }, []);
  const handleUserLocation = () => {};
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MapView
        style={{flex: 1, justifyContent: 'center',alignItems:'center'}}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
        ref={mapRef}>
       
      </MapView>

      <View style={{height: 220,paddingHorizontal:20,paddingVertical:20}}>
        <Text
          style={{
            color: Colors.primary,
            fontFamily: FontFamily.ExpoArabicBold,
          }}>
          {t('selectDeliveryLocation')}
        </Text>
        <View style={{flexDirection: 'row',alignItems:'center',marginTop:10}}>
          <Image
            style={{height: 22, width: 22}}
            source={require('../assets/icons/location.png')}
          />
          <Text style={{color: Colors.primary,fontFamily:FontFamily.ExpoArabicBold,fontSize:20,marginTop:4,marginLeft:5}}>{subLocality}</Text>
        </View>
        <Text style={{color: Colors.primary,fontFamily:FontFamily.ExpoArabicMedium,marginTop:2,marginLeft:5,fontSize:14}}>{address}</Text>

        <View style={styles.buttonContainer}>
              <CustomButton
                title={t('ConfirmLocation')}
                navigation={navigation}
                onPress={() => navigation.replace('AddNewAddressScreen',{subLocality:subLocality,address:address})}
                loading={loading}
              />
            </View>
      </View>
      <View
          style={{
            alignSelf: 'center',position:'absolute',top:(windowHeight-300)/2
          }}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../assets/icons/location.png')}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
  },
})

export default AddressLocationMapScreen;
