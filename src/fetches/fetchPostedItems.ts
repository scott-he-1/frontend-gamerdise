import { DATABASE_URL } from "../../constants";

export const fetchPostedItems = async () => {
  return await fetch(`${DATABASE_URL}/postedItems`);
};
