import InstructorManagerPage from "@/_pages/Dashboard/Institution/InstructorManagerPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getCoursesByInstituteId, getInstitutionById } from "@/server";
import { ICourseDataMany, IInstitutionData } from "@/types/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Instructor Manager",
  description: "Instructor Manager",
};
const InstructorManager = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;
  const queryClient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      // Prefetch courses for the selected institute
      await queryClient?.prefetchQuery<ICourseDataMany>({
        queryKey: ["get-courses-by-institute-id", { id: instituteId }],
        queryFn: () => getCoursesByInstituteId(instituteId),
      });
      // Prefetch institute data for the selected institute
      await queryClient?.prefetchQuery<IInstitutionData>({
        queryKey: ["get-institute-by-id", { id: instituteId }],
        queryFn: () => getInstitutionById(instituteId),
      });
    }
    // Prefetch additional queries as needed
  };

  await prefetchQueries();

  if (instituteId) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InstructorManagerPage instituteId={instituteId} />
      </HydrationBoundary>
    );
  }
  return <div>No Institute ID found</div>;
};

export default InstructorManager;
