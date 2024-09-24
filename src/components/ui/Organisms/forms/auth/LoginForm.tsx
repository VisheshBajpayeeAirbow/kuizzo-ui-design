import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { ILoginForm } from "@/types";
import { loginSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import Button from "../../../Atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authRedirection } from "@/utils";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(loginSchema) });
  const [authenticationError, setAuthenticationError] = useState("");
  const router = useRouter();

  const roleState = useSelector(
    (state: RootState) => state.appState.authFormState
  );

  const onSubmit = async (data: ILoginForm) => {
    console.log(data);
    const dataWithRole = {
      ...data,
      role: roleState,
    };

    try {
      const response = await signIn("credentials", {
        ...dataWithRole,
        redirect: false,
      });
      if (response?.error) {
        console.error(response.error);
        reset();
        toast.error(response.error);
        setAuthenticationError(response.error);
        return;
      }
      if (response?.ok) {
        const session = await getSession();
        // console.log("session: ", session?.user?.role);
        router.push(authRedirection(session?.user?.role));
      }
    } catch (error) {
      console.error("AUTHENTICATION ERROR: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errorMessage={authenticationError || errors?.username?.message}
        labelText="Username"
        name="username"
        placeholder="User@123"
        requiredField
        Icon={AiOutlineUser}
        inputType="withIcon"
      />
      <FormInput
        register={register}
        errorMessage={authenticationError || errors?.password?.message}
        labelText="Password"
        name="password"
        placeholder="*******"
        requiredField
        inputType="showPassword"
      />
      <Button
        className="mt-4"
        type="submit"
        btnColor="purple"
        variant="default"
      >
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
