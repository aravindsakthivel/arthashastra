import {
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAILURE,
    FILTER_TRANSACTIONS_TYPE,
    FILTER_TRANSACTIONS_CATEGORY,
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE,
    EDIT_TRANSACTION_REQUEST,
    EDIT_TRANSACTION_SUCCESS,
    EDIT_TRANSACTION_FAILURE,
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
    filter_type:"",
    filter_category:"",
    sortOpt:"",
    creditChart:[],
    debitChart:[],
    renderChart:false
}


export default (state = initState, { type, payload }) => {
    switch (type) {
        case GET_TRANSACTIONS_REQUEST:
            return {
                ...state,
                getTransactionIsLoading: true,
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
                page : payload.data?.next?.page || 1,
                creditChart:payload.data.current.filter((data) => (
                    data.type === "Credit"
                )).map((data, index) => (
                    {value:data['amount'], argument:index + 1}
                )),
                debitChart:payload.data.current.filter((data, index) => (
                    data.type === "Debit"
                )).map((data, index) => (
                    {value:data['amount'], argument:index + 1}
                )),
                renderChart:true
            };

        case GET_TRANSACTIONS_FAILURE:
            return {
                ...state,
                getTransactionIsError: true,
                message:payload.message,
                getTransactionLoading: false,
            };

        case DELETE_TRANSACTION_REQUEST:
            return{
                ...state,
                filter_type:payload,
                getTransactionIsLoading: true,
                getTransactionIsError: false
            }

        case DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactions: state.transactions.filter(x => x.id !== payload)
            }

        case DELETE_TRANSACTION_FAILURE:
            return{
                ...state,
                getTransactionIsError: true,
                message:payload.message,
                getTransactionLoading: false,
            }

        case EDIT_TRANSACTION_REQUEST:
            return{
                ...state,
                filter_type:payload,
                getTransactionIsLoading: true,
                getTransactionIsError: false
            }

        case EDIT_TRANSACTION_SUCCESS:
            let editObj = state.transactions.map(x => x.id === payload.id ? {...x, amount: payload.amount} : x)
            return {
                ...state,
                transactions: editObj
            }

        case EDIT_TRANSACTION_FAILURE:
            return{
                ...state,
                getTransactionIsError: true,
                message:payload.message,
                getTransactionLoading: false,
            }

        case FILTER_TRANSACTIONS_TYPE:
            return{
                ...state,
                filter_type:payload
            }

        case FILTER_TRANSACTIONS_CATEGORY:
            return{
                ...state,
                filter_category: payload
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