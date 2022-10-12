import { put, takeEvery } from "redux-saga/effects";
import { PRODUCTS_BASE_URL, GET_PRODUCTS_DATA, GET_PRODUCTS_DATA_BY_SEARCH } from "./Constants";
import axios from "axios";



function* productSaga() { // SAGA WATACHER FUNCTION
  yield takeEvery('GET_PRODUCTS_DATA_SAGA', getProductsData); //executed by SAGA WATCHER
  yield takeEvery('GET_PRODUCTS_DATA_BY_SEARCH_SAGA',getProductDataBySearch);
}

function* getProductsData() {
    let response = yield axios.get(PRODUCTS_BASE_URL);
    response = yield response.data;
    console.log("SAGA Function Called");
    yield put({type: GET_PRODUCTS_DATA , payload: response});
}

function* getProductDataBySearch(data){
    let response=  yield axios.get(PRODUCTS_BASE_URL + `?q=${data.payload}`)
         response = yield response.data
           yield put({type: GET_PRODUCTS_DATA_BY_SEARCH, payload: response})
}

export default productSaga;