import EditInstitutionPage from "@/_pages/Dashboard/Institution/EditInstitutionPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getInstitutionById } from "@/server";
import { IInstitutionData } from "@/types/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Edit Institute",
  description: "Edit Institute",
};

const EditInstitutePageWrapper = async () => {
  const session = await getServerSession(options);
  const institutionId: string = session?.user?.id;

  const queryClient = new QueryClient();
  const prefetchInstituteById = async (institutionId: string) => {
    await queryClient?.prefetchQuery<IInstitutionData>({
      queryKey: ["get-institute-by-id", { institutionId }],
      queryFn: () => getInstitutionById(institutionId),
    });
  };
  await prefetchInstituteById(institutionId);

  if (institutionId) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditInstitutionPage institutionId={institutionId} />
      </HydrationBoundary>
    );
  }
  return <div>No Institution ID found</div>;
};

export default EditInstitutePageWrapper;
