import { useState, ChangeEvent } from "react";
import { useDashboardInputBackground } from "@/hooks";
import { ISelectInputProps } from "@/types";
import { nanoid } from "nanoid";
import { Select } from "@headlessui/react";
const SelectInput = (props: ISelectInputProps) => {
  const { options, label, id, customHeight, customRadius, handleSelectChange } =
    props;
  const { inputBackground } = useDashboardInputBackground();
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    handleSelectChange(value);
  };

  return (
    <div className="w-full flex flex-col gap-[1.25rem]">
      {label && (
        <label
          className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <Select
        value={selectedValue}
        onChange={handleChange}
        className={`${inputBackground} ${customHeight} ${
          customRadius ? customRadius : " rounded-[0.625rem]"
        } w-full h-[3.96469rem] px-4 border-input-border focus:border-transparent focus:ring-0 text-xs`}
        aria-label="Select Course"
        id={id}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={nanoid()} className="text-input-text" value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
