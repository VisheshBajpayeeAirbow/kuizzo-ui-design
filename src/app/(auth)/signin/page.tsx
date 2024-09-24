import { Metadata } from "next";
import SigninPage from "@/_pages/SigninPage/SigninPage";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { authRedirection } from "@/utils";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin Page",
  openGraph: {
    title: "Signin",
    description: "Signin Page",
  },
};

const Signin = async () => {
  const session = await getServerSession(options);
  if (session) {
    console.log("SESSION: ", session);

    redirect(authRedirection(session.user.role));
  }
  return <SigninPage />;
};

export default Signin;
