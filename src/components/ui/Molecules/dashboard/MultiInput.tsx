import { ChangeEvent } from "react";
import InputBasic from "../../Atoms/form/input/variants/InputBasic";
import { IMultiInputProps } from "@/types";

const MultiInput = ({
  maxInputs,
  placeholder,
  setInputsState,
  inputsState,
  inputType,
  label,
}: IMultiInputProps) => {
  const addPhoneInput = () => {
    //
    if (inputsState.length < maxInputs) {
      setInputsState([
        ...inputsState,
        { id: inputsState.length + 1, value: "" },
      ]);
    }
  };

  const removePhoneInput = () => {
    if (inputsState.length > 1) {
      setInputsState(inputsState.slice(0, -1));
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhoneInputs = inputsState.map((subjectInput, idx) => {
      if (index === idx) {
        return { ...subjectInput, value };
      }
      return subjectInput;
    });
    setInputsState(newPhoneInputs);
  };

  return (
    <div>
      <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]">
        {label}
      </label>
      {inputsState.map((input, index) => {
        return (
          <InputBasic
            key={input.id}
            addPhoneInput={addPhoneInput}
            removePhoneInput={removePhoneInput}
            hideAddButton={false}
            placeholder={placeholder}
            inputType={inputType}
            value={input.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handlePhoneChange(index, e.target.value)
            }
          />
        );
      })}
    </div>
  );
};

export default MultiInput;
