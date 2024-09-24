"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsTelephone } from "react-icons/bs";
import { IPhoneCountryCodeInputProps } from "@/types";
import { useTheme } from "next-themes";

const PhoneCountryCodeInput: React.FC<IPhoneCountryCodeInputProps> = ({
  onCountryCodeChange,
}) => {
  const [value, setValue] = useState<string>("");
  const { resolvedTheme } = useTheme();

  const handleCountryChange = (
    value: string,
    country: { dialCode?: string }
  ) => {
    const countryCode = country?.dialCode || "";
    onCountryCodeChange(countryCode, value);
  };

  return (
    <div className="flex flex-col gap-[0.5rem] mb-[1rem]">
      <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]">
        Telephone
      </label>
      <div className="relative w-full ">
        <PhoneInput
          country="us"
          value={value}
          onChange={(value, country) => {
            setValue(value);
            handleCountryChange(value, country);
          }}
          containerStyle={{
            position: "relative",
            height: "3.16081rem",
          }}
          inputStyle={{
            width: "100%",

            border: `${resolvedTheme === "dark" ? "1px" : "none"}`,
            borderRadius: "10px",
            borderColor: "#625A92",
            padding: "1.6rem",
            color: "#9E9ABC",
            backgroundColor: `${
              resolvedTheme === "dark"
                ? "rgb(68, 65, 85)"
                : "rgb(233, 229, 252)"
            }`,
          }}
          buttonStyle={{
            borderRadius: "30px",
            height: "2.5rem",
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            border: "none",
            backgroundColor: "transparent",
          }}
          dropdownStyle={{
            color: "#9E9ABC",
            backgroundColor: "rgb(68, 65, 85)",
          }}
        />
        <BsTelephone className="absolute top-4 text-xl text-input-icon right-5" />
      </div>
    </div>
  );
};

export default PhoneCountryCodeInput;
