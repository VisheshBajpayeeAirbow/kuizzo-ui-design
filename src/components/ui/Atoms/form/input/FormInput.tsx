"use client";
import { IFormInputProps } from "@/types";

import InputWithIcon from "./variants/InputWithIcon";
import ShowPassword from "./variants/ShowPassword";
import InputTelephone from "./variants/InputTelephone";
import InputDefault from "./variants/InputDefault";
import InputDate from "./variants/InputDate";
import InputTextArea from "./variants/InputTextarea";
import InputFile from "./variants/InputFile";
import InputSelect from "./variants/InputSelect";
import InputCheckbox from "./variants/InputCheckbox";
import InputRadio from "./variants/InputRadio";
import InputTime from "./variants/InputTime";

const FormInput = (props: IFormInputProps) => {
  const { inputType } = props;

  switch (inputType) {
    case "withIcon":
      return <InputWithIcon {...props} />;

    case "showPassword":
      return <ShowPassword {...props} />;

    case "phone":
      return <InputTelephone />;

    case "date":
      return <InputDate {...props} />;

    case "textarea":
      return <InputTextArea {...props} />;

    case "file":
      return <InputFile {...props} />;

    case "select":
      return <InputSelect {...props} />;
    case "checkbox":
      return <InputCheckbox {...props} />;

    case "radio":
      return <InputRadio {...props} />;

    case "time":
      return <InputTime {...props} />;

    default:
      return <InputDefault {...props} />;
  }
};

export default FormInput;
