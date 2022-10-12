import { GET_CART_DATA ,ADD_TO_CART, REMOVE_FROM_CART , UPDATE_ITEM_QTY, CLEAR_CART, GET_PRODUCTS_DATA, GET_PRODUCTS_DATA_BY_SEARCH} from "./Constants";

const initialValuesCart = {
  cart : [],
};

const initialValuesProduct = {
  products : [],
}
export function cartReducer(state = initialValuesCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      
      return {
        cart : [...state.cart , action.payload]
      };

    case REMOVE_FROM_CART:{
      return {
        cart : state.cart.filter(elem => elem.id !== action.payload.id)
      };
    }

    case CLEAR_CART:
      return {
        cart:[]
      };

    case GET_CART_DATA:
        return{
          cart : action.payload
        }
    case UPDATE_ITEM_QTY :
      let newCart=[...state.cart]
      let index=state.cart.findIndex(ele=>ele.id===action.payload.id)
      newCart[index].quantity=action.payload.qty
      return {
        cart: [...newCart]
    }
    default:
      return state;
  }
}

export function productReducer(state= initialValuesProduct ,action){
  switch(action.type){
    case 'GET_PRODUCTS_DATA':
      console.warn("Get Products Data Reducer Called")
      return{
        products : [...action.payload]
      }
    case GET_PRODUCTS_DATA_BY_SEARCH:
      return{
        products : [...action.payload]
      }
    default :
    return state
  }
}