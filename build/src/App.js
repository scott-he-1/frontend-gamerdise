import "./App.css";
import React, { useState } from "react";
import { useGamerdise } from "./providers/GamerdiseProvider";
function App() {
    var _a = useGamerdise(), categoryFilter = _a.categoryFilter, setCategoryFilter = _a.setCategoryFilter, loginToSite = _a.loginToSite;
    var _b = useState(""), email = _b[0], setEmail = _b[1];
    var _c = useState(""), password = _c[0], setPassword = _c[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("form", { onSubmit: function (e) {
                e.preventDefault();
                loginToSite({ email: email, password: password });
            } },
            React.createElement("input", { type: "text", name: "emailInput", onChange: function (e) { return setEmail(e.target.value); } }),
            React.createElement("input", { type: "text", name: "passwordInput", onChange: function (e) { return setPassword(e.target.value); } }),
            React.createElement("button", null, "Submit"))));
}
export default App;
