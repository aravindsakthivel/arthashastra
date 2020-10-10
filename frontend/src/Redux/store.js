import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer/authReducer"
import thunk from "redux-thunk";



const rootReducer = combineReducers({ 
    authData:authReducer, 
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

console.log(store.getState());
