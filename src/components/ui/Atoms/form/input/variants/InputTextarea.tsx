import { useDashboardInputBackground } from "@/hooks";
import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";
import React from "react";

const InputWithIcon = ({
  errorMessage,
  labelText,
  name,
  requiredField,
  placeholder,
  register,
}: IFormInputProps) => {
  const { resolvedTheme } = useTheme();
  const { inputBackground } = useDashboardInputBackground();

  return (
    <div className="flex flex-col gap-[1.88rem] md:mb-[1rem]">
      <label
        className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
        htmlFor={name}
      >
        {labelText} {requiredField && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        rows={8}
        {...register(name)}
        className={`focus:border-transparent focus:ring-0 ${inputBackground} w-full text-input-text rounded-[10px]
         p-4 ${
           resolvedTheme === "dark"
             ? "border-input-border border-[1px]"
             : "border-none"
         } placeholder:italic
      placeholder:text-input-text ${
        errorMessage
          ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
          : ""
      }`}
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithIcon;
