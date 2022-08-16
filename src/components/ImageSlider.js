import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity } from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../components/reusableComponents/Constants';
import { promoList } from "../services/apis/api";
import {TokenContext} from '../components/context';
import {useTranslation} from 'react-i18next';

const ImageSlider = ({ navigation }) => {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();
  const [promoListData, setPromoListData] = useState([]);

  const promoListApi =()=>{
    promoList(i18n.language === 'en' ? 'en' : 'ar').then((response)=>{
      setPromoListData(response.data);
    })
    .catch((error)=>{
      console.log('promoListApi error', error);
  
    })
  
  }


  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
  const [images, setImages] = useState({
    image: [
      // "https://source.unsplash.com/1024x768/?nature",
      // "https://source.unsplash.com/1024x768/?water",
      // "https://source.unsplash.com/1024x768/?girl",
      // "https://source.unsplash.com/1024x768/?tree",
      require('../assets/coupons/coupon1.png'),
      require('../assets/coupons/coupon1.png'),
      require('../assets/coupons/coupon1.png'),

    ]
  })



  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (

    <View style={styles.container}>
      <SliderBox
        //   ImageComponent={FastImage}
        images={images.image}
        sliderBoxHeight={200}
        // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        onCurrentImagePressed={index => { toggleModal() }}
        dotColor="#9c3825"
        inactiveDotColor="#90A4AE"
        // paginationBoxVerticalPadding={10}
        autoplay
        circleLoop
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: "absolute",
          bottom: -25,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          // paddingVertical: 10,
          backgroundColor: "transparent"
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)"
        }}
        ImageComponentStyle={{ borderRadius: 10, width: '90%', height: '100%' }}
        imageLoadingColor="#2196F3"
      />

      <Modal isVisible={isModalVisible}
        style={{ width: '100%', backgroundColor: "transparent", alignSelf: "center", margin: 0 }}
        useNativeDriver={true}
        animationType="slide"
        animationIn="fadeIn"
        animationOut="fadeOut"
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
      >
        <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: "flex-end", }}>
          <View style={{ backgroundColor: "#fff", justifyContent: "space-around", height: 450, alignItems: "center", borderRadius: 5 }}>

            <View style={{ flex: 1, backgroundColor: "transparent", width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
              <Image source={require('../assets/icons/specialOffer.png')} style={{ height: 60, width: 130 }} />
            </View>
            <View style={{ flex: 2, backgroundColor: "transparent", width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontFamily: FontFamily.ExpoArabicSemiBold, fontSize: 30 }}>Redeem 50 {t('SAR')}</Text>
              <Text style={{ fontFamily: FontFamily.ExpoArabicBook, fontSize: 15, backgroundColor: "transparent", height: 50, textAlign: "center" }} numberOfLines={3}>Best Deals For You - Upto 80% OFF on Food ...     USE NOW</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "transparent", width: "80%", }}>
              <ImageBackground source={require('../assets/icons/discountCoupon.png')} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: "transparent" }} imageStyle={{ height: "100%", width: "100%" }}>
                <View style={{ flex: 2, backgroundColor: "transparent", alignItems: "flex-end", justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontFamily: FontFamily.ExpoArabicBook, fontSize: 25 }}>DCWW256</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: "transparent" }}>
                  <TouchableOpacity>
                    <Image source={require('../assets/icons/clipboard.png')} style={{ height: 25, width: 25, marginLeft: 10, marginBottom: 3 }} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            <View style={{ flex: 2, backgroundColor: "transparent", width: "100%", alignItems: "center", justifyContent: "center" }}>



              <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>



                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 100,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontFamily: FontFamily.ExpoArabicSemiBold, color: "#fff"
                  }}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", borderRadius: 100, justifyContent: "center", alignSelf: "center"
  }
});
export default ImageSlider;