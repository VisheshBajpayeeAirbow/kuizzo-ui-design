import React from "react";
import { useDispatch } from "react-redux";
import PhoneCountryCodeInput from "@/components/ui/Atoms/CountryCodeInput";
import { getPhoneNumber } from "@/features/authSlice/authSlice";

const InputTelephone = () => {
  const dispatch = useDispatch();

  const handleCountryCodeChange = (countryCode: string, value: string) => {
    console.log("COUNTRY CODE PARENT:", countryCode, "VALUE: ", value);
    dispatch(getPhoneNumber(value));
  };

  return (
    <div>
      <PhoneCountryCodeInput onCountryCodeChange={handleCountryCodeChange} />
    </div>
  );
};

export default InputTelephone;
