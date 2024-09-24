import React from "react";
import FormInput from "../../Atoms/form/input/FormInput";
import { IQuestionTypeInputsProps } from "@/types";

export const QuestionTypeInputs = ({
  checkboxState,
  checkboxLabelText,
  checkboxName,
  checkboxPlaceholder,
  checkboxRegister,
  inputName,
  inputPlaceholder,
  inputRegister,
}: IQuestionTypeInputsProps) => {
  return (
    <div className="flex items-center justify-between gap-[1.19rem] mt-[1.56rem] w-[20rem] tablet:w-[25rem]">
      <FormInput
        name={checkboxName}
        register={checkboxRegister}
        inputType="checkbox"
        labelText={checkboxLabelText}
        placeholder={checkboxPlaceholder}
      />
      {checkboxState && (
        <div className="flex gap-[1.25rem]">
          <FormInput
            name={inputName}
            placeholder={inputPlaceholder}
            register={inputRegister}
            inputType="default"
            defaultInputTypeValue="number"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionTypeInputs;
