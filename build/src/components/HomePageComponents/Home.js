import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { CategoryFilter } from "./CategoryFilterer";
import { ItemDisplayCard } from "./ItemDisplayCard";
import { OnDisplayItemComponent } from "./OnDisplayItemComponent";
import { Searchbar } from "./Searchbar";
import "./Home.css";
export var Home = function () {
    var _a = useGamerdise(), isLoading = _a.isLoading, isErrorLoading = _a.isErrorLoading, postedItems = _a.postedItems, currentAccount = _a.currentAccount, categoryFilter = _a.categoryFilter, setCategoryFilter = _a.setCategoryFilter, searchInputFilter = _a.searchInputFilter, setSearchInputFilter = _a.setSearchInputFilter, onDisplayItem = _a.onDisplayItem, setOnDisplayItem = _a.setOnDisplayItem, userCartItems = _a.userCartItems, userNotifications = _a.userNotifications;
    var postedItemsSection = function () {
        if (isLoading) {
            return React.createElement("div", null, "Loading...");
        }
        else if (isErrorLoading) {
            return React.createElement("div", null, "Error loading items");
        }
        else {
            return postedItems
                .filter(function (item) {
                return item.category.includes(categoryFilter) &&
                    item.name.match(new RegExp(searchInputFilter, "gi"));
            })
                .map(function (item) {
                return (React.createElement(ItemDisplayCard, { key: item.id, id: item.id, name: item.name, description: item.description, image: item.image, category: item.category, price: item.price, posterName: item.posterName }));
            });
        }
    };
    var removeOnDisplayItem = function (e) {
        if (e.target.classList[0] === "pageCover") {
            setOnDisplayItem(null);
        }
    };
    return (React.createElement(React.Fragment, null,
        onDisplayItem !== null && (React.createElement("div", { className: "pageCover", onClick: removeOnDisplayItem },
            React.createElement(OnDisplayItemComponent, null))),
        currentAccount && (React.createElement("div", { className: "greeting" },
            "Welcome, ",
            currentAccount.email,
            "!")),
        React.createElement("div", { className: "container homePage" },
            React.createElement(Searchbar, null),
            React.createElement("div", { className: "postedItemsMainDisplay" },
                React.createElement("div", { className: "categoriesFilterSection" },
                    categoryFilter.length > 0 && (React.createElement("button", { onClick: function () { return setCategoryFilter(""); }, className: "filterClearer" }, "Clear Your Filter")),
                    React.createElement("div", { className: "header-2" }, "Categories"),
                    React.createElement(CategoryFilter, null)),
                React.createElement("div", { className: "postedItemsSection" }, postedItems.length <= 0 ? (React.createElement("h2", null, "No Items on the market")) : (postedItemsSection()))))));
};
