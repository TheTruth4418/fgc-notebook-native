const initialState = {
    
}

 const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case "LOGIN_USER":
            return{
                ...state,
                user: action.payload
            }
        case "LOGOUT_USER":
            return{
                state: initialState
            }
        default :
            return state
    }
}

export default rootReducer;