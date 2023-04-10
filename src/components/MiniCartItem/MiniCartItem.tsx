import "./MiniCartItem.css";
import React from "react";

export const MiniCartItem = ({
  name,
  image,
  price,
}: {
  name: string;
  image: string;
  price: number;
}) => {
  return (
    <div className="miniCartItem">
      <div className="miniCartImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="miniCartItemInfo">
        <div>{name}</div>
        <div>${price.toFixed(2)}</div>
      </div>
    </div>
  );
};
