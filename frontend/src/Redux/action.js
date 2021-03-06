import {
    REGISTER_USERS_REQUEST, 
    REGISTER_USERS_SUCCESS, 
    REGISTER_USERS_FAILURE, 
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAILURE,
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAILURE,
    GET_TOP_TRANSACTIONS_REQUEST,
    GET_TOP_TRANSACTIONS_SUCCESS,
    GET_TOP_TRANSACTIONS_FAILURE,
    EDIT_TRANSACTION_REQUEST,
    EDIT_TRANSACTION_SUCCESS,
    EDIT_TRANSACTION_FAILURE,
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE,
    FILTER_TRANSACTIONS_TYPE,
    FILTER_TRANSACTIONS_CATEGORY,
    SORT_TRANSACTIONS,
    REMOVE_MESSAGE} from "./actionTypes" 
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

export const logoutUser = () => ({
    type: LOGOUT_USER
})

export const deleteTransactionRequest = payload => ({
    type : DELETE_TRANSACTION_REQUEST,
    payload
})

export const deleteTransactionSuccess = payload => ({
    type : DELETE_TRANSACTION_SUCCESS,
    payload
})

export const deleteTransactionFailure = payload => ({
    type : DELETE_TRANSACTION_FAILURE,
    payload
})

export const editTransactionRequest = payload => ({
    type : EDIT_TRANSACTION_REQUEST,
    payload
})

export const editTransactionSuccess = payload => ({
    type : EDIT_TRANSACTION_SUCCESS,
    payload
})

export const editTransactionFailure = payload => ({
    type : EDIT_TRANSACTION_FAILURE,
    payload
})

export const addTransactionRequest = payload => ({
    type : ADD_TRANSACTION_REQUEST,
    payload
})

export const addTransactionSuccess = payload => ({
    type : ADD_TRANSACTION_SUCCESS,
    payload
})

export const addTransactionFailure = payload => ({
    type : ADD_TRANSACTION_FAILURE,
    payload
})

export const getTopTransactionRequest = payload => ({
    type : GET_TOP_TRANSACTIONS_REQUEST,
    payload
})

export const getTopTransactionSuccess = payload => ({
    type : GET_TOP_TRANSACTIONS_SUCCESS,
    payload
})

export const getTopTransactionFailure = payload => ({
    type : GET_TOP_TRANSACTIONS_FAILURE,
    payload
})

export const getTransactionRequest = payload => ({
    type : GET_TRANSACTIONS_REQUEST,
    payload
})

export const getTransactionSuccess = payload => ({
    type : GET_TRANSACTIONS_SUCCESS,
    payload
})

export const getTransactionFailure = payload => ({
    type : GET_TRANSACTIONS_FAILURE,
    payload
})

export const removeMessage = payload => ({
    type : REMOVE_MESSAGE
})

export const filterTransactionsType = payload => ({
    type : FILTER_TRANSACTIONS_TYPE,
    payload
})

export const filterTransactionsCategory = payload => ({
    type : FILTER_TRANSACTIONS_CATEGORY,
    payload
})

export const sortTransactions = payload => ({
    type : SORT_TRANSACTIONS,
    payload
})

export const loginUserProcess = (payload) => dispatch => {
    const config = {
        method: 'post',
        url: 'https://arthashastra.herokuapp.com/api/auth/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(loginUserRequest(true))
    return axios(config)
        .then(res => dispatch(loginUserSuccess(res.data)))
        .catch(err => dispatch(loginUserFailure(err)))
}


export const registerUserProcess = (payload) => dispatch => {
    let loginCred = {
        "username" : payload.username,
        "password" : payload.password 
    }
    const config = {
        method: 'post',
        url: 'https://arthashastra.herokuapp.com/api/auth/register',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(registerUserRequest(true))
    return axios(config)
        .then(res => dispatch(registerUserSuccess(res.data)))
        .then(res => dispatch(loginUserProcess(loginCred)))
        .catch(err => dispatch(registerUserFailure(err)));
}

export const getTopTransactionProcess = (payload) => dispatch => {
    const config = {
        method: 'post',
        url: 'https://arthashastra.herokuapp.com/api/transact?page=1&limit=5',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(getTopTransactionRequest(true))
    return axios(config)
        .then(res => dispatch(getTopTransactionSuccess(res.data)))
        .catch(err => dispatch(getTopTransactionFailure(err)))
}


export const addTransactionProcess = (payload) => dispatch => {
    let userId = {
        "user_id" : payload.user_id
    }
    const config = {
        method: 'post',
        url: 'https://arthashastra.herokuapp.com/api/transact/add',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    dispatch(addTransactionRequest(true))
    return axios(config)
        .then(res => dispatch(addTransactionSuccess(res.data)))
        .then(res => dispatch(getTopTransactionProcess(userId)))
        .catch(err => dispatch(addTransactionFailure(err)))
}


export const getTransactionProcess = (payload) => dispatch => {
    const config = {
        method: 'post',
        url: `https://arthashastra.herokuapp.com/api/transact?page=${payload.page + 1}&limit=${payload.limit}`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : {"user_id" : payload.userId}
    }
    dispatch(getTransactionRequest(true))
    return axios(config)
        .then(res => dispatch(getTransactionSuccess(res.data)))
        .catch(err => dispatch(getTransactionFailure(err)))
}


export const deleteTransaction = (payload) => dispatch => {
    const config = {
        method: 'delete',
        url: `https://arthashastra.herokuapp.com/api/transact/delete`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : {"id" : payload}
    }
    return axios(config)
        .then(res => dispatch(deleteTransactionSuccess(payload)))
        .catch(err => dispatch(deleteTransactionFailure(err)))
}


export const editTransaction = (payload) => dispatch => {
    const config = {
        method: 'patch',
        url: `https://arthashastra.herokuapp.com/api/transact/update`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    }
    return axios(config)
        .then(res => dispatch(editTransactionSuccess(payload)))
        .catch(err => dispatch(editTransactionFailure(err)))
}