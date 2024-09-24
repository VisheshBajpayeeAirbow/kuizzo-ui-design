import { useDashboardInputBackground } from "@/hooks";
import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";
import React from "react";

const InputWithIcon = ({
  errorMessage,
  labelText,
  name,
  requiredField,
  Icon,
  placeholder,
  register,
}: IFormInputProps) => {
  const { resolvedTheme } = useTheme();
  const { inputBackground } = useDashboardInputBackground();

  return (
    <div className="flex flex-col gap-[0.5rem] mb-[1rem]">
      <label
        className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
        htmlFor={name}
      >
        {labelText} {requiredField && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 text-input-icon text-xl" />}
        <input
          {...register(name)}
          className={`focus:border-transparent focus:ring-0 ${inputBackground} w-full h-[3.16081rem] text-input-text rounded-[10px]
         p-4  ${
           resolvedTheme === "dark"
             ? "border-input-border border-[1px]"
             : "border-none"
         }  placeholder:italic
      placeholder:text-input-text pl-[3.15rem] text-[0.9375rem] ${
        errorMessage
          ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
          : ""
      } `}
          type="text"
          name={name}
          placeholder={errorMessage ? errorMessage : placeholder}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
