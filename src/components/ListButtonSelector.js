import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import AddressListCard from './Cards/AddressListCard'



const ListButtonSelector = ({addressListData,addressListApi,setAddressId,manageAddress}) => {

    const [selected,setSelected] = useState(0)

    const renderItem =({item,index})=>{
        const setSelector = (index)=>{
            return selected=== index
       }
        return(
          <AddressListCard 
          item={item} 
          index={index} 
          selector={setSelector(index)} 
          onSelect={(val)=>setAddressId(val)} 
          onSelectIndex={(val)=>setSelected(val)} 
          addressListApi={addressListApi}
          manageAddress={manageAddress}
          />
        )
    }
    return (
        <View>
<FlatList 
data={addressListData}
renderItem={renderItem}
/>
        </View>
    )
}

export default ListButtonSelector
