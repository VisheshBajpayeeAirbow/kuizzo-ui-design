import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";
import React from "react";

const InputDate = ({
  errorMessage,
  labelText,
  name,
  requiredField,
  placeholder,
  register,
}: IFormInputProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-[0.5rem] mb-[1rem] ">
      <label
        className="text-input-label text-[0.875rem] font-semibold  leading-[115%] tracking-[0.04375rem]"
        htmlFor={name}
      >
        {labelText} {requiredField && <span className="text-rose-500">*</span>}
      </label>
      <input
        {...register(name)}
        className={`bg-input-background w-full  h-[3.16081rem]  text-input-text rounded-[10px]
         p-4  ${
           resolvedTheme === "dark"
             ? "border-input-border border-[1px]"
             : "border-none"
         }  placeholder:italic
      placeholder:text-input-text pl-10 text-[15px] ${
        errorMessage
          ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
          : ""
      }`}
        type="date"
        name={name}
        placeholder={errorMessage ? errorMessage : placeholder}
      />
    </div>
  );
};

export default InputDate;
