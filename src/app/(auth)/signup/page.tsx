import type { Metadata } from "next";
import SignupPage from "@/_pages/SignupPage/SignupPage";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { PATHS } from "@/constants";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup Page",
  openGraph: {
    title: "Signup",
    description: "Signup Page",
  },
};
const Signup = async () => {
  const session = await getServerSession(options);
  if (session) {
    console.log("SESSION: ", session);
    redirect(PATHS.institutionDashboard);
  }
  return <SignupPage />;
};

export default Signup;
