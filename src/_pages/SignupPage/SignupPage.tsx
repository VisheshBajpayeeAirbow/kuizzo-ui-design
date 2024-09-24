"use client";
import InstitutionSignupForm from "@/components/ui/Organisms/forms/auth/InstitutionSignupForm";
import InstructorSignupForm from "@/components/ui/Organisms/forms/auth/InstructorSignupForm";
import StudentSignupForm from "@/components/ui/Organisms/forms/auth/StudentSignupForm";
import InstitutionCoverImg from "@/assets/images/authImages/institution_cover_cropped_img.png";
import InstructorCoverImg from "@/assets/images/authImages/instructor_cover_img_cropped.png";
import StudentCoverImg from "@/assets/images/authImages/student_cover_img_cropped.png";
import KuizzoLogo from "@/assets/images/kuizzo_logo_dark.svg";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constants";
import Heading from "@/components/ui/Atoms/Heading";
import { toCapitalCase } from "@/utils";
import { setAuthFormState } from "@/features/appSlice/appSlice";
import RoleRadioForm from "@/components/ui/Organisms/forms/auth/RoleRadioForm";
import SocialButton from "@/components/ui/Atoms/SocialButton";
import AuthGradiant from "@/assets/images/gradiant_auth.svg";
import { signIn } from "next-auth/react";
import AppleIcon from "@/assets/icons/apple_icon.svg";
import GoogleIcon from "@/assets/icons/google_icon.svg";
import FacebookIcon from "@/assets/icons/facebook_icon.svg";
import { useRegisterUser } from "@/server/mutations";
import {
  IInstitutionSignupFormProps,
  IInstructorSignupFormProps,
  IStudentSignupFormProps,
} from "@/types";
import { signupData } from "@/mappings";

