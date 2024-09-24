import { useDashboardInputBackground } from "@/hooks";
import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";
import React from "react";

const InputTime = ({
  name,
  placeholder,
  register,
  errorMessage,
  inputType,
  labelText,
  disabledOptions,
}: IFormInputProps) => {
  const { resolvedTheme } = useTheme();
  const { inputBackground } = useDashboardInputBackground();
  return (
    <div>
      <input
        type={inputType}
        {...register(name)}
        className={`focus:border-transparent focus:ring-0 ${inputBackground}  w-full h-[3.16081rem] text-input-text rounded-[10px]
         p-4  ${
           resolvedTheme === "dark"
             ? "border-input-border border-[1px]"
             : "border-none"
         } placeholder:italic
      placeholder:text-input-text ${
        errorMessage
          ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
          : ""
      } `}
      />
    </div>
  );
};

export default InputTime;
