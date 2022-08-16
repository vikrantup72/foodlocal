import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

 


const rootReducer =  combineReducers({
    reducer:reducer,
    

})
const store = createStore(rootReducer,applyMiddleware(thunk))


export default store;