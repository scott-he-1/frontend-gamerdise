import React from "react";

export const PostAnItemInputBase = ({
  name,
  label,
  type,
  value,
  selectOptions,
  updateInputFields,
  specialSymbol,
  errorM,
}: {
  name: string;
  label: string;
  type: string;
  value: any;
  selectOptions: string[] | undefined;
  specialSymbol: JSX.Element | undefined;
  errorM: string | null;
  updateInputFields: (e:React.SyntheticEvent) => void;
}) => {
  const Input = (type: string) => {
    switch (type) {
      case "select":
        return (
          <select name={name} id={name} onChange={updateInputFields}>
            {selectOptions
              ? selectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              : null}
          </select>
        );
      case "textArea":
        return (
          <textarea
            name={name}
            id={name}
            cols={30}
            rows={10}
            style={{ resize: "none" }}
            value={value}
            onChange={updateInputFields}
          ></textarea>
        );

      default:
        return (
          <div className="inputContainer">
            {specialSymbol && specialSymbol}
            <input
              type="text"
              name={name}
              onChange={updateInputFields}
              value={value}
            />
          </div>
        );
    }
  };

  return (
    <div className="postAnItemInputBase">
      <h3>{label}</h3>
      {Input(type)}
      {errorM && <div className="sellItemInputErrorM">{errorM}</div>}
    </div>
  );
};
