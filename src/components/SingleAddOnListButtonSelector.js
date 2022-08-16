import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import SingleAddOnListButtonSelectorCard from './Cards/SingleAddOnListButtonSelectorCard';

const SingleAddOnListButtonSelector = ({
  addOnListData,
  setAddOnSingleSelected,
  manageAddress,
  setDefaultSingleData,
  defaultSingleData,
  singleDataIndex,
  setOnSelectItemWithIndex,
  onSelectItemWithIndex
}) => {
  const [selected, setSelected] = useState(0);



  

    var foundIndex = defaultSingleData.findIndex(x => x.index == onSelectItemWithIndex.index);
    defaultSingleData[foundIndex] = onSelectItemWithIndex;
    // console.log('defaultSingleData',defaultSingleData)

  useEffect(()=>{

    setDefaultSingleData((old)=>[...old,{index:singleDataIndex,id:addOnListData[0].id}])
  },[])
//   console.log('singleDataIndex',singleDataIndex)
  const renderItem = ({item, index}) => {
    const setSelector = index => {
      return selected === index;
    };
    
    
    return (
      <SingleAddOnListButtonSelectorCard
        item={item}
        index={index}
        selector={setSelector(index)}
        onSelect={val => setAddOnSingleSelected(val)}
        onSelectIndex={val => setSelected(val)}
        manageAddress={manageAddress}
        singleDataIndex={singleDataIndex}
        setOnSelectItemWithIndex={setOnSelectItemWithIndex}
      />
    );
  };
  return (
    <View>
      <FlatList data={addOnListData} renderItem={renderItem} />
    </View>
  );
};

export default SingleAddOnListButtonSelector;
