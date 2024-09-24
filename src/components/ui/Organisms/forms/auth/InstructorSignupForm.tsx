import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IInstructorSignupFormProps } from "@/types";
import { instructorSignupSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import Button from "../../../Atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

const InstructorSignupForm = ({
  registerHandler,
}: {
  registerHandler: (data: IInstructorSignupFormProps) => void;
}) => {
  const telephoneInput = useSelector(
    (state: RootState) => state.auth.phoneNumber
  );

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInstructorSignupFormProps>({
    resolver: yupResolver(instructorSignupSchema),
  });
  const onSubmit = (data: IInstructorSignupFormProps) => {
    registerHandler({ ...data, phone: telephoneInput });
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
      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Password"
        name="password"
        placeholder="*******"
        requiredField
        inputType="showPassword"
      />
      <FormInput
        register={register}
        errorMessage={errors?.password?.message}
        labelText="Phone"
        name="phone"
        placeholder="2222 333333"
        inputType="phone"
      />

      <Button
        className="mt-4"
        type="submit"
        btnColor="orange"
        variant="default"
      >
        SIGNUP
      </Button>
    </form>
  );
};

export default InstructorSignupForm;
