// Regular Redux Store with Thunk As a Middleware
// import { legacy_createStore as createStore ,applyMiddleware } from "redux";
// import rootReducers from './RootReducers'
// import thunk from "redux-thunk";

// export const store = createStore(rootReducers,applyMiddleware(thunk));

// export default store;


// //Same Code as Above but with Redux Toolkit
// import { configureStore } from "@reduxjs/toolkit";
// // import { applyMiddleware } from "@reduxjs/toolkit"; 
// // middleware is included in toolkit so not required to apply thunk middleware
// import rootReducers from "./RootReducers";

// export const store = configureStore({reducer : rootReducers})

// export default store;


// store can use multiple middleware i.e : Thunk & Saga
// SAGA Configuration with some actions using thunk too

import { configureStore } from '@reduxjs/toolkit';
import productSaga from './Saga';
import createSagaMiddleware from '@redux-saga/core';
import RootReducers from './RootReducers';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(
    {
        reducer : RootReducers,
        middleware:()=> [sagaMiddleware,thunk]
    }
)
sagaMiddleware.run(productSaga);
export default store;