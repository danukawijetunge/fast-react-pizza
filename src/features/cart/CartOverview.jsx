import { act } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNoOfPizzas,getGrandTotal } from "./cartSlice";

function CartOverview() {

  const noPizza = useSelector((store)=> getNoOfPizzas(store))
  const grandTotal = useSelector((store) => getGrandTotal(store))
  

  console.log("noPizza "+ noPizza +" and " + "GrandTotal " + grandTotal)

  return (
    <div className="flex items-center justify-between bg-stone-800 uppercase text-stone-300 md:text-base px-4 py-4 sm:px-6 text-sm" >
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{noPizza} pizzas</span>
        <span>{grandTotal}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
