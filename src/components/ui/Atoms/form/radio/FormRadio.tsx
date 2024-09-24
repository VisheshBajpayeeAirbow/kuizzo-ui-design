import { IRadioColors, IFormRadioProps } from "@/types";
import { toCapitalCase } from "@/utils";
import React from "react";

const FormRadio = ({
  register,
  handleChange,
  scheme,
  value,
  selectedOption,
}: IFormRadioProps & { selectedOption: string }) => {
  const colors: IRadioColors = {
    purple: "text-app-purple border-app-purple focus:ring-purple-500",
    orange: "text-app-orange border-app-orange focus:ring-orange-500",
    green: "text-app-green border-app-green focus:ring-green-500",
  };

  return (
    <div className="flex items-center gap-2 ">
      <input
        {...register("role")}
        onChange={handleChange}
        name="role"
        checked={selectedOption === value}
        id={`${scheme}-radio`}
        type="radio"
        value={value}
        className={`w-4 h-4 md:w-6 md:h-6 bg-transparent ${colors[scheme]}`}
      />
      <label
        htmlFor={`${scheme}-radio`}
        className="text-[15px] italic text-input-label"
      >
        {toCapitalCase(value)}
      </label>
    </div>
  );
};

export default FormRadio;
