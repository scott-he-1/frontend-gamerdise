import React from "react";
import { CheckoutSelectsType } from "../../types/types";

export const CardInfoInputBase = ({
  label,
  name,
  type,
  value,
  errorM,
  selects,
  updateUserCartInfoInputs,
  maxLength,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  errorM: string | null;
  selects: CheckoutSelectsType | undefined;
  updateUserCartInfoInputs: (e: React.SyntheticEvent) => void;
  maxLength: number | undefined;
}) => {
  switch (type) {
    case "multiSelect":
      return (
        <>
          <div className="cardInfoLabel">{label}</div>
          <div className="cardInfoSelectContainer">
            {selects
              ? selects.length > 0
                ? selects.map((select) => (
                    <div key={select.name}>
                      <div>{select.label}</div>
                      <select
                        name={select.name}
                        id={select.name}
                        onChange={(e) => updateUserCartInfoInputs(e)}
                      >
                        {select.selectOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))
                : null
              : null}
          </div>
          {errorM && <div className="cardInfoInput error">{errorM}</div>}
        </>
      );
    default:
      return (
        <div className="cardInfoInput">
          <div className="cardInfoLabel">{label}</div>
          <input
            type={type}
            name={name}
            value={value}
            maxLength={maxLength && maxLength}
            onChange={(e) => updateUserCartInfoInputs(e)}
          />
          {errorM && <div className="cardInfoInput error">{errorM}</div>}
        </div>
      );
  }
};
