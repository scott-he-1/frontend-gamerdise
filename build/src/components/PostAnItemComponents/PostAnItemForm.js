var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { PostAnItemInputBase } from "./PostAnItemInputBase";
import "./PostAnItemForm.css";
import { postItem } from "../../fetches/postItem";
var INIT_POST_ITEM_INPUTS = {
    name: "",
    description: "",
    category: "accessory",
    price: 0,
    image: "",
};
export var PostAnItemForm = function () {
    var getPostedItems = useGamerdise().getPostedItems;
    var _a = useState(INIT_POST_ITEM_INPUTS), formInputs = _a[0], setFormInputs = _a[1];
    var _b = useState({}), errorM = _b[0], setErrorM = _b[1];
    var updateInputFields = function (e) {
        setFormInputs(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[e.target.name] = e.target
                .value, _a)));
        });
    };
    var categoriesList = [
        "accessory",
        "apparel",
        "food",
        "game",
        "prop",
        "electronic",
    ];
    var submitItem = function (e) {
        e.preventDefault();
        var allClear = true;
        var name = formInputs.name, description = formInputs.description, category = formInputs.category, price = formInputs.price, image = formInputs.image;
        Object.keys(formInputs).forEach(function (input) {
            var errorText;
            switch (input) {
                case "name":
                    errorText = name.length <= 0 ? "Please add a name" : "";
                    setErrorM(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(input, "Error")] = errorText, _a)));
                    });
                    if (errorText !== "") {
                        allClear = false;
                    }
                    break;
                case "description":
                    errorText =
                        description.length <= 0
                            ? "Please add a description"
                            : "";
                    setErrorM(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(input, "Error")] = errorText, _a)));
                    });
                    if (errorText !== "") {
                        allClear = false;
                    }
                    break;
                case "price":
                    if (String(price).length <= 0) {
                        errorText = "Please enter a value";
                    }
                    else if (!String(price).match(/^[0-9]{1,}(.?[0-9]{0,2})$/g)) {
                        errorText = "Please enter a valid value";
                    }
                    else {
                        errorText = "";
                    }
                    setErrorM(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(input, "Error")] = errorText, _a)));
                    });
                    if (errorText !== "") {
                        allClear = false;
                    }
                    break;
                case "image":
                    errorText =
                        image.length <= 0
                            ? "Please enter an image address"
                            : "";
                    setErrorM(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(input, "Error")] = errorText, _a)));
                    });
                    if (errorText !== "") {
                        allClear = false;
                    }
                default:
                    break;
            }
        });
        if (allClear) {
            var item = {
                name: String(name),
                description: String(description),
                image: String(image),
                category: String(category),
                price: Number(price),
            };
            postItem(item)
                .then(function () {
                setFormInputs(INIT_POST_ITEM_INPUTS);
                getPostedItems();
            })
                .catch(function (e) { return console.error(e); });
        }
    };
    var formFields = [
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
            specialSymbol: React.createElement(FontAwesomeIcon, { icon: faDollarSign }),
        },
        { label: "Image Address", name: "image", type: "text" },
    ];
    return (React.createElement("div", { className: "postYourItemFormContainer" },
        React.createElement("div", { className: "header" }, "Sell An Item Form"),
        React.createElement("form", { className: "postYourItemForm", onSubmit: submitItem },
            formFields.map(function (field) { return (React.createElement(PostAnItemInputBase, { key: field.name, name: field.name, label: field.label, type: field.type, value: formInputs[field.name], selectOptions: field.selectOptions && field.selectOptions, specialSymbol: field.specialSymbol && field.specialSymbol, updateInputFields: updateInputFields, errorM: errorM["".concat(field.name, "Error")] &&
                    errorM["".concat(field.name, "Error")].length > 0
                    ? errorM["".concat(field.name, "Error")]
                    : null })); }),
            React.createElement("button", { className: "postItemButton" }, "Sell Your Item!"))));
};
