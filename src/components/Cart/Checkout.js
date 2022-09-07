import React from "react";
import useInput from "../../hooks/useInput";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    inputIsValid: nameIsValid,
    inputIsInvalid: nameIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredStreet,
    inputIsValid: streetIsValid,
    inputIsInvalid: streetIsInvalid,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredPostalCode,
    inputIsValid: postalCodeIsValid,
    inputIsInvalid: postalCodeIsInvalid,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim().length === 5);

  const {
    enteredValue: enteredCity,
    inputIsValid: cityIsValid,
    inputIsInvalid: cityIsInvalid,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const userData = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };
    props.onConfirm(userData);

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = nameIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control} `;
  const streetClasses = streetIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control} `;
  const postalCodeClasses = postalCodeIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control} `;
  const cityClasses = cityIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control} `;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameIsInvalid && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetIsInvalid && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeIsInvalid && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityIsInvalid && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
