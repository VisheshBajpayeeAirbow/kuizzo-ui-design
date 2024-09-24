import InstitutionOverviewPage from "@/_pages/Dashboard/Institution/InstitutionOverviewPage";
import TestPage from "@/_pages/Dashboard/Institution/TestPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getInstituteOverview, getInstructorsByInstutiteId } from "@/server";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Institution Dashboard",
  description: "Institution Dashboard",
};

const InsititutionDashboardOverview = async () => {
  const session = await getServerSession(options);
  const instituteId = session?.user.id;
  const queryClient = new QueryClient();

  const prefetchQueries = async () => {
    if (instituteId) {
      await queryClient.prefetchQuery({
        queryKey: [
          "get-institute-overview-by-institute-id",
          { id: instituteId },
        ],
        queryFn: () => getInstituteOverview(instituteId),
      });

      await queryClient.prefetchQuery({
        queryKey: ["get-all-instructors-by-institute-id", { id: instituteId }],
        queryFn: () => getInstructorsByInstutiteId(instituteId),
      });
    }
  };

  await prefetchQueries();

  return (
    <>
      {/* <InstitutionOverviewPage instituteId={instituteId} /> */}
      <TestPage />
    </>
  );
};

export default InsititutionDashboardOverview;
