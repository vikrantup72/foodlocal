import React from 'react';
import {View,Image,StyleSheet} from 'react-native'

const Star = ({rating})=>{
    //console.log('ddd',rating)
return(
    <View>

       {rating===1? <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        </View>:null}
        
        {rating===2?  <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        </View>:null}


        {rating===3? <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        </View>:null}

{rating===4? <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        </View>:null}

{rating===5? <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>  
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        <Image source={require('../../assets/icons/star-red.png')} style={styles.imageStyle}/>
        </View>:null}


    </View>
)
}

const styles = StyleSheet.create({
imageStyle:{
    height:14,width:14
}
})
export default Star