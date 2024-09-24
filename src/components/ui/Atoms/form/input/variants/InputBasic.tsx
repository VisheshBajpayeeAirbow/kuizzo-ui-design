import { IInputBasicProps } from "@/types";
import { useTheme } from "next-themes";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
const InputBasic: React.FC<IInputBasicProps> = ({
  placeholder,
  onChange,
  addPhoneInput,
  removePhoneInput,
  inputType,
  hideAddButton,
  hideAllButtons,
  label,
  value,
}: IInputBasicProps) => {
  const { resolvedTheme } = useTheme();

  const errorMessage = false;
  return (
    <div className="flex gap-[1.44rem] items-center pt-[1.87rem]">
      {/* input  */}
      <div className="flex flex-col gap-[1.87rem] w-full">
        {label && (
          <label
            className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
            htmlFor="input-basic"
          >
            {label}
          </label>
        )}
        <input
          type={inputType}
          value={value}
          id="input-basic"
          className={`focus:border-transparent focus:ring-0 bg-dashboard-input-background w-full h-[3.16081rem] text-input-text rounded-[10px]
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
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
        />
      </div>
      {/* image */}
      {!hideAllButtons && (
        <div className="flex gap-[0.62rem]">
          {!hideAddButton && (
            <IoIosAddCircleOutline
              onClick={addPhoneInput}
              strokeWidth={2}
              className="w-[1.4695rem] h-[1.4695rem] hover:rotate-180 transition ease-in-out duration-300 text-input-label cursor-pointer"
            />
          )}
          <IoIosRemoveCircleOutline
            onClick={removePhoneInput}
            className="w-[1.4695rem] h-[1.4695rem] hover:rotate-180 transition ease-in-out duration-300 text-input-label cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default InputBasic;
