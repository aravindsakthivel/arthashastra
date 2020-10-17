import {
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAILURE,
    GET_TOP_TRANSACTIONS_REQUEST,
    GET_TOP_TRANSACTIONS_SUCCESS,
    GET_TOP_TRANSACTIONS_FAILURE,
    REMOVE_MESSAGE,
    LOGOUT_USER } from "../actionTypes" 
    


const initState = {
    addTransactionIsLoading:false,
    addTransactionIsError:false,
    getTopTransactionIsLoading:false,
    getTopTransactionIsError:false,
    topTransactions:[],
    message:"",
    success:false,
    creditData:0,
    debitData:0
}


export default (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TRANSACTION_REQUEST:
            return {
                ...state,
                addTransactionIsLoading: payload,
                addTransactionIsError: false
            };

        case ADD_TRANSACTION_SUCCESS:
            return {
                ...state,
                addTransactionIsLoading: false,
                message:payload.message
            };

        case ADD_TRANSACTION_FAILURE:
            return {
                ...state,
                addTransactionIsError: payload.error,
                message:payload.message,
                addTransactionIsLoading: false
            };

        case GET_TOP_TRANSACTIONS_REQUEST:
            return {
                ...state,
                getTopTransactionIsLoading: payload,
                getTopTransactionIsError: false
            };

        case GET_TOP_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                topTransactions: payload.data.current,
                getTopTransactionIsLoading: false,
                getTopTransactionIsError:false,
                creditData:payload.data.credit,
                debitData:payload.data.debit
            };

        case GET_TOP_TRANSACTIONS_FAILURE:
            return {
                ...state,
                getTopTransactionIsError: payload.error,
                message:payload.message,
                getTopTransactionLoading: false,
            };

        case REMOVE_MESSAGE :
            return{
                ...state,
                message:""
            }
        
        case  LOGOUT_USER:
            return{
                ...state,
                addTransactionIsLoading:false,
                addTransactionIsError:false,
                getTopTransactionIsLoading:false,
                getTopTransactionIsError:false,
                topTransactions:[],
                message:"",
                success:false,
                creditData:0,
                debitData:0
            }
        default:
            return state;
    }
}