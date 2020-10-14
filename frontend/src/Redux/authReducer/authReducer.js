import {
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAILURE,
    REGISTER_USERS_REQUEST, 
    REGISTER_USERS_SUCCESS, 
    REGISTER_USERS_FAILURE,
    LOGOUT_USER } from "../actionTypes" 
    import { loadData} from "../localStorage";


const initState = {
    registerIsLoading:false,
    registerIsError:false,
    loginIsLoading:false,
    loginIsError:false,
    message:"",
    userData:loadData("userData") || {},
    userId:loadData("userId") || "",
    isAuth:loadData("isAuth") || false
}


export default (state = initState, { type, payload }) => {
    console.log(type, payload);
    switch (type) {
        case REGISTER_USERS_REQUEST:
            return {
                ...state,
                registerIsLoading: payload,
                registerIsError: false
            };

        case REGISTER_USERS_SUCCESS:
            return {
                ...state,
                message: payload.message,
                registerIsLoading: false,
                isAuth:true
            };

        case REGISTER_USERS_FAILURE:
            return {
                ...state,
                registerIsError: true,
                message:payload.message,
                registerIsLoading: false
            };

        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginIsLoading: payload,
                loginIsError: false
            };

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userData: payload.data,
                userId : payload.data.id,
                loginIsLoading: false,
                isAuth:true
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loginIsError: true,
                message:payload.message,
                loginIsLoading: false,
            };

        case LOGOUT_USER:
            return{
                ...state,
                registerIsLoading:false,
                registerIsError:false,
                loginIsLoading:false,
                loginIsError:false,
                message:"",
                isAuth:false
            }
        default:
            return state;
    }
}