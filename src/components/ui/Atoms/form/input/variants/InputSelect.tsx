import { useDashboardInputBackground } from "@/hooks";
import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";

const SelectInput = ({
  errorMessage,
  labelText,
  name,
  register,
  selectOptions,
}: IFormInputProps) => {
  const { inputBackground } = useDashboardInputBackground();
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full flex flex-col gap-[1.25rem]">
      {labelText && (
        <label
          className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
          htmlFor={name}
        >
          {labelText}
        </label>
      )}
      <select
        {...register(name)}
        className={`focus:border-transparent focus:ring-0 ${inputBackground} w-full h-[3.16081rem] text-input-text rounded-[10px]
           ${
             resolvedTheme === "dark"
               ? "border-input-border border-[1px]"
               : "border-none"
           }  placeholder:italic
      placeholder:text-input-text  text-[0.9375rem] ${
        errorMessage
          ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
          : ""
      } `}
        aria-label="Select Course"
        id={name}
      >
        <option value="" defaultChecked>
          Select an option
        </option>

        {selectOptions?.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} className="text-input-text" value={option}>
                {option}
              </option>
            );
          }

          if (typeof option === "object") {
            return (
              <option
                key={option.id}
                className="text-input-text"
                value={option.id}
              >
                {option.value}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default SelectInput;
