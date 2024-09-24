import { useDashboardInputBackground } from "@/hooks";
import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";

const InputWithIcon = ({
  errorMessage,
  labelText,
  name,
  requiredField,
  placeholder,
  register,
  defaultInputTypeValue,
}: IFormInputProps) => {
  const { resolvedTheme } = useTheme();
  const { inputBackground } = useDashboardInputBackground();

  return (
    <div className="flex flex-col gap-[1.87rem] w-full ">
      {labelText && (
        <label
          className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
          htmlFor={name}
        >
          {labelText}{" "}
          {requiredField && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        max={5}
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
        type={defaultInputTypeValue ? defaultInputTypeValue : "text"}
        name={name}
        placeholder={errorMessage ? errorMessage : placeholder}
      />
    </div>
  );
};

export default InputWithIcon;
