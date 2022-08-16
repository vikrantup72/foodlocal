import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AddOnListCard from './Cards/AddOnListCard';
import AddressListCard from './Cards/AddressListCard';
import {TokenContext} from './context';

const AddOnListButtonSelector = ({
  addressListData,
  addressListApi,
  setAddressId,
  multiple,
  setAddOnMultipleSelected,
  addOnMultipleSelected,
  setMultipleSelectedData,
  multipleSelectedData,
  parentIndex,
  selectedMultipleArray,
  setSelectedMultipleArray,
}) => {
  const [selected, setSelected] = useState(0);
  const token = React.useContext(TokenContext);

  const [selectedArray, setSelectedArray] = useState([]);

  // console.log('selected',selected)

  //console.log("selectedArray",selectedArray)

  console.log('selectedMultipleArray', selectedMultipleArray);

  //   console.log('selectedArray',selectedArray)

  //   useEffect(() => {
  //     setAddOnMultipleSelected(oldArray=>[...selectedArray,selectedArray]);
  //   }, [selectedArray]);

  // useEffect(() => {
  //   setMultipleSelectedData(multipleSelectedData => [
  //     ...multipleSelectedData,
  //     selectedArray,
  //   ]);
  // }, [selectedArray]);

  useEffect(() => {
    setMultipleSelectedData(selectedArray);
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
  const setMultipleDataFun = val => {
    console.log('val?.id', val?.id);

    if (multiple) {
      // selectedMultipleArray.forEach((element)=>{
      //   console.log('element',element?.id===val?.id)
      // })
      // if (selectedMultipleArray.includes(val)) {
      //   var filteredAry = selectedMultipleArray.filter(e => e !== val);
      //   setSelectedMultipleArray(filteredAry);
      // } else {
      //   setSelectedMultipleArray(oldArray => [...oldArray, val]);
      // }

      //  let indexof =selectedMultipleArray.findIndex((e)=> e?.id===val?.id)
      //  console.log('indexof',indexof)

      let sameElement = selectedMultipleArray.some(element => {
        return element?.id === val?.id;
      });
      console.log('sameElement', sameElement);

      // selectedMultipleArray.some((element)=>{

      // console.log('element',element?.id===val?.id)
      if (sameElement) {
        var filteredAry = selectedMultipleArray.filter(e => e?.id !== val?.id);
        setSelectedMultipleArray(filteredAry);
      } else {
        setSelectedMultipleArray(oldArray => [...oldArray, val]);
      }
      // })
      if (selectedMultipleArray.length === 0) {
        setSelectedMultipleArray([val]);
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
        return selected === index;
      }
    };
    return (
      <View>
        <AddOnListCard
          item={item}
          index={index}
          selector={setSelector(index)}
          onSelect={val => setAddressId(val)}
          onSelectIndex={val => setDataFun(val)}
          addressListApi={addressListApi}
          onSelectMultipleIndex={val => setMultipleDataFun(val)}
          parentIndex={parentIndex}
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

export default AddOnListButtonSelector;
