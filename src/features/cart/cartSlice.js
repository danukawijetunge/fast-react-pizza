import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart : [
        {
            pizzaId:12,
            name: 'Mediterranean',
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32
        }
    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem:{
            prepare(pizzaObj){

                return {
                    payload : {
                       pizzaId : pizzaObj.id,
                       name: pizzaObj.name,
                       unitPrice: pizzaObj.unitPrice,
                       quantity: 1,
                       totalPrice: pizzaObj.unitPrice * 1
                    }
                }
            },
            reducer(state, action) {
                // action.payload is newItem
                state.cart.push(action.payload)
            }
        },
        deleteItem(state, action){
            //action.payload is pizzaId
            state.cart = state.cart.filter((item)=> item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action){
            let item = state.cart.find((item)=> item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action){
            let item = state.cart.find((item)=> item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0 ) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearItem(state, action){
            state.cart = []
        }
    }
})

export default cartSlice.reducer;
export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearItem} = cartSlice.actions;

export const getNoOfPizzas = (store) => store.cart.cart.reduce((act,item)=> act + item.quantity,0)

export const getGrandTotal = (store) => store.cart.cart.reduce((act, item) => act + item.totalPrice,0)

export const getCart = (store)=> store.cart.cart;