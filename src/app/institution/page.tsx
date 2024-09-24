import InstitutionListingPage from "@/_pages/InstitutionListingPage/InstitutionListingPage";
import { getAllInstitutions } from "@/server";
import { IInstitutionList } from "@/types/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const Institution = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<IInstitutionList[]>({
    queryKey: ["get-institutions"],
    queryFn: getAllInstitutions,
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InstitutionListingPage />
      </HydrationBoundary>
    </>
  );
};

export default Institution;
