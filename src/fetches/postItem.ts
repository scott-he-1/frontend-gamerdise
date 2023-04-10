import { BasicUserInfo, ItemToPostType } from "../types/types";
import { DATABASE_URL } from "../../constants";

export const postItem = async ({
  name,
  description,
  image,
  category,
  price,
}: ItemToPostType) => {
  const unparsedUser = localStorage.getItem("user");
  if (!unparsedUser) {
    throw new Error("Not logged in");
  }
  const user: BasicUserInfo = JSON.parse(unparsedUser);
  const itemToPost = {
    name,
    description,
    image,
    category,
    price,
    posterId: user.id,
  };

  return await fetch(`${DATABASE_URL}/postedItems`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemToPost),
  });
};
