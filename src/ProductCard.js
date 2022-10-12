import "./ProductCard.css";
import { MdDeleteOutline } from "react-icons/md";

import { useEffect, useState } from "react";
import { removeFromCart, updateItemQty } from "./redux/Actions";
import { useDispatch } from "react-redux";

const ProductCard = ({ id, type, brand, model, quantity, price, index }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  function updateQuantity(type) {
    if (type === "-") {
      if (qty > 1) dispatch(updateItemQty(id, qty - 1));
    } else {
      if (qty < 3) dispatch(updateItemQty(id, qty + 1));
    }
  }

  return (
    <div className="productCardContainer">
      <span className="product">{index + 1}</span>
      <span className="product">{type}</span>
      <span className="product">{brand}</span>
      <span className="product">{model}</span>
      <span className="product">{price}</span>

      <div>
        <button onClick={() => updateQuantity("-")}> - </button>
        <input
          className="itmQuantity"
          type={"text"}
          readOnly={true}
          onChange={(e) => setQty(e.target.value)}
          value={qty}
        />
        <button onClick={() => updateQuantity("+")}> + </button>
      </div>
      <MdDeleteOutline
        className="btnRemove"
        onClick={() => {
          dispatch(removeFromCart(id));
        }}
      />
    </div>
  );
};
export default ProductCard;