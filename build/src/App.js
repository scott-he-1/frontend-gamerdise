import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { PostAnItemPage } from "./pages/PostAnItemPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
function App() {
    var loggedIn = localStorage.getItem("user");
    var currentAccountExists = JSON.parse(String(loggedIn));
    var PrivateRoute = function (_a) {
        var children = _a.children;
        return currentAccountExists ? children : React.createElement(Navigate, { to: "/login", replace: true });
    };
    return (React.createElement("div", { className: "App" },
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Layout, null) },
                    React.createElement(Route, { index: true, element: React.createElement(HomePage, null) }),
                    React.createElement(Route, { path: "/login", element: React.createElement(LoginPage, null) }),
                    React.createElement(Route, { path: "/confirmationPage", element: React.createElement(ConfirmationPage, null) }),
                    React.createElement(Route, { path: "/postAnItem", element: React.createElement(PrivateRoute, null,
                            React.createElement(PostAnItemPage, null)) }),
                    React.createElement(Route, { path: "/checkout", element: React.createElement(PrivateRoute, null,
                            React.createElement(CheckoutPage, null)) }))))));
}
export default App;
