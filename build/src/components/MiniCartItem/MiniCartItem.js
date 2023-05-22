import "./MiniCartItem.css";
import React from "react";
export var MiniCartItem = function (_a) {
    var name = _a.name, image = _a.image, price = _a.price;
    return (React.createElement("div", { className: "miniCartItem" },
        React.createElement("div", { className: "miniCartImageWrapper" },
            React.createElement("img", { src: image, alt: name })),
        React.createElement("div", { className: "miniCartItemInfo" },
            React.createElement("div", null, name),
            React.createElement("div", null,
                "$",
                price.toFixed(2)))));
};
