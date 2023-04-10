import { BasicUserInfo } from "../types/types";
import { DATABASE_URL } from "../../constants";

export const addItemToCart = async ({ itemId }: { itemId: number }) => {
  const unparsedUser = localStorage.getItem("user");
  if (!unparsedUser) {
    throw new Error("Not logged in");
  }
  const user: BasicUserInfo = JSON.parse(unparsedUser);
  return await fetch(`${DATABASE_URL}/user/${user.id}/cartItems`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId }),
  });
};
