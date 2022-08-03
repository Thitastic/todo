
const initState = {
   Auth : false,
   user : null,
   tempTodo: null
}
const rootReducers = (state = initState, action) =>{
    switch (action.type) {
        case "USER_LOGIN":
            if(action.payload){
                return{
                    ...state,
                    Auth: true,
                    user: action.payload
                }
            }
            break
        case "USER_LOGOUT":
            console.log(">>> user log out >>> ", action.payload)
            if(action.payload){
                return{
                    ...state,
                    Auth: false,
                    user: null
                }
            }
            break;
        case "USER_AUTH":
            return{
                ...state,
                Auth : action.payload
            }
        case "SET_TEMP":
            return{
                ...state,
                tempTodo: action.payload
            }
        default:
            break;
    }
    return state
}

export default rootReducers