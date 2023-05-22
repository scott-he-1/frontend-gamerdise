import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteCartItem } from "../../fetches/deleteCartItem";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./CheckoutItem.css";
export var CheckoutItem = function (_a) {
    var name = _a.name, image = _a.image, category = _a.category, price = _a.price, itemId = _a.itemId;
    var _b = useGamerdise(), getPostedItems = _b.getPostedItems, getUserCartItems = _b.getUserCartItems;
    return (React.createElement("div", { className: "checkoutItem" },
        React.createElement(FontAwesomeIcon, { icon: faCircleXmark, onClick: function () {
                return deleteCartItem({
                    itemId: itemId,
                }).then(function () {
                    getPostedItems();
                    getUserCartItems();
                });
            } }),
        React.createElement("div", { className: "checkoutItemImageWrapper" },
            React.createElement("img", { src: image, alt: name })),
        React.createElement("div", { className: "checkoutItemInfo" },
            React.createElement("div", { className: "checkoutInfoCategory" }, category),
            React.createElement("div", { className: "checkoutInfoName" }, name),
            React.createElement("div", { className: "checkoutInfoPrice" },
                "$",
                price.toFixed(2)))));
};
