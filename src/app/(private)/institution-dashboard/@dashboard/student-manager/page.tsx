import StudentManagerPage from "@/_pages/Dashboard/Institution/StudentManagerPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getCoursesByInstituteId } from "@/server";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Student Manager",
  description: "Student Manager",
};

const StudentManager = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;
  const queryCient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      await queryCient?.prefetchQuery({
        queryKey: ["get-courses-by-institute-id", { id: instituteId }],
        queryFn: () => getCoursesByInstituteId(instituteId),
      });
    }
  };

  await prefetchQueries();

  return (
    <div>
      <StudentManagerPage instituteId={instituteId} />
    </div>
  );
};

export default StudentManager;
