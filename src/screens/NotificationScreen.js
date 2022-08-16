import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FontFamily} from '../components/reusableComponents/Constants';
import {notificationList} from '../services/apis/api';
import {useTranslation} from 'react-i18next';

import {TokenContext} from '../components/context';
import OnErrorText from '../components/reusableComponents/OnErrorText';

const NotificationScreen = ({navigation}) => {
  const token = React.useContext(TokenContext);
  const {t, i18n} = useTranslation();

  const [notificationData, setNotificationData] = useState([null]);
  const [loading, setLoading] = useState(false);

  const getNotificationListApi = () => {
    setLoading(true);
    notificationList(
      token.token.userToken,
      i18n.language === 'en' ? 'en' : 'ar',
    )
      .then(response => {
        response.data.status === 1 
          ? setNotificationData(response.data)
          : setNotificationData(null);
        console.log('response.data', response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);

        console.log('error', error);
      });
  };
  useEffect(() => {
    getNotificationListApi();
  }, []);

  const notificationRender = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 80,
          backgroundColor: '#fff',
          elevation: 2,
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/icons/bell.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 9,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.ExpoArabicBook,
              fontSize: 13,
              paddingRight: 30,
              color: '#000000',
            }}>
            Congratulation you have win 50rs Among prominent people named Asad,
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{backgroundColor: 'transparent', flex: 1, alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#972C26" />
      ) : notificationData ? (
        <FlatList
          data={notificationData.data}
          renderItem={notificationRender}
          keyExtractor={item => item.id}
        />
      ) : (
        <OnErrorText title="No restaurant found" />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
    fontFamily: FontFamily.ExpoArabicBook,
    marginHorizontal: 30,
  },
});
