import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import ChooseButtonCard from './Cards/ChooseButtonCard';

const Choosebutton = ({
  addressListTypeData,
  addressListApi,
  setAddressTypeId,
  multiple,
}) => {
  const [selected, setSelected] = useState(0);

  const [selectedArray, setSelectedArray] = useState([]);

  // alert(selectedArray)
  const setDataFun = val => {
    if (multiple) {
      if (selectedArray.includes(val)) {
        // var index = selectedArray.indexOf(val);
        // if (index !== -1) {
        //     selectedArray.splice(index, 1);
        //   }
        var filteredAry = selectedArray.filter(e => e !== val);
        setSelectedArray(filteredAry);
        //   remove(selectedArray, item => {
        //     return item === val;
        //   });
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
        return selectedArray.includes(index);
      } else {
        return selected === index;
      }
    };
    return (
      <ChooseButtonCard
        item={item}
        index={index}
        selector={setSelector(index)}
        onSelect={val => setAddressTypeId(val)}
        onSelectIndex={val => setDataFun(val)}
        addressListApi={addressListApi}
      />
    );
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={addressListTypeData}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
};

export default Choosebutton;
