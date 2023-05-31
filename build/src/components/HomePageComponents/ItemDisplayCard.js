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
import React from "react";
import { addItemToCart } from "../../fetches/AddItemToCart";
import { deleteItem } from "../../fetches/deleteItem";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./ItemDisplayCard.css";
export var ItemDisplayCard = function (_a) {
    var id = _a.id, name = _a.name, description = _a.description, image = _a.image, category = _a.category, price = _a.price, posterName = _a.posterName;
    var _b = useGamerdise(), setOnDisplayItem = _b.setOnDisplayItem, currentAccount = _b.currentAccount, getPostedItems = _b.getPostedItems, getUserCartItems = _b.getUserCartItems, userCartItems = _b.userCartItems;
    var displayItemInfo = {
        name: name,
        description: description,
        image: image,
        category: category,
        price: price,
        posterName: posterName,
    };
    var alreadyInCart = userCartItems
        .map(function (item) { return item.postedItem.id; })
        .includes(id);
    var currentButtonText = function () {
        if (!currentAccount) {
            return "Please Login To Buy";
        }
        else if (alreadyInCart) {
            return "Already In Cart";
        }
        else if (posterName === currentAccount.email) {
            return "Remove This Item";
        }
        else {
            return "Add To Cart";
        }
    };
    var isButtonDisabled = function () {
        if (!currentAccount) {
            return true;
        }
        else if (alreadyInCart) {
            return true;
        }
        else {
            return false;
        }
    };
    return (React.createElement("div", { className: "itemCardAllInfo" },
        React.createElement("div", { className: "itemCardSeller" },
            "Seller: ",
            (currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.email) === posterName ? "YOU" : posterName),
        React.createElement("div", { className: "itemDisplayCard" },
            React.createElement("div", { className: "clickableSection", onClick: function () { return setOnDisplayItem(displayItemInfo); } },
                React.createElement("div", { className: "itemImageWrapper" },
                    React.createElement("img", { src: image, alt: name })),
                React.createElement("div", { className: "cardCategory" }, category),
                React.createElement("div", { className: "cardName" }, name),
                React.createElement("div", { className: "cardPrice" }, price === 0 ? "FREE" : "$".concat(price.toFixed(2)))),
            React.createElement("button", { className: "cardButton ".concat((currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.email) === posterName ? "remove" : ""), disabled: isButtonDisabled(), "data-itemid": id, onClick: function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!((currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.email) === posterName)) return [3 /*break*/, 2];
                                return [4 /*yield*/, deleteItem({
                                        itemId: Number(e.target.dataset.itemid),
                                    }).then(function () { return getPostedItems(); })];
                            case 1:
                                _a = _b.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, addItemToCart({
                                    itemId: Number(e.target.dataset.itemid),
                                }).then(function () {
                                    getPostedItems();
                                    getUserCartItems();
                                })];
                            case 3:
                                _a = _b.sent();
                                _b.label = 4;
                            case 4:
                                _a;
                                return [2 /*return*/];
                        }
                    });
                }); } }, currentButtonText()))));
};
