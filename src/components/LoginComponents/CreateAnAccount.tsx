import React, { useState } from "react";
import { createAccount } from "../../fetches/createAccount";
import { CreateAccountInputType, ErrorMessageType, CreateAccountField } from "../../types/types";
import { CreateAccountInputBase } from "./CreateAccountInputBase";
import { LoginComponentInputBase } from "./LoginComponentInputBase";

const INIT_CREATE_ACCOUNT_INPUTS = {
  email: "",
  password: "",
  confirmPassword: "",
};



export const CreateAccount = () => {
  const [createAccountInputs, setCreateAccountInputs] =
    useState<CreateAccountInputType>(INIT_CREATE_ACCOUNT_INPUTS);
  const [errorM, setErrorM] = useState<ErrorMessageType>({});
  const [hidePassword, setHidePassword] = useState(true);

  const updateInputFields = (e: React.SyntheticEvent) => {
    setCreateAccountInputs((prevState) => ({
      ...prevState,
      [`${(e.target as HTMLInputElement).name}`]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const submitNewAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = createAccountInputs;
    let allClear = true;
    Object.keys(createAccountInputs).forEach((input) => {
      let errorText = "";
      switch (input) {
        case "email":
          if (email.length <= 0) {
            errorText = "Please enter an email";
          } else if (!email.includes(".com")) {
            errorText = "Please enter a valid email";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            emailError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "password":
          if (password.length <= 0) {
            errorText = "Please enter a password";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            passwordError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "confirmPassword":
          if (password !== confirmPassword) {
            errorText = "Passwords must match";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            confirmPasswordError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        default:
          break;
      }
    });

    if (allClear) {
      const response = await createAccount({ email, password });
      if (response.ok) {
        alert("Successfully Created Account!");
        setCreateAccountInputs(INIT_CREATE_ACCOUNT_INPUTS);
      } else if (response.status === 409) {
        setErrorM((prevState) => ({
          ...prevState,
          emailError: "Email Already Exists",
        }));
      }
    }
  };

  const createAccountFields: CreateAccountField[] = [
    { label: "Email", name: "email", type: "text" },
    {
      label: "Password",
      name: "password",
      type: hidePassword ? "password" : "text",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: hidePassword ? "password" : "text",
    },
  ];

  return (
    <>
      <form onSubmit={submitNewAccount} className="createAccountForm">
        {createAccountFields.map((field) => (
          <CreateAccountInputBase
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            inputValue={createAccountInputs[field.name]}
            updateInputFields={updateInputFields}
            errorM={
              errorM[`${field.name}Error`] &&
              errorM[`${field.name}Error`].length > 0
                ? errorM[`${field.name}Error`]
                : null
            }
          />
        ))}
        <button className="signInButton">Create Account</button>
      </form>
    </>
  );
};
