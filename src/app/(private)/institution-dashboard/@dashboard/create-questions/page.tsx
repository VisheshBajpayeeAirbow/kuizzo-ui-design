import CreateQuestionsPage from "@/_pages/Dashboard/Institution/CreateQuestionsPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: "Create Questions",
  description: "Create Questions",
};
const CreateQuestions = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;

  return (
    <div>
      <CreateQuestionsPage instituteId={instituteId} />
    </div>
  );
};

export default CreateQuestions;
