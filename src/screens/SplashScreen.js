import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import CustomProgressBar from '../components/CustomProgressBar';

const SplashScreen = (props,{navigation}) => {

    console.log('sign')
    const { colors } = useTheme();
    setTimeout(()=>{
        
       
        props.navigation.replace('Category');
        
      
        
    },1500);
    console.log('sigsn')
    

    return (
      
      <View style={styles.container}>
<StatusBar
        animated={true}
        
        hidden={false} />
        <View style={styles.header}>
             <Image 
                
                
            source={require('../assets/splash.jpeg')}
            style={styles.splash}
            
            />
            {/* <Image 
                
                
            source={require('../assets/logo.png')}
            style={styles.logo}
            
            /> */}
            {/* <CustomProgressBar 
            style ={styles.loading}
            /> */}
            


        </View>
        
      
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    
     
  },
  header: {
      flex: 1,
      justifyContent:"center",
      alignItems: 'center',backgroundColor:"transparent"
  },
 
  logo: {
      width: 90,
      height: 90,
      marginBottom:20
  },
  splash: {
    width: '100%',
    height: '100%',
    marginBottom:20
},
 
 
  loading :{marginTop:15
    

    
},

});

