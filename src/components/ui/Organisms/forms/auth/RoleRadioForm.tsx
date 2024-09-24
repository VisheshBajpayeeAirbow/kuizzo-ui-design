import FormRadio from "@/components/ui/Atoms/form/radio/FormRadio";
import { setAuthFormState } from "@/features/appSlice/appSlice";
import { RootState } from "@/store/store";
import { IRadioForm } from "@/types";
import { radioSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const RoleRadioForm = () => {
  const dispatch = useDispatch();
  const roleState = useSelector(
    (state: RootState) => state.appState.authFormState
  );

  const { register, watch, setValue } = useForm<IRadioForm>({
    resolver: yupResolver(radioSchema),
    defaultValues: { role: roleState },
  });

  const selectedOption = watch("role");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as
      | "institution"
      | "instructor"
      | "student";
    setValue("role", value);
    console.log(value);
    dispatch(setAuthFormState(value));
  };

  return (
    <div className="w-full flex items-center justify-center md:justify-start md:mt-2 gap-4 md:gap-20">
      <FormRadio
        handleChange={handleChange}
        register={register}
        scheme="purple"
        value="institution"
        selectedOption={selectedOption}
      />
      <FormRadio
        handleChange={handleChange}
        register={register}
        scheme="orange"
        value="instructor"
        selectedOption={selectedOption}
      />
      <FormRadio
        handleChange={handleChange}
        register={register}
        scheme="green"
        value="student"
        selectedOption={selectedOption}
      />
    </div>
  );
};

export default RoleRadioForm;
