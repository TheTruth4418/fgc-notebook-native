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
        case "FETCH_GAMES":{
            return {
                ...state,
                games: action.payload
            }
        }
        default :
            return state
    }
}

export default rootReducer;