import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {Colors, FontFamily} from '../components/reusableComponents/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Modal from 'react-native-modal';
import WeekSelector from '../components/WeekSelector';
import CustomCalendar from '../components/CustomCalendar';
import {addSubscription} from '../services/apis/api';
import {TokenContext} from '../components/context';
import {FlatList} from 'react-native-gesture-handler';

export default function SubcriptionScreen({navigation, route}) {
  const menuIds = [...new Set(route.params.menuIds)];
  const token = React.useContext(TokenContext);

  const {t, i18n} = useTranslation();

  const [startDateshow, setStartDateShow] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIosModalVisible, setIsIosModalVisible] = useState(false);

  const [weekId, setWeekId] = useState([]);

  const [weekDays, setWeekDays] = useState([]);
  const [multiSelectedDates, setMultiSelectedDates] = useState([]);



  //console.log('weekDays',weekDays.toString())
  //console.log('multiSelectedDates', multiSelectedDates);

  const onDailyChange = (event, selectedDate) => {
    //  console.log('selectedDate', selectedDate);
    setStartDateShow(true);
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDailyDatepicker = () => {
    setShow(true);
    setMode('date');
  };
  const [endDateshow, setEndDateShow] = useState(false);

  const [dailyEndDate, setDailyEndDate] = useState(new Date());
  const [dailyEndmode, setDailyEndMode] = useState('date');
  const [dailyEndshow, setDailyEndShow] = useState(false);

  const onDailyEndChange = (event, selectedDate) => {
    // console.log('selectedDate', selectedDate);
    setEndDateShow(true);
    const currentDate = selectedDate || date;
    setDailyEndShow(false);
    setDailyEndDate(currentDate);
  };

  const showDailyEndDatepicker = () => {
    setDailyEndShow(true);
    setDailyEndMode('date');
  };

  const data = [
    {
      label: 'Weekly',
    },
    {
      label: 'Monthly',
    },
    {
      label: 'Yearly',
    },
  ];
  const [selected, setSelected] = useState('Daily');

  useEffect(()=>{

    setWeekDays([])
    setMultiSelectedDates([])
  },[selected])
  

  // const showMode = currentMode => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };
  // const [date, setDate] = useState('06-10-2020')

  const toggleModal = () => {
    setIsModalVisible(!this.isModalVisible);
  };

  // token,
  // device_id,
  // subscription_type,
  // days,
  // start_date,
  // end_date,
  //monthly_dates
  const addSubscriptionApi = () => {
    let uniqSelectedArray = [...new Set(multiSelectedDates)];

    addSubscription(
      token.token.deviceId,
      menuIds.toString(),
      selected.toLowerCase(),
      weekDays.toString(),
      moment(date).format('YYYY-MM-DD'),
      moment(dailyEndDate).format('YYYY-MM-DD'),
      uniqSelectedArray.toString(),
    )
      .then(response => {
        console.log('addSubscriptionApiresponse', response.data.status);
        response.data.status === 1 ? navigation.goBack() : null;
      })
      .catch(error => {
        console.error('subscerror', error);
      });
  };

  const startEndDateSelectionAndResult = () => {
    return (
      <View style={styles.dateSelectResultStyle}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {!startDateshow ? (
            <Text style={styles.subcriptionSelectStartEnddateTextStyle}>
              {t('startDate')}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 22,
                color: '#972C26',
                marginLeft: 10,
              }}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              showDailyDatepicker();
              setDailyEndShow(false);
            }}>
            <Image
              source={require('../assets/icons/calendar.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          {!endDateshow ? (
            <Text style={styles.subcriptionSelectStartEnddateTextStyle}>
              {t('endDate')}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 22,
                color: '#972C26',
                marginLeft: 10,
              }}>
              {moment(dailyEndDate).format('DD/MM/YYYY')}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              showDailyEndDatepicker();
              setShow(false);
            }}>
            <Image
              source={require('../assets/icons/calendar.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const selectedItems = () => {
    return (
      <View style={{flexDirection: 'row', width: '90%', marginVertical: 10}}>
        {weekDays.length > 0 ? (
          <Text
            style={{
              color: Colors.primary,
              fontStyle: FontFamily.ExpoArabicBook,
              fontSize: 15,
            }}>
            {'Selected Weeks : '}
          </Text>
        ) : null}

        {weekDays.length > 0 ? (
          <FlatList
            horizontal
            data={weekDays}
            renderItem={({item,index}) => {
              var strFirstThree = item.substring(0, 3);
              let weekDaysIndex = weekDays?.length-1


              return (
                <View>
                  <Text  style={{
                        color: Colors.primary,
                        fontStyle: FontFamily.ExpoArabicBook,
                        fontSize: 15,
                      }}>
                    {strFirstThree}
                    {weekDaysIndex===index?'':', '}
                  </Text>
                </View>
              );
            }}
          />
        ) : null}

        {multiSelectedDates.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              marginVertical: 10,
            }}>
            {multiSelectedDates.length > 0 ? (
              <Text
                style={{
                  color: Colors.primary,
                  fontStyle: FontFamily.ExpoArabicBook,
                  fontSize: 15,
                }}>
                {'Selected Dates : '}
              </Text>
            ) : null}
            <FlatList
              horizontal
              data={multiSelectedDates}
              renderItem={({item,index}) => {
                let lastTwoString = item.slice(-2);
                console.log(lastTwoString);
                let multiSelectedDatesIndex = multiSelectedDates?.length-1
                console.log('multiSelectedDatesIndex',multiSelectedDatesIndex)

                return (
                  <View>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontStyle: FontFamily.ExpoArabicBook,
                        fontSize: 15,
                      }}>
                      {lastTwoString}
                      {multiSelectedDatesIndex===index?'':', '}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          setSelected('Daily');
          // showDailyDatepicker();
          // setIsModalVisible(true);
        }}>
        <View style={{width: '95%'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: '#9c3825',
              borderRadius: 7,
              height: 70,
              alignItems: 'center',
              paddingLeft: 25,
            }}>
            {selected === 'Daily' ? (
              <Image
                source={require('../assets/icons/radio1.png')}
                style={{height: 20, width: 20}}
              />
            ) : (
              <Image
                source={require('../assets/icons/radio2.png')}
                style={{height: 20, width: 20}}
              />
            )}

            <Text style={styles.titleTextStyle}>{t('daily')}</Text>
            {/* <Text
              style={[styles.startEndDate, {marginLeft: 30}]}
              onPress={() => {
                showDailyDatepicker();
              }}>
              {t('startDate')}
            </Text>
            <Text
              style={styles.startEndDate}
              onPress={() => {
                showDailyEndDatepicker();
              }}>
              {t('endDate')}
            </Text> */}
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        onPress={() => {
          setSelected('Weekly');
          setIsModalVisible(true);
        }}>
        <View style={{width: '95%', marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: '#9c3825',
              borderRadius: 7,
              height: 70,
              alignItems: 'center',
              paddingLeft: 25,
            }}>
            {selected === 'Weekly' ? (
              <Image
                source={require('../assets/icons/radio1.png')}
                style={{height: 20, width: 20}}
              />
            ) : (
              <Image
                source={require('../assets/icons/radio2.png')}
                style={{height: 20, width: 20}}
              />
            )}

            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 22,
                color: '#972C26',
                marginLeft: 10,
              }}>
              {t('weekly')}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        onPress={() => {
          setSelected('Monthly');
          setIsModalVisible(true);
        }}>
        <View style={{width: '95%'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: '#9c3825',
              borderRadius: 7,
              height: 70,
              alignItems: 'center',
              paddingLeft: 25,
            }}>
            {selected === 'Monthly' ? (
              <Image
                source={require('../assets/icons/radio1.png')}
                style={{height: 20, width: 20}}
              />
            ) : (
              <Image
                source={require('../assets/icons/radio2.png')}
                style={{height: 20, width: 20}}
              />
            )}
            <Text style={styles.titleTextStyle}>{t('monthly')}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      {/* <TouchableNativeFeedback>
        <View style={styles.dateResultStyle}>
          <View style={{flex: 1}}>
            <Text style={styles.subcriptionStartEnddateTextStyle}>
              Start Date
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 22,
                color: '#972C26',
                marginLeft: 10,
              }}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.subcriptionStartEnddateTextStyle}>
              End Date
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.ExpoArabicSemiBold,
                fontSize: 22,
                color: '#972C26',
                marginLeft: 10,
              }}>
              {moment(dailyEndDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback> */}

      {show && (
        <DateTimePicker
          style={{width: '100%'}}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDailyChange}
        />
      )}

      {dailyEndshow && (
        <DateTimePicker
          style={{width: '100%'}}
          testID="dateTimePicker"
          value={dailyEndDate}
          mode={dailyEndmode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDailyEndChange}
        />
      )}

      {selectedItems()}

      {startEndDateSelectionAndResult()}

      <View style={styles.titleTextStyle}>
        <TouchableOpacity onPress={() => addSubscriptionApi()}>
          <LinearGradient
            colors={['#FF0E00', '#4C1613']}
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
              {t('SubscribeNow')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          alignSelf: 'center',
          margin: 0,
          bottom: 0,
          position: 'absolute',
        }}
        useNativeDriver={true}
        //  animationType="slide"
        animationIn="fadeIn"
        animationOut="fadeOut"
        // deviceWidth={deviceWidth}
        // deviceHeight={deviceHeight}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 20,
              }}>
              {selected === 'Weekly' ? (
                <View style={{}}>
                  <Text
                    style={{
                      fontFamily: FontFamily.ExpoArabicSemiBold,
                      fontSize: 15,
                      color: '#9c3825',
                      marginLeft: 20,
                      marginTop: 15,
                    }}>
                    Select Delivery Day
                  </Text>
                  <WeekSelector
                    addressListData={[
                      {id: '1', name: 'Sunday'},
                      {id: '2', name: 'Monday'},
                      {id: '3', name: 'Tuesday'},
                      {id: '4', name: 'Wednesday'},
                      {id: '5', name: 'Thursday'},
                      {id: '6', name: 'Friday'},
                      {id: '7', name: 'Saturday'},
                    ]}
                    setWeekId={setWeekId}
                    multiple={true}
                    setWeekDays={setWeekDays}
                  />
                </View>
              ) : null}

              {selected === 'Monthly' ? (
                <View style={{}}>
                  <CustomCalendar
                    setMultiSelectedDates={setMultiSelectedDates}
                  />
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {/* <TouchableOpacity onPress={() => showDailyDatepicker()}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.signIn}>
                  
             {Platform.OS==='ios'?     <DateTimePicker
                style={{width:'80%'}}

          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDailyChange}
        />:<Text
        style={[
          styles.textSign,
          {
            color: '#fff',
          },
        ]}>
        {t('startDate')}
      </Text>}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => showDailyEndDatepicker()}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
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
                    {t('endDate')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity> */}
              </View>
              {(Platform.OS === 'ios' && show) || dailyEndshow ? (
                <View
                  style={{
                    borderTopWidth: 0.3,
                    marginVertical: selected === 'Daily' ? 0 : 5,
                    borderColor: selected === 'Daily' ? '#fff' : '#000',
                  }}
                />
              ) : null}

              {/* <View style={styles.dateSelectResultStyle}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!startDateshow ? (
                    <Text style={styles.subcriptionSelectStartEnddateTextStyle}>
                      Start Date
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: FontFamily.ExpoArabicSemiBold,
                        fontSize: 22,
                        color: '#972C26',
                        marginLeft: 10,
                      }}>
                      {moment(date).format('DD/MM/YYYY')}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      showDailyDatepicker();
                      setDailyEndShow(false);
                    }}>
                    <Image
                      source={require('../assets/icons/calendar.png')}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  {!endDateshow ? (
                    <Text style={styles.subcriptionSelectStartEnddateTextStyle}>
                      End Date
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: FontFamily.ExpoArabicSemiBold,
                        fontSize: 22,
                        color: '#972C26',
                        marginLeft: 10,
                      }}>
                      {moment(dailyEndDate).format('DD/MM/YYYY')}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      showDailyEndDatepicker();
                      setShow(false);
                    }}>
                    <Image
                      source={require('../assets/icons/calendar.png')}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                </View>
              </View> */}
              {/* {startEndDateSelectionAndResult()} */}

              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setTimeout(() => {
                    setStartDateShow(false);
                    setEndDateShow(false);
                    setShow(false);
                    setDailyEndShow(false);
                  }, 200);
                }}>
                <LinearGradient
                  colors={['#FF0E00', '#4C1613']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: '90%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginTop: 15,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    {t('Submit')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  mainTitle: {
    color: '#646464',
  },

  itemTitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#9c3825',
  },
  itemContainer: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: {width: 1, height: 13},
    backgroundColor: 'white',
    marginTop: 5,
  },
  itemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,

    width: '100%',
  },
  signIn: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  textSign: {
    fontSize: 16,
    fontFamily: FontFamily.ExpoArabicSemiBold,
  },
  titleTextStyle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 20,
    color: '#972C26',
    marginLeft: 10,
  },
  startEndDate: {
    fontFamily: FontFamily.ExpoArabicMedium,
    fontSize: 20,
    color: '#972C26',
    marginLeft: 15,
  },
  dateResultStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9c3825',
    borderRadius: 7,
    width: '80%',
    backgroundColor: 'transparent',
    marginTop: 40,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  dateSelectResultStyle: {
    // flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9c3825',
    borderRadius: 7,
    width: '80%',
    backgroundColor: 'transparent',
    marginTop: 40,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 100,
  },
  subcriptionStartEnddateTextStyle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 20,
    color: '#972C26',
    marginLeft: 10,
  },

  subcriptionSelectStartEnddateTextStyle: {
    fontFamily: FontFamily.ExpoArabicSemiBold,
    fontSize: 20,
    color: '#972C26',
    marginLeft: 10,
  },
});
