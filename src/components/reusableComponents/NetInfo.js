import NetInfo from "@react-native-community/netinfo";
import { netInfoData } from "../../services/actions/actions";
import {ADD_TO_NET_INFO} from '../../services/constants';
import {useDispatch,useSelector} from 'react-redux'


export const netInfo =()=>{
    NetInfo.addEventListener(state => {
        console.log("Connection type", state);
        console.log("Is connected?", state.isConnected);
      });
}