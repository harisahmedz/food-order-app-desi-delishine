import { createContext } from "react";


const CartContext = createContext({
    items:[],
    totalAmount:0,
    addItems : ()=>{},
    removeItem : ()=>{},
    clearCart:()=>{},
});

export default CartContext;