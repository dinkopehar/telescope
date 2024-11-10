import { useState } from "react";

interface ToggleInputProps {
  labelTitle: string;
  labelStyle: string;
  type?: string;
  containerStyle: string;
  defaultValue: boolean;
  placeholder?: string;
  updateFormValue: (arg: { updateType: string; value: boolean }) => void;
  updateType: string;
}

function ToggleInput({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
}: ToggleInputProps) {
  const [value, setValue] = useState(defaultValue);

  const updateToogleValue = () => {
    setValue(!value);
    updateFormValue({ updateType, value: !value });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label cursor-pointer">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={value}
          onChange={updateToogleValue}
        />
      </label>
    </div>
  );
}

export default ToggleInput;
