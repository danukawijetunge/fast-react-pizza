import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()

  const currentQuantity = useSelector(store => store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0)
  
  console.log("quantity " +currentQuantity)

  let isIntheCart = currentQuantity > 0;

  function handleAddtoCart(){
    dispatch(addItem(pizza))
  }

  return (
    <li className="flex gap-4 py-2" key={id}>
      <img src={imageUrl} alt={name}  className={`h-24 ${soldOut ? 'grayscale opacity-70': ''}`}/>
      <div className="flex flex-col flex-grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>}
          
          {isIntheCart ? <div><UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/><DeleteItem pizzaId={id}/></div> : <>
          {!soldOut ? 
          <>
          <Button type="small" handler={handleAddtoCart}>Add to cart</Button></> : <>
          </>}
        
          </>}

        </div>
      </div>
    </li>
  );
}

export default MenuItem;
