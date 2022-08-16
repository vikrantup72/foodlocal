import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import Modal from 'react-native-modal';
import {FontFamily} from '../../../components/reusableComponents/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../../../services/apis/api';

export default class SliderEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState(!this.isModalVisible);
  };

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {image},
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: `${BASE_URL}${image}`}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{uri: image}} style={styles.image} />
    );
  }

  render() {
    const {
      data: {code, subtitle, description, discount, expiry_date, title},
      even,
    } = this.props;

    const uppercaseTitle = code ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {code.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => this.setState({isModalVisible: true})}>
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            margin: 0,
          }}
          useNativeDriver={true}
          animationIn="fadeIn"
          animationOut="fadeOut">
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                height: 450,
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  source={require('../../../assets/icons/specialOffer.png')}
                  style={{height: 60, width: 130}}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  backgroundColor: 'transparent',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.ExpoArabicSemiBold,
                    fontSize: 20,marginVertical:5
                  }}>
                  {title}
                </Text>
                <ScrollView style={{height: 50, marginVertical: 10}}>
                  <View>
                    <Text
                      style={{
                        fontFamily: FontFamily.ExpoArabicBook,
                        fontSize: 15,
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                      }}>
                      {description}
                    </Text>
                  </View>
                </ScrollView>
              </View>
              <View
                style={{flex: 1, backgroundColor: 'transparent', width: '80%'}}>
                <ImageBackground
                  source={require('../../../assets/icons/discountCoupon.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                  }}
                  imageStyle={{height: '100%', width: '100%'}}>
                  <View
                    style={{
                      flex: 2,
                      backgroundColor: 'transparent',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: FontFamily.ExpoArabicBook,
                        fontSize: 25,
                      }}>
                      {code}
                    </Text>
                  </View>

                  <View style={{flex: 1, backgroundColor: 'transparent'}}>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../assets/icons/clipboard.png')}
                        style={{
                          height: 25,
                          width: 25,
                          marginLeft: 10,
                          marginBottom: 3,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>

              <View
                style={{
                  flex: 2,
                  backgroundColor: 'transparent',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({isModalVisible: false})}>
                  <LinearGradient
                    colors={['#FF0E00', '#4C1613']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{
                      width: 100,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: FontFamily.ExpoArabicSemiBold,
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}
