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
        case "FETCH_CHAR_NOTES":
            return {
                ...state,
                current_note: action.payload
            }
        case "FETCH_MU_NOTES":
            return {
                ...state,
                current_note: action.payload
            }
        case "REFRESH_CURRENT_NOTE":
            return {
                ...state,
                current_note: undefined
            }
        default :
            return state
    }
}

export default rootReducer;