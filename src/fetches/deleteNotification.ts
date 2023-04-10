import { BasicUserInfo } from "../types/types";
import { DATABASE_URL } from "../../constants";

export const deleteNotification = async ({
  notificationId,
}: {
  notificationId: number;
}) => {
  const unparsedUser = localStorage.getItem("user");
  if (!unparsedUser) {
    throw new Error("Not logged in");
  }
  const user: BasicUserInfo = JSON.parse(unparsedUser);
  return await fetch(`${DATABASE_URL}/notification/${notificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  });
};
