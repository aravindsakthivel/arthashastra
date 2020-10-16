import {
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAILURE,
    FILTER_TRANSACTIONS,
    SORT_TRANSACTIONS,
    LOGOUT_USER } from "../actionTypes" 


const initState = {
    getTransactionIsLoading:false,
    getTransactionIsError:false,
    transactions:[],
    totalCount:0,
    limit:10,
    page:1,
    message:"",
    filterOpt:"",
    sortOpt:"",
}


export default (state = initState, { type, payload }) => {
    console.log(type, payload);
    switch (type) {
        case GET_TRANSACTIONS_REQUEST:
            return {
                ...state,
                getTransactionIsLoading: payload,
                getTransactionIsError: false
            };

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: payload.data.current,
                getTransactionIsLoading: false,
                getTransactionIsError:false,
                totalCount : payload.data.totalCount,
                limit : payload.data?.next?.limit || payload.data.totalCount,
                page : payload.data?.next?.page || 1
            };

        case GET_TRANSACTIONS_FAILURE:
            return {
                ...state,
                getTransactionIsError: payload.error,
                message:payload.message,
                getTransactionLoading: false,
            };

        case FILTER_TRANSACTIONS:
            return{
                ...state,
                filterOpt:payload
            }

        case SORT_TRANSACTIONS:
            return{
                ...state,
                sortOpt:payload
            }

        case  LOGOUT_USER:
            return{
                ...state,
                getTransactionIsLoading:false,
                getTransactionIsError:false,
                transactions:[],
                message:"",
            }

        default:
            return state;
    }
}