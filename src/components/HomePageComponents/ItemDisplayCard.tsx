import React from "react";
import { addItemToCart } from "../../fetches/AddItemToCart";
import { deleteItem } from "../../fetches/deleteItem";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./ItemDisplayCard.css";
export const ItemDisplayCard = ({
  id,
  name,
  description,
  image,
  category,
  price,
  posterName,
}: {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  posterName: string;
}) => {
  const {
    setOnDisplayItem,
    currentAccount,
    getPostedItems,
    getUserCartItems,
    userCartItems,
  } = useGamerdise();
  const displayItemInfo = {
    name,
    description,
    image,
    category,
    price,
    posterName,
  };

  const alreadyInCart = userCartItems
    .map((item) => item.postedItem.id)
    .includes(id);

  const currentButtonText = () => {
    if (!currentAccount) {
      return "Please Login To Buy";
    } else if (alreadyInCart) {
      return "Already In Cart";
    } else if (posterName === currentAccount.email) {
      return "Remove This Item";
    } else {
      return "Add To Cart";
    }
  };

  const isButtonDisabled = () => {
    if (!currentAccount) {
      return true;
    } else if (alreadyInCart) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="itemCardAllInfo">
      <div className="itemCardSeller">
        Seller: {currentAccount?.email === posterName ? "YOU" : posterName}
      </div>
      <div className="itemDisplayCard">
        <div
          className="clickableSection"
          onClick={() => setOnDisplayItem(displayItemInfo)}
        >
          <div className="itemImageWrapper">
            <img src={image} alt={name} />
          </div>
          <div className="cardCategory">{category}</div>
          <div className="cardName">{name}</div>
          <div className="cardPrice">
            {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
          </div>
        </div>
        <button
          className={`cardButton ${
            currentAccount?.email === posterName ? "remove" : ""
          }`}
          disabled={isButtonDisabled()}
          data-itemid={id}
          onClick={async (e) => {
            currentAccount?.email === posterName
              ? await deleteItem({
                  itemId: Number(
                    (e.target as HTMLButtonElement).dataset.itemid
                  ),
                }).then(() => getPostedItems())
              : await addItemToCart({
                  itemId: Number(
                    (e.target as HTMLButtonElement).dataset.itemid
                  ),
                }).then(() => {
                  getPostedItems();
                  getUserCartItems();
                });
          }}
        >
          {currentButtonText()}
        </button>
      </div>
    </div>
  );
};
