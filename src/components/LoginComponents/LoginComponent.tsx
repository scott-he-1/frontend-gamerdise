import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../fetches/fetchLogin";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { ErrorMessageType, LoginSet } from "../../types/types";
import { CreateAccount } from "./CreateAnAccount";
import { LoginComponentInputBase } from "./LoginComponentInputBase";
import "./LoginComponent.css";

export const LoginComponent = () => {
  const { setCurrentAccount } = useGamerdise();
  const [loginInputs, setLoginInputs] = useState<LoginSet>({
    emailInput: "",
    passwordInput: "",
  });
  const [errorM, setErrorM] = useState<ErrorMessageType>({});
  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { emailInput, passwordInput } = loginInputs;
    let allClear = true;
    Object.keys(loginInputs).forEach((input) => {
      let errorText: string;
      switch (input) {
        case "emailInput":
          if (emailInput.length <= 0) {
            errorText = "Email cannot be blank";
          } else if (!emailInput.includes(".com")) {
            errorText = "Please enter a valid email";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            emailInputError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "passwordInput":
          if (passwordInput.length <= 0) {
            errorText = "Password cannot be blank";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            passwordInputError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });
    if (allClear) {
      const response = await fetchLogin(emailInput, passwordInput);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentAccount(data);
        navigate("/");
        window.location.reload();
      } else if (response.status === 404) {
        setErrorM((prevState) => ({
          ...prevState,
          emailInputError: "Invalid User",
        }));
      } else {
        setErrorM((prevState) => ({
          ...prevState,
          passwordInputError: "Invalid Password",
        }));
      }
    }
  };

  const updateLoginFields = (e: React.SyntheticEvent) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const loginFields = [
    {
      label: "Email",
      name: "emailInput",
      type: "text",
    },
    {
      label: "Password",
      name: "passwordInput",
      type: "password",
    },
  ];

  return (
    <div className="container loginPage">
      <h1>Welcome to Gamerdise!</h1>
      <div className="loginSections">
        <div className="loginSection">
          <h2 className="formTitle">Log In</h2>
          <form className="loginForm" onSubmit={handleLogin}>
            {loginFields.map((field) => (
              <LoginComponentInputBase
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                updateInputFields={updateLoginFields}
                errorM={
                  errorM[`${field.name}Error`] &&
                  errorM[`${field.name}Error`].length > 0
                    ? errorM[`${field.name}Error`]
                    : null
                }
              />
            ))}
            <button className="signInButton">Login</button>
          </form>
        </div>
        <div className="createAccountSection">
          <h2 className="formTitle">Create An Account</h2>
          <CreateAccount />
        </div>
      </div>
    </div>
  );
};
