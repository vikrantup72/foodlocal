import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import CategorySelectionCard from './Cards/CategorySelectionCard';
import {TokenContext} from './context';

const CategorySelector = ({
  addressListData,
  addressListApi,
  setCategoryId,
  multiple,
  setCategorySelected,
  initialValue
}) => {
  const [selected, setSelected] = useState(initialValue);
  const token = React.useContext(TokenContext);

  const [selectedArray, setSelectedArray] = useState([]);
 // console.log('selectedArray',selectedArray)
  



  
  useEffect(() => {
    setCategorySelected(selectedArray);
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
        return selectedArray.includes(item.id);
      } else {
        return selected === item.id;
      }
    };
    return (
      <View>
        <CategorySelectionCard
          item={item}
          index={index}
          selector={setSelector(index)}
          onSelect={val => setCategoryId(val)}
          onSelectIndex={val => setDataFun(val)}
          addressListApi={addressListApi}
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList data={addressListData} numColumns={3}
 renderItem={renderItem} showsVerticalScrollIndicator={false}
 keyExtractor={item => item.id} ItemSeparatorComponent={() => (
  <View
    style={{
      width: 30,
      marginTop: 0,
      backgroundColor: 'transparent',
    }}
  />
)}
/>
    </View>
  );
};




export default CategorySelector;
