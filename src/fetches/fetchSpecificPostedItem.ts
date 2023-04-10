import { DATABASE_URL } from "../../constants";

export const fetchSpecificPostedItem = async ({
  itemId,
}: {
  itemId: number;
}) => {
  return await fetch(`${DATABASE_URL}/postedItems/${itemId}`);
};
