import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./Searchbar.css";
export var Searchbar = function () {
    var setSearchInputFilter = useGamerdise().setSearchInputFilter;
    return (React.createElement("div", { className: "searchBar" },
        React.createElement("input", { type: "text", placeholder: "Search...", onChange: function (e) { return setSearchInputFilter(e.target.value); } }),
        React.createElement(FontAwesomeIcon, { icon: faMagnifyingGlass })));
};
