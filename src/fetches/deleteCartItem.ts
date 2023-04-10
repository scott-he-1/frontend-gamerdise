import { DATABASE_URL } from "../../constants";
import { BasicUserInfo } from "../types/types";

export const deleteCartItem = async ({ itemId }: { itemId: number }) => {
  const unparsedUser = localStorage.getItem("user");
  if (!unparsedUser) {
    throw new Error("Not logged in");
  }
  const user: BasicUserInfo = JSON.parse(unparsedUser);
  return await fetch(`${DATABASE_URL}/user/${user.id}/cartItems`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ itemId: itemId }),
  });
};
