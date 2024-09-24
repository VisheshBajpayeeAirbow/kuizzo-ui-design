"use client";
import InstitutionCoverImg from "@/assets/images/authImages/institution_cover_cropped_img.png";
import KuizzoLogo from "@/assets/images/kuizzo_logo_dark.svg";
import AuthGradiant from "@/assets/images/gradiant_auth.svg";
import FacebookIcon from "@/assets/icons/facebook_icon.svg";
import GoogleIcon from "@/assets/icons/google_icon.svg";
import AppleIcon from "@/assets/icons/apple_icon.svg";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constants";
import Heading from "@/components/ui/Atoms/Heading";
import { authRedirection } from "@/utils";
import { setAuthFormState } from "@/features/appSlice/appSlice";
import SocialButton from "@/components/ui/Atoms/SocialButton";
import LoginForm from "@/components/ui/Organisms/forms/auth/LoginForm";
import { signIn } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { signinData } from "@/mappings";

// singin page
const SigninPage = () => {
  // title not used because its generated based on the role state of the page
  const { title, description } = signinData;
  const roleState = useSelector(
    (state: RootState) => state.appState.authFormState
  );

  const dispatch = useDispatch();

  // reders imgages based on the role selected
  // * Not required as we dont want to send role in payload anymore so no need of dynamic image changes based on role
  // const renderImagesBasedOnRole = (
  //   role: "institution" | "instructor" | "student"
  // ) => {
  //   switch (role) {
  //     case "instructor":
  //       return InstructorCoverImg;
  //     case "student":
  //       return StudentCoverImg;
  //     default:
  //       return InstitutionCoverImg;
  //   }
  // };

  // renders text color based on the role selected

  // renders cover-overlay based on the role selected
  // const renderOverlayBasedOnRole = (
  //   role: "institution" | "instructor" | "student"
  // ) => {
  //   switch (role) {
  //     case "instructor":
  //       return "from-[#B956158C] to-[#AC50138C]";

  //     case "student":
  //       return "from-[#0136258C] to-[#0000008C]";

  //     default:
  //       return "from-[#2F058C8C] to-[#0000008C]";
  //   }
  // };

  return (
    <main className={`flex flex-col md:flex-row`}>
      {/* image */}
      <div className="w-screen md:w-1/2 h-[40vh] md:h-screen flex justify-center items-center relative">
        <Image
          src={InstitutionCoverImg}
          alt="institution-cover-img"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-gradient-to-r`}
        >
          {/* Add  overlay content here */}
          <div className="w-full md:h-screen flex flex-col items-center md:items-start md:justify-between md:p-20 ">
            <Link href={PATHS.homePage}>
              <Image src={KuizzoLogo} alt="kuizzo logo" />
            </Link>
            <div className="flex flex-col justify-center items-center md:justify-start md:items-start px-8">
              <Heading
                heading={`Kuizzo`}
                className="text-[35px] text-nowrap text-white"
              />
              <p className="text-gray-200 text-center md:text-start text-[14px]">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`absolute md:hidden bottom-0 w-full h-1/4  bg-gradient-to-b  to-background-app from-transparent `}
        ></div>
      </div>

      {/* form */}
      <div className="md:w-1/2 bg-background-app  relative">
        <Image
          src={AuthGradiant}
          alt="auth-gradiant"
          className="absolute -top-32 right-0 hidden md:block"
        />

        <div className="px-4 py-12 md:px-24   md:h-screen flex items-center justify-center">
          <div className="py-8 px-[1.44rem] md:px-[2.44rem] shadow-xl bg-transparent  w-[33.25rem] border-2 border-[#AFA4F04D] rounded-card-border-radius backdrop-blur-xl">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <Heading className="text-[25px] text-heading" heading="SIGN IN" />
              <div className="mt-4 md:mt-0 flex justify-between md:gap-4">
                <span className="italic text-input-text text-[15px]">
                  Don&apos;t have an account?
                </span>
                <Link
                  className="underline underline-offset-2 font-semibold text-app-purple"
                  href={PATHS.signup}
                  onClick={() => dispatch(setAuthFormState("institution"))}
                >
                  Signup
                </Link>
              </div>
            </div>
            <div className="mt-6 bg-[#AFA4F04D] h-[1px] w-full"></div>
            {/* not required anymore */}
            {/* <div className="mt-4">
              <label className="font-semibold text-input-text">
                Select Role
              </label>
              <div className="mt-[1.31rem] md:mt-0">
                <RoleRadioForm />
              </div>
            </div> */}
            <div className="mt-4">
              <LoginForm />
            </div>
            <div className="mt-6 bg-[#AFA4F04D] h-[1px] w-full"></div>

            {/* {roleState !== "institution" && (
              <>
                <div className="mt-4">
                  <span className="text-[12.53px] text-[#C2C2FF] font-medium">
                    Or continue with
                  </span>
                </div>
                <div className="mt-4 flex flex-col  md:flex-row gap-[1.13rem]">
                  <SocialButton
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: authRedirection(roleState),
                      })
                    }
                    icon={GoogleIcon}
                    text="Google"
                  />
                  <SocialButton
                    onClick={() =>
                      signIn("facebook", { callbackUrl: PATHS.dashboard })
                    }
                    icon={FacebookIcon}
                    text="Facebook"
                  />
                  <SocialButton icon={AppleIcon} text="Apple" />
                </div>
              </>
            )} */}
            <div className="mt-4">
              <p className="text-[10px] text-sub-heading">
                By registering you with our{" "}
                <span className="text-app-purple cursor-pointer">
                  Terms and Conditions
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </main>
  );
};

export default SigninPage;
