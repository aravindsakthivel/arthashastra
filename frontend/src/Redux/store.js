import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer/authReducer"
import dashBoardReducer from './dashBoardReducer/dashBoardReducer'
import ledgerReducer from './ledgerReducer/ledgerReducer'
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import {saveData } from "./localStorage";



const rootReducer = combineReducers({ 
    authData:authReducer, 
    dashBoardData:dashBoardReducer,
    ledgerData:ledgerReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

// console.log(store.getState());

store.subscribe(throttle(() => saveData("isAuth", store.getState().authData.isAuth), 1000))
store.subscribe(throttle(() => saveData("userId", store.getState().authData.userId), 1000))
store.subscribe(throttle(() => saveData("userData", store.getState().authData.userData), 1000))