import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const checkoutHandler = () => {
    setShowCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-course-http-69006-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {cartHasItems && (
            <button className={classes.button} onClick={checkoutHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const submittingModalContent = <p>Sending your order..</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Your order has been sent to our chef!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && submittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
