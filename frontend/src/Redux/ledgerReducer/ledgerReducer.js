import {
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAILURE,
    FILTER_TRANSACTIONS_TYPE,
    FILTER_TRANSACTIONS_CATEGORY,
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
                getTransactionIsError: payload.error,
                message:payload.message,
                getTransactionLoading: false,
            };

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