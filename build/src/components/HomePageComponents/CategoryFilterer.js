import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
export var CategoryFilter = function () {
    var _a = useGamerdise(), postedItems = _a.postedItems, categoryFilter = _a.categoryFilter, setCategoryFilter = _a.setCategoryFilter;
    var categoriesAmount = {};
    for (var _i = 0, postedItems_1 = postedItems; _i < postedItems_1.length; _i++) {
        var item = postedItems_1[_i];
        categoriesAmount["".concat(item.category)]
            ? (categoriesAmount[item.category] += 1)
            : (categoriesAmount[item.category] = 1);
    }
    var changeCategory = function (e) {
        setCategoryFilter(e.target.dataset.name);
    };
    return (React.createElement(React.Fragment, null, Object.keys(categoriesAmount).map(function (category) { return (React.createElement("div", { key: category, "data-name": category, className: "category ".concat(categoryFilter === category ? "active" : ""), onClick: changeCategory },
        category,
        " (",
        categoriesAmount[category],
        ")")); })));
};
