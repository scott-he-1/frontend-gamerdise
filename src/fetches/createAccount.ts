import { DATABASE_URL } from "../../constants";

export const createAccount = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await fetch(`${DATABASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
