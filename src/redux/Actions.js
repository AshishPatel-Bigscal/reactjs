import axios from "axios"
import {BASE_URL,PRODUCTS_BASE_URL,GET_PRODUCTS_DATA,GET_PRODUCTS_DATA_BY_SEARCH, GET_CART_DATA, ADD_TO_CART , REMOVE_FROM_CART , CLEAR_CART, UPDATE_ITEM_QTY  } from "./Constants"

// getProductsData using Action with THUNK middleware
// export function getProductsData(){
//         return async  (dispatch) =>{
//             try{
//              let response=  await axios.get(PRODUCTS_BASE_URL)
//              response = await response.data
//                 dispatch({type: GET_PRODUCTS_DATA, payload: response})
//             }catch(err){
//                 console.log("ERROR in ACTION : getProductData " + err)
//             }
//         }
// }

// getProductsData using Action with SAGA middleware
export function getProductsData(){
    console.log("ACTION CALLED")
    return{
        type: 'GET_PRODUCTS_DATA_SAGA' //this will be catched by SAGA watcher
    }
}

// Using Thunk
// export function getProductsDataBySearch(qry){
//     console.log(qry)
//     return  async (dispatch) =>{
//         try{
//          let response=  await axios.get(PRODUCTS_BASE_URL + `?q=${qry}`)
//          response = await response.data
//             dispatch({type: GET_PRODUCTS_DATA_BY_SEARCH, payload: response})
//         }catch(err){
//             console.log("ERROR in ACTION : getProductDataBySearch " + err)
//         }
//     }
// }

// Using Saga
export function getProductsDataBySearch(qry){
    return{
        type: 'GET_PRODUCTS_DATA_BY_SEARCH_SAGA',
        payload: qry
    }
}

export function getCartData(){
    
    return  async (dispatch) =>{
        try{
         let response=  await axios.get(BASE_URL)
         response = await response.data
            dispatch({type: GET_CART_DATA, payload: response})
        }catch(err){
            console.log("getCartData, Error " + err)
        }
    }
}
export function addToCart(data){
    return async(dispatch) => {
        try{
         await axios.post(BASE_URL , data)
            .then(resonse => dispatch({type:ADD_TO_CART , payload : resonse.data}))
        }catch(err){
            console.log("addToCart, Error " + err)
        }
    }
}
export function removeFromCart(id){
    
    return async (dispatch)=>{
        try{
            await axios.delete(BASE_URL + `/${id}`)
            dispatch({type: REMOVE_FROM_CART , payload : {id}})
        }catch(err){
            console.error(err)
        }
    }
}
export function clearCart(idArray){
    return async (dispatch)=>{
        try{
             idArray.forEach(async element => {
               await axios.delete(BASE_URL + `/${element}`)    
            });
            dispatch({type : CLEAR_CART})
        }catch(err){
            console.log(err)
        }
    }
}
export function updateItemQty(id,qty){
    const BASE_URL = "http://localhost:4000/cart";
    return async (dispatch)=>{
        await axios.patch(BASE_URL + `/${id}`,{"quantity" : qty})
        dispatch({type : UPDATE_ITEM_QTY , payload : {id,qty}})
    }
}