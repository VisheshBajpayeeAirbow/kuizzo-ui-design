"use client";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IInstitutionSignupFormProps } from "@/types";
import { institutionSignupSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import Button from "../../../Atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const InstitutionSignupForm = ({
  registerHandler,
}: {
  registerHandler: (data: IInstitutionSignupFormProps) => void;
}) => {
  const telephoneInput = useSelector(
    (state: RootState) => state.auth.phoneNumber
  );

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInstitutionSignupFormProps>({
    resolver: yupResolver(institutionSignupSchema),
  });

  const onSubmit = (data: IInstitutionSignupFormProps) => {
    registerHandler({ ...data, phone: telephoneInput });
    console.log("REGISTER DATA: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errorMessage={errors.email?.message}
        labelText="Email Address"
        name="email"
        placeholder="Yourname@gmail.com"
        requiredField
        Icon={LuMail}
        inputType="withIcon"
      />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-4 ">
        <div className="w-full">
          <FormInput
            register={register}
            errorMessage={errors?.username?.message}
            labelText="Username"
            name="username"
            placeholder="User@123"
            requiredField
            Icon={AiOutlineUser}
            inputType="withIcon"
          />
        </div>
        <div className="w-full">
          <FormInput
            register={register}
            errorMessage={errors?.password?.message}
            labelText="Password"
            name="password"
            placeholder="*******"
            requiredField
            inputType="showPassword"
          />
        </div>
      </div>
      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Phone"
        name="phone"
        placeholder="2222 333333"
        inputType="phone"
      />
      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Institution Address"
        name="address"
        placeholder="2464 Royal Ln. Mesa, New 45463"
        requiredField
        inputType="withIcon"
        Icon={SlLocationPin}
      />

      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Institute Slug"
        name="slug"
        placeholder="Enter a slug here"
        requiredField
        inputType="default"
      />

      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Institute Name"
        name="instituteName"
        placeholder="Enter Institute Name"
        requiredField
        inputType="default"
      />

      <Button
        className="mt-4"
        type="submit"
        btnColor="purple"
        variant="default"
      >
        SIGNUP
      </Button>
    </form>
  );
};

export default InstitutionSignupForm;
