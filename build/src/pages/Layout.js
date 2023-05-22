import { faHouse, faSackDollar, faShoppingCart, faUser, faBell, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MiniCartItem } from "../components/MiniCartItem/MiniCartItem";
import { NotificationItem } from "../components/Notifications/NotificationItem";
import { useGamerdise } from "../providers/GamerdiseProvider";
import "./Layout.css";
export var Layout = function () {
    var _a = useGamerdise(), currentAccount = _a.currentAccount, userNotifications = _a.userNotifications, userCartItems = _a.userCartItems;
    var _b = useState(false), showNotificationBoard = _b[0], setShowNotificationBoard = _b[1];
    var _c = useState(false), showAccountOptions = _c[0], setShowAccountOptions = _c[1];
    var _d = useState(false), showMiniCart = _d[0], setShowMiniCart = _d[1];
    var navigate = useNavigate();
    var routeOptions = [
        { name: "Home", icon: React.createElement(FontAwesomeIcon, { icon: faHouse }), linkTo: "/" },
        {
            name: "Post An Item",
            icon: React.createElement(FontAwesomeIcon, { icon: faSackDollar }),
            linkTo: "/postAnItem",
        },
        {
            name: "Cart",
            icon: React.createElement(FontAwesomeIcon, { icon: faShoppingCart }),
            linkTo: "/checkout",
            requiresLogin: true,
            showHover: function () { return setShowMiniCart(true); },
            removeHover: function () { return setShowMiniCart(false); },
            trayActive: showMiniCart,
            hoverElement: (React.createElement("div", { className: "hoverTray", onMouseEnter: function () { return setShowMiniCart(true); }, onMouseLeave: function () { return setShowMiniCart(false); } }, userCartItems.length > 0 ? (userCartItems.map(function (_a) {
                var postedItem = _a.postedItem;
                return (React.createElement(MiniCartItem, { key: postedItem.name, name: postedItem.name, image: postedItem.image, price: postedItem.price }));
            })) : (React.createElement("div", null, "No items in cart")))),
        },
        currentAccount
            ? {
                name: "User",
                icon: React.createElement(FontAwesomeIcon, { icon: faUser }),
                linkTo: "/",
                showHover: function () { return setShowAccountOptions(true); },
                removeHover: function () { return setShowAccountOptions(false); },
                trayActive: showAccountOptions,
                hoverElement: (React.createElement("div", { className: "hoverTray", onMouseEnter: function () { return setShowAccountOptions(true); }, onMouseLeave: function () { return setShowAccountOptions(false); } },
                    React.createElement("button", { className: "logoutButton", onClick: function () {
                            localStorage.removeItem("user");
                            window.location.reload();
                            navigate("/");
                        } }, "Logout"))),
            }
            : { name: "Login", icon: React.createElement("div", null, "LOGIN"), linkTo: "/login" },
        {
            name: "Notifications",
            icon: React.createElement(FontAwesomeIcon, { icon: faBell }),
            linkTo: "",
            requiresLogin: true,
            accessoryElement: userNotifications.length ? (React.createElement("div", { className: "notificationCounter" }, userNotifications.length)) : null,
            showHover: function () { return setShowNotificationBoard(true); },
            removeHover: function () { return setShowNotificationBoard(false); },
            trayActive: showNotificationBoard,
            hoverElement: (React.createElement("div", { className: "hoverTray", onMouseEnter: function () { return setShowNotificationBoard(true); }, onMouseLeave: function () { return setShowNotificationBoard(false); } }, userNotifications.length > 0 ? (userNotifications.map(function (notification) { return (React.createElement(NotificationItem, { key: notification.id, id: notification.id, message: notification.message })); })) : (React.createElement("div", { className: "notificationMessage" }, "No Notifications at the time.")))),
        },
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "menu" },
            React.createElement("div", { className: "menuTitle pusher" },
                React.createElement(Link, { to: "/" }, "Gamerdise")),
            React.createElement("nav", { className: "navbar" },
                React.createElement("ul", null, routeOptions.map(function (option) {
                    if (option.requiresLogin && !currentAccount) {
                        return;
                    }
                    return (React.createElement("div", { key: option.name, className: "menuIcon", title: option.name },
                        React.createElement("li", null,
                            React.createElement(Link, { to: option.linkTo, className: option.disabledLink ? "disabledLink" : "", onMouseEnter: option.showHover ? option.showHover : function () { }, onMouseLeave: option.removeHover ? option.removeHover : function () { } }, option.icon)),
                        option.trayActive && option.hoverElement,
                        option.accessoryElement && option.accessoryElement));
                })))),
        React.createElement(Outlet, null)));
};
