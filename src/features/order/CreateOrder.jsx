import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import Order from "./Order";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const {username,status: addressStatus,position, adderss} = useSelector((store)=> store.user)
  const isLoadingAddress = addressStatus === "loading"
  const dispatch = useDispatch()
  // if(cart.?length() === 0) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-10 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>      
      
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" defaultValue={adderss} required />
            <span className="absolute right-1">

            <Button type="small" handler={(e)=> {
              e.preventDefault()
              dispatch(fetchAddress())
              }}> Get Possition</Button>
            </span>

          </div>
        </div>

        <div className="mb-4 flex  gap-4 first-letter:items-center">
          <input className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-offset-2 focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        <div>
          <Button disabled={false} type="primary">Order now</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  console.log("order >", order);

  let newOrder = await createOrder(order);

  console.log("response ", newOrder);

  store.dispatch(clearItem())

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
