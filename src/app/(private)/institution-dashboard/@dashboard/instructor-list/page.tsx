import InstructorListPage from "@/_pages/Dashboard/Institution/InstructorListPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getInstructorsByInstutiteId } from "@/server";
import { IInstructorData } from "@/types/api";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Instructor List",
  description: "Instructor List",
};

const InstructorList = async () => {
  const session = await getServerSession(options);

  const instituteId: string = session?.user?.id;
  const queryClient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      // prefetch instructors by institute id
      await queryClient.prefetchQuery<IInstructorData[]>({
        queryKey: ["get-all-instructors-by-institute-id", { id: instituteId }],
        queryFn: () => getInstructorsByInstutiteId(instituteId),
      });
    }
  };

  await prefetchQueries();
  return (
    <>
      <InstructorListPage instituteId={instituteId} />
    </>
  );
};

export default InstructorList;
