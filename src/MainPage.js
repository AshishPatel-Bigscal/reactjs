import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { MdShoppingCart ,MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartData,
  addToCart,
  clearCart,
  getProductsData,
  getProductsDataBySearch,
} from "./redux/Actions";
import ProductCard from "./ProductCard";

const MainPage = () => {
  const initialValues = {
    id: "",
    type: "",
    brand: "",
    model: "",
    quantity: 1,
    price: "",
  };

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer.cart);
  const productsData = useSelector((state) => state.productReducer.products);

  const [product, setProduct] = useState(initialValues);
  const [flag , setFlag] = useState(false);
  const [cartVisible , setCartvisible] = useState(false);
  const [search , setSearch] = useState("");

  // function handleChange(e) {
  //   // setProduct({ ...product, [e.target.name]: e.target.value });
  // }

  useEffect(() => {
    dispatch(getProductsData());
    dispatch(getCartData())
  }, [dispatch]);


  function dispatchAddToCart(index) {
    setProduct({ ...product, ...productsData[index] });
    setFlag(true);
  }

  useEffect(()=>{    
    if(flag)dispatch(addToCart(product));
  },[product,dispatch,flag])

  function dispatchClearCart() {
    dispatch(clearCart(cartData?.map((data) => data?.id)));
  }

  return (
    <div className="homeContainer">
      <div className="searchBoxContainer">
        <input className="searchBox" placeholder="search products..." 
        type="text" onChange={(e)=> setSearch(e.target.value)} />
        <MdSearch className="btnSearch" onClick={()=> dispatch(getProductsDataBySearch(search))} />
      </div>
      <div className="productContainer">
        {productsData.map((itm, index) => {
          return (
            <div className="productItem" key={itm.id}>
              {/* <span>{itm.id}</span> */}
              <span>{itm.type}</span>
              <span>{itm.brand}</span>
              <span>{itm.model}</span>
              <span>{itm.price}</span>
              <div>
                <button
                  className="btn"
                  onClick={() => dispatchAddToCart(index)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="inputContainer">
        <input
          type="text"
          name="type"
          placeholder="EnterType ..."
          onChange={(e) => handleChange(e)}
          value={product.type}
        />
        <input
          type="text"
          name="brand"
          placeholder="Enter Brand ..."
          onChange={(e) => handleChange(e)}
          value={product.brand}
        />
        <input
          type="text"
          name="model"
          placeholder="Enter Model ..."
          onChange={(e) => handleChange(e)}
          value={product.model}
        />
        <input
          type="text"
          name="price"
          placeholder="Enter Price ..."
          onChange={(e) => handleChange(e)}
          value={product.price}
        />
      </div> */}

      <div className="btnContainer">
        <button className="btn btnCart" id="showCartBtn" 
          onClick={() => setCartvisible(!cartVisible)}>
          {cartVisible?"Hide" : "Show"} <MdShoppingCart className="iconCart" />
        </button>
        

        <button className="btn" onClick={() => dispatchClearCart()}>
          Clear Cart
        </button>
      </div>

      {cartVisible?
      <div className="cartContainer">
        <h3>Cart Detail</h3>
        <div className="cartData">
        {cartData?.map((itm, index) => {
          return (
            <div key={index}>
              <ProductCard index={index} {...itm} />
            </div>
          );
        })}
        </div>
        
      </div> : ""}
    </div>
  );
};
export default MainPage;