const initialState ={

userFirstName:'ssss',
userLas:'s',
category:[]

}

const reducer= (state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return{ 
                ...state,
                userFirstName:action.payload

                
            }   
            case "ADD_TO_AUTH":
                return{ 
                    ...state,
                    userLas:action.payload
    
                    
                }  
                case "ADD_TO_CATEGORY":
                    return{ 
                        ...state,
                        category:action.payload
        
                        
                    }  
            default :
            return state
    }

}
export default reducer;