import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnAnimated, setButtonAnimated] = useState(false);
  const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ""}`;

  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((prevNumber, item) => {
    return prevNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonAnimated(true);
    const timer = setTimeout(() => {
      setButtonAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
