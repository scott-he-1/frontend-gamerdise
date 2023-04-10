import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { ErrorMessageType, PostAnItemTypes } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { PostAnItemInputBase } from "./PostAnItemInputBase";
import "./PostAnItemForm.css";
import { postItem } from "../../fetches/postItem";

const INIT_POST_ITEM_INPUTS = {
  name: "",
  description: "",
  category: "accessory",
  price: 0,
  image: "",
};

export const PostAnItemForm = () => {
  const { getPostedItems } = useGamerdise();
  const [formInputs, setFormInputs] = useState<PostAnItemTypes>(
    INIT_POST_ITEM_INPUTS
  );
  const [errorM, setErrorM] = useState<ErrorMessageType>({});
  const updateInputFields = (e: React.SyntheticEvent) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const categoriesList = [
    "accessory",
    "apparel",
    "food",
    "game",
    "prop",
    "electronic",
  ];

  const submitItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let allClear = true;
    const { name, description, category, price, image } = formInputs;
    Object.keys(formInputs).forEach((input) => {
      let errorText: string;
      switch (input) {
        case "name":
          errorText = (name as string).length <= 0 ? "Please add a name" : "";
          setErrorM((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "description":
          errorText =
            (description as string).length <= 0
              ? "Please add a description"
              : "";
          setErrorM((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "price":
          if (String(price).length <= 0) {
            errorText = "Please enter a value";
          } else if (!String(price).match(/^[0-9]{1,}(.?[0-9]{0,2})$/g)) {
            errorText = "Please enter a valid value";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "image":
          errorText =
            (image as string).length <= 0
              ? "Please enter an image address"
              : "";
          setErrorM((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });

    if (allClear) {
      let item = {
        name: String(name),
        description: String(description),
        image: String(image),
        category: String(category),
        price: Number(price),
      };
      postItem(item)
        .then(() => {
          setFormInputs(INIT_POST_ITEM_INPUTS);
          getPostedItems();
        })
        .catch((e) => console.error(e));
    }
  };

  const formFields = [
    { label: "Name Of Item", name: "name", type: "text" },
    {
      label: "Description",
      name: "description",
      type: "textArea",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      selectOptions: categoriesList,
    },
    {
      label: "Price",
      name: "price",
      type: "text",
      specialSymbol: <FontAwesomeIcon icon={faDollarSign} />,
    },
    { label: "Image Address", name: "image", type: "text" },
  ];

  return (
    <div className="postYourItemFormContainer">
      <div className="header">Sell An Item Form</div>
      <form className="postYourItemForm" onSubmit={submitItem}>
        {formFields.map((field) => (
          <PostAnItemInputBase
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formInputs[field.name]}
            selectOptions={field.selectOptions && field.selectOptions}
            specialSymbol={field.specialSymbol && field.specialSymbol}
            updateInputFields={updateInputFields}
            errorM={
              errorM[`${field.name}Error`] &&
              errorM[`${field.name}Error`].length > 0
                ? errorM[`${field.name}Error`]
                : null
            }
          />
        ))}
        <button className="postItemButton">Sell Your Item!</button>
      </form>
    </div>
  );
};
