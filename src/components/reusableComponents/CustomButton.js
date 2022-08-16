import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, FontFamily, FontSize} from './Constants';

const CustomButton = ({onPress, title, loading}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <LinearGradient
        colors={['#4C1613', '#FF0E00']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.button}>
        {!loading ? (
          <Text style={styles.buttonText}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: FontSize[18],
    fontFamily: FontFamily.poppinsMedium,
    color: Colors.white,
  },
});
