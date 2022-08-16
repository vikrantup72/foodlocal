
import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';  
  
export default class CustomProgressBar extends Component {  
    state={  
        progressStatus: 0,  
    }  
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate();  
    }  
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 1000,  
        }).start();  
    }  
  render() {  
    return (  
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
          
      </View>  
    );  
  }  
}  
const styles = StyleSheet.create({  
    container: {  
    width: "50%",  
    height: 40,  
    padding: 3,  
    borderColor: "#FAA",  
    
    borderRadius: 30,  
      
    justifyContent: "center",  
  },  
  inner:{  
    width: "100%",  
    height: 9,  
    borderRadius: 15,  
    backgroundColor:"#9c3825",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});