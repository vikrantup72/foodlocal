import React,{useState} from 'react'
import { View, Text,FlatList } from 'react-native'
import AddOnSingleCard from './Cards/AddOnSingleCard'

const AddOnSingle = ({addressListTypeData,addressListApi,setAddressTypeId,multiple,addOnSingleId}) => {

    const [selected,setSelected] = useState([0])

    const [selectedAll,setSelectedAll] = useState([])

    const [selectedArray,setSelectedArray] = useState([])

    // alert(selectedArray)
    const setDataFun =(val)=>{

        

        if (multiple) {
            if (selectedArray.includes(val)) {
                // var index = selectedArray.indexOf(val);
                // if (index !== -1) {
                //     selectedArray.splice(index, 1);
                //   }
                  var filteredAry = selectedArray.filter(e => e !== val)
                  setSelectedArray(filteredAry)
            //   remove(selectedArray, item => {
            //     return item === val;
            //   });
            }    
            else{
                setSelectedArray(oldArray => [...oldArray, val]);
   
            }  
           
          } else {
            setSelected(oldArray => [...oldArray, val])
          }
        // if(multiple){
        //     setSelectedArray(oldArray => [...oldArray, val]);

        // }
        // else{
        //     setSelected(val)
        // }

    }

    const renderItem =({item,index})=>{
        const setSelector = (index)=>{
           if(multiple){
               return selectedArray.includes(index)
            }
            else{
               return selected===index 
            } 
            
       }

       const setAddOn=(val)=>{
         if(addOnSingleId.includes(item.id)){
          setAddressTypeId([val])
          setSelectedAll(oldArray => [...oldArray, addOnSingleId ])
         }
         else{
          setAddressTypeId([ val])

         }
         
       }
       


        return(
          <AddOnSingleCard 
          item={item} 
          index={index} 
          selector={setSelector(index)} 
          onSelect={(val)=>setAddOn(val)} 
          onSelectIndex={(val)=>setDataFun(val)} 
          addressListApi={addressListApi}/>
        )
    }
    return (
        <View>
            <FlatList 
data={addressListTypeData}
renderItem={renderItem}
/>
        </View>
    )
}

export default AddOnSingle
