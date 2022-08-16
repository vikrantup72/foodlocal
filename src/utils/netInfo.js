import NetInfo from "@react-native-community/netinfo";
import Snackbar from "react-native-snackbar";

export const netInfo =()=>{
    NetInfo.addEventListener(state => {
        console.log("Connection type", state);
        console.log("Is connected?", state?.isConnected);
        {!state?.isConnected?Snackbar.show({
            text: 'Internet Disconnected',
            duration: Snackbar.LENGTH_LONG,
          }):null}
      });
}