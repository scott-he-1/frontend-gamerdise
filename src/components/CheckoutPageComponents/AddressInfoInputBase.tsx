import React from "react";
import { CheckoutSelectsType } from "../../types/types";

export const AddressInfoInputBase = ({
  label,
  name,
  type,
  value,
  errorM,
  selectOptions,
  updateAddressInfoInputs,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  errorM: string | null;
  selectOptions: string[] | null;
  updateAddressInfoInputs: (e: React.SyntheticEvent) => void;
}) => {
  switch (type) {
    case "select":
      return (
        <div>
          <div className="addressInfoLabel">{label}</div>
          <select
            name={name}
            id={name}
            onChange={(e) => updateAddressInfoInputs(e)}
          >
            {selectOptions &&
              selectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          {errorM && <div className="addressInputErrorM">{errorM}</div>}
        </div>
      );
    default:
      return (
        <div>
          <div className="addressInfoLabel">{label}</div>
          <input
            type={type}
            name={name}
            onChange={(e) => updateAddressInfoInputs(e)}
            value={value}
          />
          {errorM && <div className="addressInputErrorM">{errorM}</div>}
        </div>
      );
  }
};
