import CourseListPage from "@/_pages/Dashboard/Institution/CourseListPage";
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
  title: "Course List",
  description: "Course List",
};
const CourseListPageWrapper = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;

  const queryClient = new QueryClient();

  const prefetchCoursesByInstituteId = async (instituteId: string) => {
    await queryClient?.prefetchQuery<ICourseDataMany>({
      queryKey: ["get-courses-by-institute-id", { instituteId }],
      queryFn: () => getCoursesByInstituteId(instituteId),
    });
  };
  await prefetchCoursesByInstituteId(instituteId);

  if (instituteId) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CourseListPage instituteId={instituteId} />
      </HydrationBoundary>
    );
  }

  return <div>No Institution ID found</div>;
};

export default CourseListPageWrapper;
