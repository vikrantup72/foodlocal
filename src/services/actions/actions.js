
import { fetchCategory } from '../apis/api';
import {ADD_TO_CART,REMOVE_TO_CART} from '../constants';
import axios from 'axios'
export const addHome = (data)=>{
    console.log('data',data)
return {
    type :'ADD_TO_CART',
    payload:data
}}
export const addAuth = (data)=>{
    return {
        type :'ADD_TO_AUTH',
        payload:data
    }}
    export const categoryData = (data)=>{

        console.log('data',data)
        return (dispatch)=>{
           return fetchCategory().then((response)=>{
               console.log('fetchCategoryResponse.data',response.data)
                dispatch({type :'ADD_TO_CART', payload:response.data})

           })         
        }  
    }

    // Action Creator
// export const categoryData = () => ( dispatch ) => {
//     console.log( "[*** 2. inside addLastNameActionCreator]" );
//     // Case1: Think returns Loading until receives response
//     dispatch( { type: "ADD_TO_CATEGORY",
//     payload:'1'} );
//     // Calling the server
//     fetchCategory()
//     axios.get('http://83.136.219.147/food/api/v1/getCategoryList')
//         // Case2 Thunk received response
//         .then( response => response.json() )
//         .then( responseJson => {
//             console.log( "3. received ", responseJson );
//             dispatch( {
//                 type: "ADD_TO_CATEGORY",
//                 payload: responseJson
//             } );
//         });
// }
