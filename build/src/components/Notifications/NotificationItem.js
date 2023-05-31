import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./NotificationItem.css";
import { deleteNotification } from "../../fetches/deleteNotification";
import { useGamerdise } from "../../providers/GamerdiseProvider";
export var NotificationItem = function (_a) {
    var id = _a.id, message = _a.message;
    var getUserNotifications = useGamerdise().getUserNotifications;
    return (React.createElement("div", { className: "notificationItem" },
        React.createElement(FontAwesomeIcon, { icon: faCircleXmark, onClick: function () {
                return deleteNotification({ notificationId: id }).then(function () {
                    return getUserNotifications();
                });
            } }),
        React.createElement("div", { className: "notificationMessage" }, message)));
};
