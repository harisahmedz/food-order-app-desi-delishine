import useInput from "./../hooks/use-input";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: enteredPostalCodeHasError,
    valueChangeHandler: PostalCodeChangeHandler,
    inputBlurHandler: PostalCodeBlurHandler,
    reset: PostalCodeReset,
  } = useInput((value) => value.trim() !== "" && value.toString().length === 5);

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: enteredPhoneNumberHasError,
    valueChangeHandler: PhoneNumberChangeHandler,
    inputBlurHandler: PhoneNumberBlurHandler,
    reset: PhoneNumberReset,
  } = useInput(isEmpty);

  const {
    value: enteredALTphoneNumber,
    isValid: enteredALTphoneNumberIsValid,
    hasError: enteredALTphoneNumberHasError,
    valueChangeHandler: ALTphoneNumberChangeHandler,
    inputBlurHandler: ALTphoneNumberBlurHandler,
    reset: ALTphoneNumberReset,
  } = useInput(isEmpty);

  const {
    value: enteredDeliveryAddress,
    isValid: enteredDeliveryAddressIsValid,
    hasError: enteredDeliveryAddressHasError,
    valueChangeHandler: DeliveryAddressChangeHandler,
    inputBlurHandler: DeliveryAddressBlurHandler,
    reset: DeliveryAddressReset,
  } = useInput(isEmpty);

  const {
    value: enteredDeliveryNote,
    isValid: enteredDeliveryNoteIsValid,
    hasError: enteredDeliveryNoteHasError,
    valueChangeHandler: DeliveryNoteChangeHandler,
    inputBlurHandler: DeliveryNoteBlurHandler,
    reset: DeliveryNoteReset,
  } = useInput(isEmpty);
  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredPostalCodeIsValid &&
    enteredPhoneNumberIsValid &&
    enteredALTphoneNumberIsValid &&
    enteredDeliveryAddressIsValid &&
    enteredDeliveryNoteIsValid
  ) {
    formIsValid = true;
  }
  const submitformHandler = (event) => {
    event.preventDefault();
    if (
      !enteredNameIsValid ||
      !enteredPostalCodeIsValid ||
      !enteredPhoneNumberIsValid ||
      !enteredALTphoneNumberIsValid ||
      !enteredDeliveryAddressIsValid ||
      !enteredDeliveryNoteIsValid
    ) {
      return;
    }
     const customerData = {
      name: enteredName,
      postalCode:enteredPostalCode,
      phoneNo:enteredPhoneNumber,
      altPhoneNo:enteredALTphoneNumber,
      deliveryAddress:enteredDeliveryAddress,
      deliveryInstrction:enteredDeliveryNote,
    }
    props.onCheckout(customerData);
    PostalCodeReset();
    nameReset();
    PhoneNumberReset();
    ALTphoneNumberReset();
    DeliveryAddressReset();
    DeliveryNoteReset();
  };
  const nameClass = enteredNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl} `;

  const PostCodeClass = enteredPostalCodeHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;
  const PhoneNumberClass = enteredPhoneNumberHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const ALTphoneNumberClass = enteredALTphoneNumberHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const DeliveryAddressClass = enteredDeliveryAddressHasError
    ? `${classes.formControl} ${classes.singleLineInput} ${classes.invalid}`
    : `${classes.formControl} ${classes.singleLineInput}`;

  const DeliveryNoteClass = enteredDeliveryNoteHasError
    ? `${classes.formControl} ${classes.singleLineInput} ${classes.invalid}`
    : `${classes.formControl} ${classes.singleLineInput}`;
  return (
    <>
      <form onSubmit={submitformHandler}>
        <div className={classes.container}>
          <div className={nameClass}>
            <label>Full Name</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              placeholder="Example: Aleem Alam"
              minLength="3"
            />
            {enteredNameHasError && (
              <p className={classes["error-text"]}>Please Enter a Valid Name</p>
            )}
          </div>
          <div className={PostCodeClass}>
            <label>Postal Code</label>
            <input
              type="number"
              value={enteredPostalCode}
              onChange={PostalCodeChangeHandler}
              onBlur={PostalCodeBlurHandler}
              placeholder="Postal Code"
              minLength="5"
              maxLength="5"
            />
            {enteredPostalCodeHasError && (
              <p className={classes["error-text"]}>
                Please Enter a Correct Postal Code
              </p>
            )}
          </div>

          <div className={PhoneNumberClass}>
            <label>Phone No.</label>
            <input
              type="tel"
              value={enteredPhoneNumber}
              onChange={PhoneNumberChangeHandler}
              onBlur={PhoneNumberBlurHandler}
              pattern="[0-3]{2}[0-9]{2}-[0-9]{7}"
              placeholder="03XX-XXXXXXX"
            />
            {enteredPhoneNumberHasError && (
              <p className={classes["error-text"]}>
                Please Enter a Correct Phone No.
              </p>
            )}
          </div>

          <div className={ALTphoneNumberClass}>
            <label>Alternate Phone No.</label>
            <input
              type="tel"
              value={enteredALTphoneNumber}
              onChange={ALTphoneNumberChangeHandler}
              onBlur={ALTphoneNumberBlurHandler}
              pattern="[0-3]{2}[0-9]{2}-[0-9]{7}"
              placeholder="03XX-XXXXXXX"
            />
            {enteredALTphoneNumberHasError && (
              <p className={classes["error-text"]}>
                Please Enter a Correct AlT Phone No.
              </p>
            )}
          </div>

          <div className={DeliveryAddressClass}>
            <label>Delivery Address</label>
            <input
              type="text"
              value={enteredDeliveryAddress}
              onChange={DeliveryAddressChangeHandler}
              onBlur={DeliveryAddressBlurHandler}
              placeholder="Enter Your Complete Address"
            />
            {enteredDeliveryAddressHasError && (
              <p className={classes["error-text"]}>
                Please Enter a Correct Address.
              </p>
            )}
          </div>

          <div className={DeliveryNoteClass}>
            <label>Delivery Instructions</label>
            <input
              type="text"
              value={enteredDeliveryNote}
              onChange={DeliveryNoteChangeHandler}
              onBlur={DeliveryNoteBlurHandler}
              placeholder="Enter any instructions or note to rider"
            />
            {enteredDeliveryNoteHasError && (
              <p className={classes["error-text"]}>Cannot Leave Empty!</p>
            )}
          </div>

        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes["button--alt"]}
            onClick={props.onCancel}
          >
            Cancel
          </button>
          {formIsValid && <button className={classes.button}>Confirm</button>}
        </div>
      </form>
    </>
  );
};

export default Checkout;
