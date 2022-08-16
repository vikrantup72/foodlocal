import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from 'react-native-paper';

import {FontFamily} from '../components/reusableComponents/Constants';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <StatusBar backgroundColor='#FF6347' barStyle="light-content" /> */}

        <View style={styles.footer}>
          <View style={styles.personalDetailHead}>
            <Text style={styles.text_header}>Personal Detail</Text>
          </View>
          <View style={styles.action}>
            <Image
              style={{height: 22, width: 22}}
              source={require('../assets/icons/user-red.png')}
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <Image
              style={{height: 22, width: 22}}
              source={require('../assets/icons/user-red.png')}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <Image
              style={{height: 22, width: 22}}
              source={require('../assets/icons/call-red.png')}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <Image
              style={{height: 22, width: 22}}
              source={require('../assets/icons/email-red.png')}
            />
            <TextInput
              placeholder="email"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.addressDetailHead}>
            <Text style={styles.text_header}>Address Detail</Text>
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="City"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="State"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Apartment or office number"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Pin Code"
              placeholderTextColor="#7D7D7D"
              style={[
                styles.textInput,
                {
                  color: '#7D7D7D',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: '#9c3825',

                  marginTop: 30,
                },
              ]}
              onPress={() => navigation.navigate('Address')}>
              <LinearGradient
                colors={['#4C1613', '#FF0E00']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Done
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  addressDetailHead: {
    backgroundColor: 'transparent',

    marginTop: 22,
  },
  personalDetailHead: {
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#972C26',
    fontFamily: FontFamily.ExpoArabicSemiBold,

    fontSize: 18,
    // marginBottom:-25,
  },
  text_footer: {
    fontFamily: FontFamily.ExpoArabicMedium,
    fontSize: 12,
    paddingLeft: 10,
    color: '#000',
  },
  action: {
    flexDirection: 'row',
    marginTop: 25,
    paddingLeft: 25,
    paddingRight: 25,

    backgroundColor: '#F8F8F8',

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,

    paddingLeft: 15,
    paddingVertical: 8,

    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  errorMsg: {
    color: '#972C26',
    fontSize: 14,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  englishTextSign: {
    fontSize: 12,
    fontFamily: FontFamily.ExpoArabicMedium,
    color: '#fff',
  },
  arabicTextSign: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: FontFamily.ExpoArabicMedium,
  },
  language: {
    marginBottom: 40,
  },
  english: {
    width: '50%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.ExpoArabicMedium,
  },
});
