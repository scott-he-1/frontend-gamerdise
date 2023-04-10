import React from "react";

export const CreateAccountInputBase = ({
  label,
  name,
  type,
  inputValue,
  errorM,
  updateInputFields,
}: {
  label: string;
  name: string;
  type: string;
  inputValue: string;
  errorM: string | null;
  updateInputFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="loginInputBase">
      <div className="loginLabel">{label}</div>
      <input
        className="loginInput"
        type={type}
        name={name}
        value={inputValue}
        onChange={updateInputFields}
        maxLength={30}
      />
      {errorM && <div className="loginErrorM">{errorM}</div>}
    </div>
  );
};
