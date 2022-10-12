import { combineReducers } from "redux";
import { cartReducer ,productReducer } from "./Reducers";

const RootReducers = combineReducers({
    cartReducer,
    productReducer
})

export  default RootReducers;