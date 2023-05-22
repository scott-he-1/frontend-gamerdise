import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Confirmation.css";
export var Confirmation = function () {
    var navigate = useNavigate();
    return (React.createElement("div", { className: "container confirmationPage" },
        React.createElement("div", { className: "confirmationMessage" },
            React.createElement(FontAwesomeIcon, { icon: faCircleCheck }),
            React.createElement("div", null, "Thank you for your purchase"),
            React.createElement("button", { onClick: function () { return navigate("/"); } }, "Return To Homepage"))));
};
