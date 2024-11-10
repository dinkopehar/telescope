import React, { useState } from "react";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";

interface SelectBoxProps {
  labelTitle: string;
  labelDescription?: string;
  defaultValue?: string;
  containerStyle?: string;
  placeholder?: string;
  labelStyle?: string;
  options: Array<{
    name: string;
    value?: string;
  }>;
  updateType: string;
  updateFormValue: (arg: { updateType: string; value: string }) => void;
}

function SelectBox({
  labelTitle,
  labelDescription,
  defaultValue,
  containerStyle,
  placeholder,
  labelStyle,
  options,
  updateType,
  updateFormValue,
}: SelectBoxProps) {
  const [value, setValue] = useState<string>(defaultValue || "");

  const updateValue = (newValue: string): void => {
    updateFormValue({ updateType, value: newValue });
    setValue(newValue);
  };

  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label  ${labelStyle}`}>
        <div className="label-text">
          {labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </label>

      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      >
        <option disabled value="PLACEHOLDER">
          {placeholder}
        </option>
        {options.map((o, k) => {
          return (
            <option value={o.value || o.name} key={k}>
              {o.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
