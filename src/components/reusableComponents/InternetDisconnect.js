import React from 'react'
import {View,Text} from 'react-native'

const InternetDisconnect = ()=>{
    return(
        <View style={{backgroundColor:'#DC143C	',width:'100%',height:30,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff'}}>
               Sorry cannot connect to the internet, you may be offline 
            </Text>
        </View>
    )
}

export default InternetDisconnect;