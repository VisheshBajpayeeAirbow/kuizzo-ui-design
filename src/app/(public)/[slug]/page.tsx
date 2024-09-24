import { Metadata } from "next";
import InstitutionDetailsPage from "@/_pages/InstitutionDetailsPage/InstitutionDetailsPage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getInstituteBySlug } from "@/server";
import { IInstitutionData } from "@/types/api";
type Props = {
  params: {
    slug: string;
  };
};
// need to be a be api that gets institution details based on id
// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const { institutionId } = params;

//   const response = getInstitutionById(institutionId);
//   const data: IInstitutionData = await response;
//   console.log("DATA: ", data);
//   const title = `${data.institute.pageContent.heroSection.instituteName} Details`;
//   return {
//     title,
//     description: `${title} details page`,
//   };
// };

const InstitutionDetails = async ({ params }: Props) => {
  console.log("INSTITUTE ID: ", params.slug);

  const { slug } = params;
  const queryClient = new QueryClient();
  // hydrating data client side once fetched
  const prefetchInstituteById = async (slug: string) => {
    await queryClient?.prefetchQuery<IInstitutionData>({
      queryKey: ["get-institute-by-id", { slug }],
      queryFn: () => getInstituteBySlug(slug),
    });
  };
  await prefetchInstituteById(slug);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InstitutionDetailsPage slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default InstitutionDetails;
