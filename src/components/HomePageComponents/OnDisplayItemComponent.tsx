import React, { FC } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./OnDisplayItemComponent.css";

export const OnDisplayItemComponent = () => {
  const { onDisplayItem } = useGamerdise();
  if (!onDisplayItem) {
    return null;
  }
  const { name, category, image, description, price, posterName } =
    onDisplayItem;
  const infoTable = [
    { label: "Name:", value: name },
    { label: "Category:", value: category },
    { label: "Description:", value: description },
    { label: "Price:", value: `$${price}` },
    { label: "Posted By:", value: posterName },
  ];

  return (
    <div className="onClickDisplayItem">
      <div className="displayImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="infoTable">
        {infoTable.map((item) => (
          <div key={item.label} className="displayImageNameSection">
            <div className="pusher onDisplayItemLabel">{item.label}</div>
            <div className="onDisplayItemValue">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
