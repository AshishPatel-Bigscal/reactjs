import "./Header.css"
import { useSelector } from 'react-redux'

const Header = () => {  
    const  cartData = useSelector(state=> state.cartReducer.cart);
    const totalItems = cartData?.length
    const totalPrice = cartData?.reduce((result , obj)=> result + (+obj.price*obj.quantity),0);


  return (
    <div className="container">
        <div className='header'>
                <span className='totalItem'>Total Item : {totalItems}</span>
                <span className='totalItem'>Cart Total : {totalPrice}</span>
        </div>
    </div>
  )
}
export default Header