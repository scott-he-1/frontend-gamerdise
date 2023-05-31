import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./OnDisplayItemComponent.css";
export var OnDisplayItemComponent = function () {
    var onDisplayItem = useGamerdise().onDisplayItem;
    if (!onDisplayItem) {
        return null;
    }
    var name = onDisplayItem.name, category = onDisplayItem.category, image = onDisplayItem.image, description = onDisplayItem.description, price = onDisplayItem.price, posterName = onDisplayItem.posterName;
    var infoTable = [
        { label: "Name:", value: name },
        { label: "Category:", value: category },
        { label: "Description:", value: description },
        { label: "Price:", value: "$".concat(price) },
        { label: "Posted By:", value: posterName },
    ];
    return (React.createElement("div", { className: "onClickDisplayItem" },
        React.createElement("div", { className: "displayImageWrapper" },
            React.createElement("img", { src: image, alt: name })),
        React.createElement("div", { className: "infoTable" }, infoTable.map(function (item) { return (React.createElement("div", { key: item.label, className: "displayImageNameSection" },
            React.createElement("div", { className: "pusher onDisplayItemLabel" }, item.label),
            React.createElement("div", { className: "onDisplayItemValue" }, item.value))); }))));
};