// signuppage
const SignupPage = () => {
  // title not used because its generated based on the role state of the page
  const { title, description } = signupData;
  const roleState = useSelector(
    (state: RootState) => state.appState.authFormState
  );
  const dispatch = useDispatch();
  const registerUserMutation = useRegisterUser();

  const getRegisterPayloadByRole = () => {
    const institutionPayload = {
      title: "",
      subscription: "free",
      verified: false,
      pageContent: {
        heroSection: {},
        whyUsSection: {},
        aboutSection: {},
        gallerySection: {},
        faqSection: {},
        testimonialsSection: {},
        contactEmail: "",
      },
      studentPermissions: {
        canCreateExams: false,
        canCreateQuizes: true,
      },
      instructorPermissions: {
        canCreateQuizAndExams: true,
        canCreateCourses: false,
        canAddStudents: false,
        canAddInstructors: false,
        canAccessBillingDetails: false,
      },
      published: false,
      profileImage: "",
      createdOn: "",
      updatedOn: "",
      timeZone: "",
    };

    const instructorPayload = {
      instituteId: "1",
      instructorPermissions: {
        canCreateQuizAndExams: true,
        canCreateCourses: false,
        canAddStudents: false,
        canAddInstructors: false,
        canAccessBillingDetails: false,
      },
      subscription: "free",
      verified: false,
      profileImage: "",
      createdOn: "",
      updatedOn: "",
    };

    const studentPayload = {
      instituteId: "1",
      studentPermissions: {
        canCreateExams: false,
        canCreateCourses: true,
      },
      subscription: "free",
      verified: false,
      profileImage: "",
      createdOn: "",
      updatedOn: "",
      timeZone: "",
    };

    switch (roleState) {
      case "institution":
        return institutionPayload;
      case "instructor":
        return instructorPayload;
      case "student":
        return studentPayload;
    }
  };

  const handleRegister = async (
    userData:
      | IInstitutionSignupFormProps
      | IInstructorSignupFormProps
      | IStudentSignupFormProps
  ) => {
    const payload = {
      ...userData,
      ...getRegisterPayloadByRole(),
    };

    // Register the user
    registerUserMutation.mutate({
      data: payload,
      role: roleState,
    });
    if (registerUserMutation.status === "success") {
      signIn("credentials", {
        email: userData.username,
        password: userData.password,
        redirect: false,
      });
    }
  };
  // renders forms based on role selected
  const renderFormsBasedOnRole = (
    role: "institution" | "instructor" | "student"
  ) => {
    switch (role) {
      case "instructor":
        return <InstructorSignupForm registerHandler={handleRegister} />;
      case "student":
        return <StudentSignupForm registerHandler={handleRegister} />;
      default:
        return <InstitutionSignupForm registerHandler={handleRegister} />;
    }
  };

  // reders imgages based on the role selected
  const renderImagesBasedOnRole = (
    role: "institution" | "instructor" | "student"
  ) => {
    switch (role) {
      case "instructor":
        return InstructorCoverImg;
      case "student":
        return StudentCoverImg;
      default:
        return InstitutionCoverImg;
    }
  };

  // renders text color based on the role selected
  const renderTextColorBasedOnRole = (
    role: "institution" | "instructor" | "student"
  ) => {
    switch (role) {
      case "instructor":
        return "text-app-orange";

      case "student":
        return "text-app-green";

      default:
        return "text-app-purple";
    }
  };

  // renders cover-overlay based on the role selected
  const renderOverlayBasedOnRole = (
    role: "institution" | "instructor" | "student"
  ) => {
    switch (role) {
      case "instructor":
        return "from-[#B956158C] to-[#AC50138C]";

      case "student":
        return "from-[#0136258C] to-[#0000008C]";

      default:
        return "from-[#2F058C8C] to-[#0000008C]";
    }
  };

  return (
    <main className={`flex flex-col md:flex-row w-screen`}>
      {/* image */}
      <div className="w-screen md:w-1/2 h-[40vh] md:h-screen flex justify-center items-center relative ">
        <Image
          src={renderImagesBasedOnRole(roleState)}
          alt="institution-cover-img"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-gradient-to-r ${renderOverlayBasedOnRole(
            roleState
          )}`}
        >
          {/* Add your overlay content here */}
          <div className="w-full md:h-screen flex flex-col items-center md:items-start md:justify-between md:p-20 ">
            <Link href={PATHS.homePage}>
              <Image src={KuizzoLogo} alt="kuizzo logo" />
            </Link>
            <div className="flex flex-col justify-center items-center md:justify-start md:items-start px-8">
              <Heading
                heading={`Kuizzo for ${toCapitalCase(roleState)}`}
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
      <div className="md:w-1/2 bg-background-app relative">
        <Image
          src={AuthGradiant}
          alt="auth-gradiant"
          className="absolute -top-32 right-0 hidden md:block"
        />

        <div className=" px-4 py-12 md:py-0 md:h-screen flex items-center justify-center">
          <div className="py-[2.59rem] px-[1.44rem] md:px-[2.44rem]  shadow-xl bg-transparent backdrop-blur-xl w-full  md:w-[33.25rem] border-[1px] border-[#AFA4F04D] rounded-card-border-radius">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <Heading
                className="text-[1.5625rem] text-heading"
                heading="SIGN UP"
              />
              <div className="mt-4 md:mt-0 flex justify-between md:gap-4">
                <span className="italic text-input-text text-[0.9375rem]">
                  Already a user?
                </span>
                <Link
                  className={`${renderTextColorBasedOnRole(
                    roleState
                  )} underline underline-offset-2 font-semibold`}
                  href={PATHS.signin}
                  onClick={() => dispatch(setAuthFormState("institution"))}
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="mt-[1.07rem] bg-[#AFA4F04D] h-[1px] w-full"></div>
            <div className="mt-[1.45rem]">
              <label className="font-semibold text-input-text">
                Select Role
              </label>
              <div className="mt-[1.31rem] md:mb-[1rem] md:mt-0">
                <RoleRadioForm />
              </div>
            </div>
            <div className="mt-[2.56rem] md:mt-0">
              {renderFormsBasedOnRole(roleState)}
            </div>
            {roleState !== "institution" && (
              <div className="mt-4">
                <span className="text-[12.53px] text-[#C2C2FF] font-medium">
                  Or continue with
                </span>
              </div>
            )}

            <div className="mt-4 flex flex-col md:flex-row gap-4">
              {roleState !== "institution" && (
                <div className="mt-4 flex flex-col  md:flex-row gap-[1.13rem]">
                  <SocialButton
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: PATHS.pricing,
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
              )}
            </div>
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
    </main>
  );
};

export default SignupPage;
