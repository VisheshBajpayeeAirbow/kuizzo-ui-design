import StudentListPage from "@/_pages/Dashboard/Institution/StudentListPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getStudentsByInstituteId } from "@/server";
import { QueryClient } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import React from "react";

const StudentList = async () => {
  const session = await getServerSession(options);
  const instituteId = session?.user.id;
  const queryClient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      // prefetch students by institute id
      await queryClient.prefetchQuery({
        queryKey: ["get-all-students-by-institute-id", { id: instituteId }],
        queryFn: () => getStudentsByInstituteId(instituteId),
      });
    }
  };

  await prefetchQueries();
  return (
    <>
      <StudentListPage instituteId={instituteId} />
    </>
  );
};

export default StudentList;
