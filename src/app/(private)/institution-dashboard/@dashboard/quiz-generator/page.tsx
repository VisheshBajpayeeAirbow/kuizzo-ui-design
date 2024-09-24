import QuizGeneratorPage from "@/_pages/Dashboard/Institution/QuizGeneratorPage";
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
  title: "Quiz Generator",
  description: "Quiz Generator",
};

const QuizGenerator = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;
  const queryClient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      await queryClient?.prefetchQuery<ICourseDataMany>({
        queryKey: ["get-courses-by-institute-id", { id: instituteId }],
        queryFn: () => getCoursesByInstituteId(instituteId),
      });
    }
  };

  await prefetchQueries();

  if (instituteId) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuizGeneratorPage instituteId={instituteId} />;
      </HydrationBoundary>
    );
  }
};

export default QuizGenerator;
