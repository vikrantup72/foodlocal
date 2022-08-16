import { Alert } from "react-native";

export const showLoginAlert = (navigation,title,discription,screenName) =>
    Alert.alert(
        title,
        discription,
      [
        {
          text: 'NO',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => navigation?.navigate(screenName),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        
      },
    );