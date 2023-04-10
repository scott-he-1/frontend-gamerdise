import { DATABASE_URL } from "../../constants";

export const fetchLogin = (email: string, password: string) => {
  return fetch(`${DATABASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};
