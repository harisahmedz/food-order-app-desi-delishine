import { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

import CartContext from "../../Store/cartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();

  const addtoCartHandler = (item) => {
    cartCtx.addItems({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price,
    });
  };
  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  useEffect(() => {
    if (cartCtx.items.length <= 0) {
      setCheckout(false);
    }
  }, [cartCtx.items.length]);

  const OrderHandler = (customerInfo) => {
    console.log(customerInfo);
    const requestConfiq = {
      url: "Orders.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        CustomerName: customerInfo.name,
        postalCode: customerInfo.postalCode,
        phoneNo: customerInfo.phoneNo,
        altPhoneNo: customerInfo.altPhoneNo,
        deliveryAddress: customerInfo.deliveryAddress,
        deliveryInstrction: customerInfo.deliveryInstrction,
        orderedFood: cartCtx.items,
        TotalBill: cartCtx.totalAmount,
      },
    };
    const applyData  =(data)=>{
      console.log(data)
    }
    sendRequest(requestConfiq, applyData);
    if (!isLoading && !error) {
      setIsSubmit(true);
      cartCtx.clearCart();
    }
  };
  const cartClass = !isCheckout
    ? `${classes["cart-items"]}`
    : `${classes["cart-items"]} ${classes.cartHeight}`;
  const OrderButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>

      {cartCtx.items.length > 0 && (
        <button
          className={classes.button}
          onClick={() => {
            setCheckout(true);
          }}
        >
          Order
        </button>
      )}
    </div>
  );
  const totalAmount = (
    <div className={classes.actions}>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
  const cartItemsContent = (
    <ul className={cartClass}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeFromCartHandler.bind(null, item.id)}
          onAdd={addtoCartHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const CheckoutForm = isCheckout && cartCtx.items.length > 0 && (
    <Checkout onCancel={props.onClose} onCheckout={OrderHandler} />
  );
  return (
    <>
      <Modal onClose={props.onClose}>
        {(!isLoading && !isSubmit && !error) && cartItemsContent}
        {(!isLoading && !isSubmit && !error) && totalAmount}
        {(!isLoading && !isSubmit && !error) && !isCheckout && OrderButton}
        {(!isLoading && !isSubmit && !error) && CheckoutForm}
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {(!isLoading && !error) && (isSubmit && (
          <div className={classes.text}>
            <h2>Succefully sent the order!</h2>
            <p>We Will Call You to Confirm The Order.</p>
          </div>)
        )}
      </Modal>
    </>
  );
};

export default Cart;
