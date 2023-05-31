import { DATABASE_URL } from "../../constants";
export var fetchLogin = function (email, password) {
    return fetch("".concat(DATABASE_URL, "/auth/login"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    });
};
