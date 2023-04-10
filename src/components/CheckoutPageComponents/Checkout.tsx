import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import {
  ErrorMessageType,
  UserAddressInfoType,
  UserCardInfoType,
} from "../../types/types";
import { AddressInfoInputBase } from "./AddressInfoInputBase";
import { CardInfoInputBase } from "./CardInfoInputBase";
import { CheckoutItem } from "./CheckoutItem";
import {
  cardExpirationValidation,
  cardHolderNameValidation,
  cardNumberValidation,
  cvvValidation,
  postcodeValidation,
  textValidation,
} from "./Validations";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../fetches/deleteItem";

export const Checkout = () => {
  const {
    userCartItems,
    getPostedItems,
    getUserCartItems,
    getUserNotifications,
  } = useGamerdise();
  const navigate = useNavigate();
  const [userCardInfo, setUserCardInfo] = useState<UserCardInfoType>({
    holderName: "",
    cardNumber: "",
    expiryMonth: "01",
    expiryYear: String(new Date().getFullYear()),
    cvv: "",
  });
  const [userAddressInfo, setUserAddressInfo] = useState<UserAddressInfoType>({
    name: "",
    surname: "",
    streetAddress: "",
    city: "",
    postcode: "",
    country: "United States",
    state: "",
  });
  const [errorM, setErrorM] = useState<ErrorMessageType>({});

  const userCartItemsTotal = userCartItems.reduce(
    (sum, acc) => sum + acc.postedItem.price,
    0
  );
  const shippingAndHandlingAmount =
    userCartItemsTotal <= 100 && userCartItemsTotal !== 0 ? 19.99 : 0;
  const taxAmount = userCartItemsTotal * 0.08875;
  const grandTotalAmount =
    userCartItemsTotal + shippingAndHandlingAmount + taxAmount;

  const onPurchaseItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { holderName, cardNumber, expiryMonth, expiryYear, cvv } =
      userCardInfo;
    const { name, surname, streetAddress, city, postcode, state, country } =
      userAddressInfo;

    let allClear = true;
    Object.keys(userCardInfo).forEach((key) => {
      let errorText: string;
      switch (key) {
        case "holderName":
          errorText = cardHolderNameValidation(holderName);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "cardNumber":
          errorText = cardNumberValidation(cardNumber);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "expirationDate":
          errorText = cardExpirationValidation(expiryMonth, expiryYear);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "cvv":
          errorText = cvvValidation(cvv);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });
    Object.keys(userAddressInfo).forEach((key) => {
      let errorText: string;
      switch (key) {
        case "name":
          errorText = textValidation(name);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "surname":
          errorText = textValidation(surname);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "state":
          errorText = textValidation(state);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "streetAddress":
          errorText = textValidation(streetAddress);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "city":
          errorText = textValidation(city);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "postcode":
          errorText = postcodeValidation(postcode);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        default:
          break;
      }
    });
    let errorText = cardExpirationValidation(expiryMonth, expiryYear);
    setErrorM((prevState) => ({
      ...prevState,
      [`expiryMonthError`]: errorText,
    }));
    if (errorText !== "") {
      allClear = false;
    }
    if (allClear) {
      for (const item of userCartItems) {
        await deleteItem({ itemId: item.postedItem.id });
      }
      getPostedItems();
      getUserCartItems();
      getUserNotifications();
      navigate("/ConfirmationPage");
    }
  };

  const updateUserCartInfoInputs = (e: React.SyntheticEvent) => {
    if ((e.target as HTMLInputElement).name === "cardNumber") {
      let mask = (e.target as HTMLInputElement).value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp("[0-9]{1,4}", "g"))!.join(" ");
      }
      setUserCardInfo((prevState) => ({
        ...prevState,
        [`${(e.target as HTMLInputElement).name}`]: mask,
      }));
    } else if ((e.target as HTMLInputElement).name === "cvv") {
      let mask = (e.target as HTMLInputElement).value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp("[0-9]{1,3}", "g"))!.join(" ");
      }
      setUserCardInfo((prevState) => ({
        ...prevState,
        [`${(e.target as HTMLInputElement).name}`]: mask,
      }));
    } else if (
      (e.target as HTMLInputElement).name === "expiryMonth" ||
      (e.target as HTMLInputElement).name === "expiryYear"
    ) {
      setUserCardInfo((prevState) => ({
        ...prevState,
        [`${(e.target as HTMLInputElement).name}`]: (
          e.target as HTMLInputElement
        ).value,
      }));
    } else {
      setUserCardInfo((prevState) => ({
        ...prevState,
        [`${(e.target as HTMLInputElement).name}`]: (
          e.target as HTMLInputElement
        ).value,
      }));
    }
  };

  const updateAddressInfoInputs = (e: React.SyntheticEvent) => {
    setUserAddressInfo((prevState) => ({
      ...prevState,
      [`${(e.target as HTMLInputElement).name}`]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const summaryFields = [
    {
      label: "Subtotal:",
      name: "subtotalAmount",
      value: userCartItemsTotal.toFixed(2),
    },
    {
      label: "Shipping and Handling:",
      name: "shippingAndHandlingAmount",
      value: shippingAndHandlingAmount.toFixed(2),
    },
    { label: "Tax:", name: "taxAmount", value: taxAmount.toFixed(2) },
    {
      label: "Grand Total:",
      name: "grandTotalAmount",
      value: grandTotalAmount.toFixed(2),
    },
  ];

  const addressInfoFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Street Address", name: "streetAddress", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "Postcode/Zipcode", name: "postcode", type: "text" },
    {
      label: "Country",
      name: "country",
      type: "select",
      selectOptions: ["United States", "Canada", "Mexico", "United Kingdom"],
    },
  ];

  const cardInfoFields = [
    { label: "Holder Name", name: "holderName", type: "text" },
    { label: "Card Number", name: "cardNumber", type: "text", maxLength: 19 },
    {
      label: "Expiration Date",
      name: "expiryMonth",
      type: "multiSelect",
      selects: [
        {
          label: "Month",
          name: "expiryMonth",
          type: "select",
          selectOptions: [...Array(12)].map((item, index) =>
            `${index + 1}`.length <= 1 ? `0${index + 1}` : index + 1
          ),
        },
        {
          label: "Year",
          name: "expiryYear",
          type: "select",
          selectOptions: [...Array(10)].map(
            (item, index) => new Date().getFullYear() + index
          ),
        },
      ],
    },
    { label: "CVV", name: "cvv", type: "text", maxLength: 3 },
  ];

  return (
    <div className="container checkoutPage">
      <div className="checkoutMainDisplay">
        <div className="userInfoSide">
          <div className="yourItemsSection">
            <h2>Your Items</h2>
            <div className="checkoutUserItems">
              {userCartItems.length > 0 ? (
                userCartItems.map((cartItem) => {
                  return (
                    <CheckoutItem
                      key={cartItem.postedItem.id}
                      name={cartItem.postedItem.name}
                      image={cartItem.postedItem.image}
                      category={cartItem.postedItem.category}
                      itemId={cartItem.postedItem.id}
                      price={cartItem.postedItem.price}
                    />
                  );
                })
              ) : (
                <div>No items in cart</div>
              )}
            </div>
          </div>
          <div className="addressSection">
            <h2 className="addressHeader">Billing Address</h2>
            <div className="addressInputFields">
              {addressInfoFields.map((field) => (
                <AddressInfoInputBase
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  selectOptions={
                    field.selectOptions ? field.selectOptions : null
                  }
                  value={
                    userAddressInfo[field.name] && userAddressInfo[field.name]
                  }
                  updateAddressInfoInputs={updateAddressInfoInputs}
                  errorM={
                    errorM[`${field.name}Error`] &&
                    errorM[`${field.name}Error`].length > 0
                      ? errorM[`${field.name}Error`]
                      : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="summarySectionSide">
          <div className="priceSummary">
            {summaryFields.map((field) => (
              <div
                key={field.name}
                className="priceSummaryField"
                data-name={field.name}
              >
                <div className={`pusher ${field.name}`}>{field.label}</div>
                <div className={field.name}>${field.value}</div>
              </div>
            ))}
          </div>
          <form className="userCardInfo" onSubmit={onPurchaseItem}>
            {cardInfoFields.map((field) => (
              <CardInfoInputBase
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                maxLength={field.maxLength ? field.maxLength : undefined}
                value={userCardInfo[field.name] && userCardInfo[field.name]}
                selects={field.selects && field.selects}
                updateUserCartInfoInputs={updateUserCartInfoInputs}
                errorM={
                  errorM[`${field.name}Error`] &&
                  errorM[`${field.name}Error`].length > 0
                    ? errorM[`${field.name}Error`]
                    : null
                }
              />
            ))}
            <button
              className="purchaseButton"
              disabled={userCartItems.length > 0 ? false : true}
            >
              Pay ${grandTotalAmount.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
