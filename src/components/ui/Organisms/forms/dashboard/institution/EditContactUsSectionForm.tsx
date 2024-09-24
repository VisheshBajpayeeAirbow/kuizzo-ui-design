import React, { useState } from "react";
import InputBasic from "@/components/ui/Atoms/form/input/variants/InputBasic"; // Adjust this import based on your project structure

const EditContactUsSectionForm = ({
  submitHandler,
  defaultValue,
}: {
  submitHandler: (data: string) => void;
  defaultValue: string | undefined;
}) => {
  const [email, setEmail] = useState<string | undefined>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    submitHandler(e.target.value);
  };

  return (
    <div className="pb-[6.66rem]">
      <InputBasic
        inputType="text"
        onChange={handleChange}
        placeholder="Enter Email"
        label="Enter Email"
        hideAllButtons
        value={email}
      />
    </div>
  );
};

export default EditContactUsSectionForm;
