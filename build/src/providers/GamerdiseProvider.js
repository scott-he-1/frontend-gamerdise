import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPostedItems } from "../fetches/fetchPostedItems";
import { fetchUserCartItems } from "../fetches/fetchUserCartItems";
import { fetchUserNotifications } from "../fetches/fetchUserNotifications";
var GamerdiseContext = createContext({
    isLoading: false,
    isErrorLoading: false,
    postedItems: [],
    userCartItems: [],
    userNotifications: [],
    categoryFilter: "",
    setCategoryFilter: function () { },
    searchInputFilter: "",
    setSearchInputFilter: function () { },
    onDisplayItem: null,
    setOnDisplayItem: function () { },
    currentAccount: null,
    setCurrentAccount: function () { },
    getPostedItems: function () { },
    getUserCartItems: function () { },
    getUserNotifications: function () { },
});
export var GamerdiseProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), isErrorLoading = _c[0], setIsErrorLoading = _c[1];
    var _d = useState([]), postedItems = _d[0], setPostedItems = _d[1];
    var _e = useState([]), userCartItems = _e[0], setUserCartItems = _e[1];
    var _f = useState([]), userNotifications = _f[0], setUserNotifications = _f[1];
    var _g = useState(""), categoryFilter = _g[0], setCategoryFilter = _g[1];
    var _h = useState(""), searchInputFilter = _h[0], setSearchInputFilter = _h[1];
    var _j = useState(null), onDisplayItem = _j[0], setOnDisplayItem = _j[1];
    var _k = useState(null), currentAccount = _k[0], setCurrentAccount = _k[1];
    useEffect(function () {
        var unparsedUser = localStorage.getItem("user");
        if (unparsedUser) {
            var user = JSON.parse(unparsedUser);
            setCurrentAccount(user);
            try {
                getUserCartItems();
                getUserNotifications();
            }
            catch (error) {
                localStorage.removeItem("user");
            }
        }
        getPostedItems();
    }, []);
    var getPostedItems = function () {
        setIsLoading(true);
        fetchPostedItems()
            .then(function (response) { return response.json(); })
            .then(function (items) { return setPostedItems(items); })
            .catch(function () {
            setIsErrorLoading(true);
        })
            .finally(function () { return setIsLoading(false); });
    };
    var getUserCartItems = function () {
        fetchUserCartItems()
            .then(function (response) { return response.json(); })
            .then(function (userCartItems) { return setUserCartItems(userCartItems); })
            .catch(function (e) { return console.error(e); });
    };
    var getUserNotifications = function () {
        fetchUserNotifications()
            .then(function (response) { return response.json(); })
            .then(function (notifications) { return setUserNotifications(notifications); })
            .catch(function (e) { return console.error(e); });
    };
    return (React.createElement(GamerdiseContext.Provider, { value: {
            isLoading: isLoading,
            isErrorLoading: isErrorLoading,
            postedItems: postedItems,
            userCartItems: userCartItems,
            userNotifications: userNotifications,
            categoryFilter: categoryFilter,
            setCategoryFilter: setCategoryFilter,
            searchInputFilter: searchInputFilter,
            setSearchInputFilter: setSearchInputFilter,
            onDisplayItem: onDisplayItem,
            setOnDisplayItem: setOnDisplayItem,
            currentAccount: currentAccount,
            setCurrentAccount: setCurrentAccount,
            getPostedItems: getPostedItems,
            getUserCartItems: getUserCartItems,
            getUserNotifications: getUserNotifications,
        } }, children));
};
export var useGamerdise = function () {
    var context = useContext(GamerdiseContext);
    return {
        isLoading: context.isLoading,
        isErrorLoading: context.isErrorLoading,
        postedItems: context.postedItems,
        userCartItems: context.userCartItems,
        userNotifications: context.userNotifications,
        categoryFilter: context.categoryFilter,
        setCategoryFilter: context.setCategoryFilter,
        searchInputFilter: context.searchInputFilter,
        setSearchInputFilter: context.setSearchInputFilter,
        onDisplayItem: context.onDisplayItem,
        setOnDisplayItem: context.setOnDisplayItem,
        currentAccount: context.currentAccount,
        setCurrentAccount: context.setCurrentAccount,
        getPostedItems: context.getPostedItems,
        getUserCartItems: context.getUserCartItems,
        getUserNotifications: context.getUserNotifications,
    };
};
