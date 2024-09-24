import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IStudentSignupFormProps } from "@/types";
import { studentSignupSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import Button from "../../../Atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const StudentSignupForm = ({
  registerHandler,
}: {
  registerHandler: (data: IStudentSignupFormProps) => void;
}) => {
  const telephoneInput = useSelector(
    (state: RootState) => state.auth.phoneNumber
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStudentSignupFormProps>({
    resolver: yupResolver(studentSignupSchema),
  });
  const onSubmit = (data: IStudentSignupFormProps) => {
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
        errorMessage={errors?.phone?.message}
        labelText="Phone"
        name="phone"
        placeholder="2222 333333"
        inputType="phone"
      />
      <FormInput
        register={register}
        errorMessage={errors?.dob?.message}
        labelText="DOB"
        name="dob"
        placeholder="dd / mm / yyyy"
        inputType="date"
      />

      <Button className="mt-4" type="submit" btnColor="green" variant="default">
        SIGNUP
      </Button>
    </form>
  );
};

export default StudentSignupForm;
