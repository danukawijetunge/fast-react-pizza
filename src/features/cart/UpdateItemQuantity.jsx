import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice"

function UpdateItemQuantity({pizzaId, currentQuantity}) {
    const dispatch = useDispatch()

    function handleIncreaseQuantity(){
       dispatch(increaseItemQuantity(pizzaId))
    }
    function handleDecreaseQuantity(){
        dispatch(decreaseItemQuantity(pizzaId))
    }
//
    return (
        <div>
            <Button type="small" handler={handleIncreaseQuantity}> + </Button>
            {currentQuantity}
            <Button type="small" handler={handleDecreaseQuantity} > - </Button>
        </div>
    )
}

export default UpdateItemQuantity
