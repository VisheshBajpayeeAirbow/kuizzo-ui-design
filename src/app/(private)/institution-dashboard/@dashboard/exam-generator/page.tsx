import ExamGeneratorPage from "@/_pages/Dashboard/Institution/ExamGeneratorPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getCoursesByInstituteId } from "@/server";
import { ICourseDataMany } from "@/types/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Exam Generator",
  description: "Exam Generator",
};
const ExamGenerator = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;
  const queryClient = new QueryClient();

  const prefetchCourseByInstituteId = async (instituteId: string) => {
    await queryClient?.prefetchQuery<ICourseDataMany>({
      queryKey: ["get-courses-by-institute-id", { id: instituteId }],
      queryFn: () => getCoursesByInstituteId(instituteId),
    });
  };

  await prefetchCourseByInstituteId(instituteId);

  if (instituteId) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExamGeneratorPage instituteId={instituteId} />
      </HydrationBoundary>
    );
  }

  return <div>Institute Id not defined</div>;
};

export default ExamGenerator;
