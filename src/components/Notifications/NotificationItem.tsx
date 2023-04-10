import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./NotificationItem.css";
import { deleteNotification } from "../../fetches/deleteNotification";
import { useGamerdise } from "../../providers/GamerdiseProvider";

export const NotificationItem = ({
  id,
  message,
}: {
  id: number;
  message: string;
}) => {
  const { getUserNotifications } = useGamerdise();
  return (
    <div className="notificationItem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() =>
          deleteNotification({ notificationId: id }).then(() =>
            getUserNotifications()
          )
        }
      />
      <div className="notificationMessage">{message}</div>
    </div>
  );
};
