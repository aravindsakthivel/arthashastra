import {
    REGISTER_USERS_REQUEST, 
    REGISTER_USERS_SUCCESS, 
    REGISTER_USERS_FAILURE, 
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAILURE,
    LOGOUT_USER} from "./actionTypes" 
import axios from "axios";


export const registerUserRequest = payload => ({
    type: REGISTER_USERS_REQUEST,
    payload
});

export const registerUserSuccess = payload => ({
    type: REGISTER_USERS_SUCCESS,
    payload
});

export const registerUserFailure = payload => ({
    type: REGISTER_USERS_FAILURE,
    payload
});

export const loginUserRequest = payload => ({
    type : LOGIN_USER_REQUEST,
    payload
})

export const loginUserSuccess = payload => ({
    type : LOGIN_USER_SUCCESS,
    payload
})

export const loginUserFailure = payload => ({
    type : LOGIN_USER_FAILURE,
    payload
})

export const LogoutUser = () => ({
    type: LOGOUT_USER
})


export const registerUserProcess = (payload) => dispatch => {
    const config = {
        method: 'post',
        url: 'http://localhost:3004/users',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(registerUserRequest(true))
    return axios(config)
        .then(res => dispatch(registerUserSuccess(res)))
        .catch(err => dispatch(registerUserFailure(err)));
}


export const loginUserProcess = (payload) => dispatch => {
    const config = {
        method: 'post',
        url: 'http://localhost:3004/users',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(loginUserRequest(true))
    return axios(config)
        .then(res => dispatch(loginUserSuccess(res)))
        .catch(err => dispatch(loginUserFailure(err)))
}
