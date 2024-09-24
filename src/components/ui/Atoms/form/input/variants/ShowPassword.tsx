import { IFormInputProps } from "@/types";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";

const InputWithIcon = ({
  errorMessage,
  labelText,
  name,
  requiredField,
  placeholder,
  register,
}: IFormInputProps) => {
  const [togglePasswordVisiblity, setTogglePasswordVisiblity] = useState(false);
  const { resolvedTheme } = useTheme();

  const handlePasswordVisiblity = () => {
    setTogglePasswordVisiblity((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-[0.5rem] md:mb-[1rem]">
      <label
        className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
        htmlFor={name}
      >
        {labelText} {requiredField && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative flex items-center">
        <IoLockClosedOutline className="absolute left-[1.06rem] text-input-icon text-xl" />
        {togglePasswordVisiblity ? (
          <HiOutlineEyeOff
            onClick={handlePasswordVisiblity}
            className="absolute right-3 text-input-icon text-xl cursor-pointer"
          />
        ) : (
          <HiOutlineEye
            onClick={handlePasswordVisiblity}
            className="absolute right-3 text-input-icon text-xl cursor-pointer"
          />
        )}
        <input
          {...register(name)}
          className={`focus:border-transparent focus:ring-0 bg-input-background w-full h-[3.16081rem] text-input-text rounded-[10px]
         p-4   placeholder:italic
      placeholder:text-input-text pl-[3.15rem] text-[15px]  ${
        resolvedTheme === "dark"
          ? "border-input-border border-[1px]"
          : "border-none"
      } ${
            errorMessage
              ? "border-rose-500 placeholder:text-xs placeholder:text-rose-500"
              : ""
          } `}
          type={togglePasswordVisiblity ? "text" : "password"}
          name={name}
          placeholder={errorMessage ? errorMessage : placeholder}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
