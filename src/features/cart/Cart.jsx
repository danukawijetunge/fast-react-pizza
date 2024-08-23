import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import {clearItem, getCart} from '../cart/cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
  const cart = useSelector((store) => getCart(store));
  const userName = useSelector((store)=> store.user.username)
  const dispatch = useDispatch()

  function handleClearCart(){

    console.log('inside the handleClearCart')
    dispatch(clearItem())
  }

  if(!cart.length) return <EmptyCart/>
  
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="mt-3 divide=y divide-stone-600 border-b">
        {cart.map((item)=> <CartItem item={item} key={item.key}/>)}
      </ul>
      <div className="mt-6 space-x-4">
      <Button to="/order/new" >Order pizzas</Button>
      <Button type="secondary" handler={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
