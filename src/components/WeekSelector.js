import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AddOnListCard from './Cards/AddOnListCard';
import AddressListCard from './Cards/AddressListCard';
import WeekSelectorCard from './Cards/WeekSelectorCard';
import {TokenContext} from './context';

const WeekSelector = ({
  addressListData,
  addressListApi,
  setWeekId,
  multiple,
  setWeekDays,
}) => {
  const [selected, setSelected] = useState(0);
  const token = React.useContext(TokenContext);

  const [selectedArray, setSelectedArray] = useState([]);
  // console.log('selectedArray',selectedArray)
  



  
  useEffect(() => {
    setWeekDays(selectedArray);
  }, [selectedArray]);

  const setDataFun = val => {
    if (multiple) {
      if (selectedArray.includes(val)) {
        var filteredAry = selectedArray.filter(e => e !== val);
        setSelectedArray(filteredAry);
      } else {
        setSelectedArray(oldArray => [...oldArray, val]);
      }
    } else {
      setSelected(val);
    }
    // if(multiple){
    //     setSelectedArray(oldArray => [...oldArray, val]);

    // }
    // else{
    //     setSelected(val)
    // }
  };

  const renderItem = ({item, index}) => {
    const setSelector = index => {
      if (multiple) {
        return selectedArray.includes(item.name);
      } else {
        return selected === index;
      }
    };
    return (
      <View>
        <WeekSelectorCard
          item={item}
          index={index}
          selector={setSelector(index)}
          onSelect={val => setWeekId(val)}
          onSelectIndex={val => setDataFun(val)}
          addressListApi={addressListApi}
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList data={addressListData} renderItem={renderItem} />
    </View>
  );
};

export default WeekSelector;
