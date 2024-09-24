import { useDashboardInputBackground } from "@/hooks";
import { useTheme } from "next-themes";
import React from "react";

interface IInputBasicTextareaProps {
  label: string;
  name?: string;
  placeholder: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const InputBasicTextarea = ({
  label,
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
}: IInputBasicTextareaProps) => {
  const { resolvedTheme } = useTheme();
  const { inputBackground } = useDashboardInputBackground();
  return (
    <div className="flex flex-col gap-[1.88rem] pt-[2.16rem]">
      <label
        className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        onChange={(e) => onChange(e)}
        rows={8}
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
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default InputBasicTextarea;
