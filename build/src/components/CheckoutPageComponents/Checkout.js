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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { AddressInfoInputBase } from "./AddressInfoInputBase";
import { CardInfoInputBase } from "./CardInfoInputBase";
import { CheckoutItem } from "./CheckoutItem";
import { cardExpirationValidation, cardHolderNameValidation, cardNumberValidation, cvvValidation, postcodeValidation, textValidation, } from "./Validations";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../fetches/deleteItem";
export var Checkout = function () {
    var _a = useGamerdise(), userCartItems = _a.userCartItems, getPostedItems = _a.getPostedItems, getUserCartItems = _a.getUserCartItems, getUserNotifications = _a.getUserNotifications;
    var navigate = useNavigate();
    var _b = useState({
        holderName: "",
        cardNumber: "",
        expiryMonth: "01",
        expiryYear: String(new Date().getFullYear()),
        cvv: "",
    }), userCardInfo = _b[0], setUserCardInfo = _b[1];
    var _c = useState({
        name: "",
        surname: "",
        streetAddress: "",
        city: "",
        postcode: "",
        country: "United States",
        state: "",
    }), userAddressInfo = _c[0], setUserAddressInfo = _c[1];
    var _d = useState({}), errorM = _d[0], setErrorM = _d[1];
    var userCartItemsTotal = userCartItems.reduce(function (sum, acc) { return sum + acc.postedItem.price; }, 0);
    var shippingAndHandlingAmount = userCartItemsTotal <= 100 && userCartItemsTotal !== 0 ? 19.99 : 0;
    var taxAmount = userCartItemsTotal * 0.08875;
    var grandTotalAmount = userCartItemsTotal + shippingAndHandlingAmount + taxAmount;
    var onPurchaseItem = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var holderName, cardNumber, expiryMonth, expiryYear, cvv, name, surname, streetAddress, city, postcode, state, country, allClear, errorText, _i, userCartItems_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    holderName = userCardInfo.holderName, cardNumber = userCardInfo.cardNumber, expiryMonth = userCardInfo.expiryMonth, expiryYear = userCardInfo.expiryYear, cvv = userCardInfo.cvv;
                    name = userAddressInfo.name, surname = userAddressInfo.surname, streetAddress = userAddressInfo.streetAddress, city = userAddressInfo.city, postcode = userAddressInfo.postcode, state = userAddressInfo.state, country = userAddressInfo.country;
                    allClear = true;
                    Object.keys(userCardInfo).forEach(function (key) {
                        var errorText;
                        switch (key) {
                            case "holderName":
                                errorText = cardHolderNameValidation(holderName);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "cardNumber":
                                errorText = cardNumberValidation(cardNumber);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "expirationDate":
                                errorText = cardExpirationValidation(expiryMonth, expiryYear);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "cvv":
                                errorText = cvvValidation(cvv);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                            default:
                                break;
                        }
                    });
                    Object.keys(userAddressInfo).forEach(function (key) {
                        var errorText;
                        switch (key) {
                            case "name":
                                errorText = textValidation(name);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "surname":
                                errorText = textValidation(surname);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "state":
                                errorText = textValidation(state);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "streetAddress":
                                errorText = textValidation(streetAddress);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "city":
                                errorText = textValidation(city);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "postcode":
                                errorText = postcodeValidation(postcode);
                                setErrorM(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(key, "Error")] = errorText, _a)));
                                });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    errorText = cardExpirationValidation(expiryMonth, expiryYear);
                    setErrorM(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a["expiryMonthError"] = errorText, _a)));
                    });
                    if (errorText !== "") {
                        allClear = false;
                    }
                    if (!allClear) return [3 /*break*/, 5];
                    _i = 0, userCartItems_1 = userCartItems;
                    _a.label = 1;
                case 1:
                    if (!(_i < userCartItems_1.length)) return [3 /*break*/, 4];
                    item = userCartItems_1[_i];
                    return [4 /*yield*/, deleteItem({ itemId: item.postedItem.id })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    getPostedItems();
                    getUserCartItems();
                    getUserNotifications();
                    navigate("/ConfirmationPage");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var updateUserCartInfoInputs = function (e) {
        if (e.target.name === "cardNumber") {
            var mask_1 = e.target.value.split(" ").join("");
            if (mask_1.length) {
                mask_1 = mask_1.match(new RegExp("[0-9]{1,4}", "g")).join(" ");
            }
            setUserCardInfo(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = mask_1, _a)));
            });
        }
        else if (e.target.name === "cvv") {
            var mask_2 = e.target.value.split(" ").join("");
            if (mask_2.length) {
                mask_2 = mask_2.match(new RegExp("[0-9]{1,3}", "g")).join(" ");
            }
            setUserCardInfo(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = mask_2, _a)));
            });
        }
        else if (e.target.name === "expiryMonth" ||
            e.target.name === "expiryYear") {
            setUserCardInfo(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = e.target.value, _a)));
            });
        }
        else {
            setUserCardInfo(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = e.target.value, _a)));
            });
        }
    };
    var updateAddressInfoInputs = function (e) {
        setUserAddressInfo(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = e.target
                .value, _a)));
        });
    };
    var summaryFields = [
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
    var addressInfoFields = [
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
    var cardInfoFields = [
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
                    selectOptions: __spreadArray([], Array(12), true).map(function (item, index) {
                        return "".concat(index + 1).length <= 1 ? "0".concat(index + 1) : index + 1;
                    }),
                },
                {
                    label: "Year",
                    name: "expiryYear",
                    type: "select",
                    selectOptions: __spreadArray([], Array(10), true).map(function (item, index) { return new Date().getFullYear() + index; }),
                },
            ],
        },
        { label: "CVV", name: "cvv", type: "text", maxLength: 3 },
    ];
    return (React.createElement("div", { className: "container checkoutPage" },
        React.createElement("div", { className: "checkoutMainDisplay" },
            React.createElement("div", { className: "userInfoSide" },
                React.createElement("div", { className: "yourItemsSection" },
                    React.createElement("h2", null, "Your Items"),
                    React.createElement("div", { className: "checkoutUserItems" }, userCartItems.length > 0 ? (userCartItems.map(function (cartItem) {
                        return (React.createElement(CheckoutItem, { key: cartItem.postedItem.id, name: cartItem.postedItem.name, image: cartItem.postedItem.image, category: cartItem.postedItem.category, itemId: cartItem.postedItem.id, price: cartItem.postedItem.price }));
                    })) : (React.createElement("div", null, "No items in cart")))),
                React.createElement("div", { className: "addressSection" },
                    React.createElement("h2", { className: "addressHeader" }, "Billing Address"),
                    React.createElement("div", { className: "addressInputFields" }, addressInfoFields.map(function (field) { return (React.createElement(AddressInfoInputBase, { key: field.name, label: field.label, name: field.name, type: field.type, selectOptions: field.selectOptions ? field.selectOptions : null, value: userAddressInfo[field.name] && userAddressInfo[field.name], updateAddressInfoInputs: updateAddressInfoInputs, errorM: errorM["".concat(field.name, "Error")] &&
                            errorM["".concat(field.name, "Error")].length > 0
                            ? errorM["".concat(field.name, "Error")]
                            : null })); })))),
            React.createElement("div", { className: "summarySectionSide" },
                React.createElement("div", { className: "priceSummary" }, summaryFields.map(function (field) { return (React.createElement("div", { key: field.name, className: "priceSummaryField", "data-name": field.name },
                    React.createElement("div", { className: "pusher ".concat(field.name) }, field.label),
                    React.createElement("div", { className: field.name },
                        "$",
                        field.value))); })),
                React.createElement("form", { className: "userCardInfo", onSubmit: onPurchaseItem },
                    cardInfoFields.map(function (field) { return (React.createElement(CardInfoInputBase, { key: field.name, label: field.label, name: field.name, type: field.type, maxLength: field.maxLength ? field.maxLength : undefined, value: userCardInfo[field.name] && userCardInfo[field.name], selects: field.selects && field.selects, updateUserCartInfoInputs: updateUserCartInfoInputs, errorM: errorM["".concat(field.name, "Error")] &&
                            errorM["".concat(field.name, "Error")].length > 0
                            ? errorM["".concat(field.name, "Error")]
                            : null })); }),
                    React.createElement("button", { className: "purchaseButton", disabled: userCartItems.length > 0 ? false : true },
                        "Pay $",
                        grandTotalAmount.toFixed(2)))))));
};
