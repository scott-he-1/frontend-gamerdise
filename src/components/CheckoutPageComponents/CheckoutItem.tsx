import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteCartItem } from "../../fetches/deleteCartItem";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./CheckoutItem.css";

export const CheckoutItem = ({
  name,
  image,
  category,
  price,
  itemId,
}: {
  name: string;
  image: string;
  category: string;
  price: number;
  itemId: number;
}) => {
  const { getPostedItems, getUserCartItems } = useGamerdise();
  return (
    <div className="checkoutItem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() =>
          deleteCartItem({
            itemId,
          }).then(() => {
            getPostedItems();
            getUserCartItems();
          })
        }
      />
      <div className="checkoutItemImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="checkoutItemInfo">
        <div className="checkoutInfoCategory">{category}</div>
        <div className="checkoutInfoName">{name}</div>
        <div className="checkoutInfoPrice">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};
