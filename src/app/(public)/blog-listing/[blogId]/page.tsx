import BlogDetailsPage from "@/_pages/BlogDetailsPage/BlogDetailsPage";

type Props = {
  params: {
    blogId: string;
  };
};

// need to be a be api that gets blog details based on id
// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const { blogId } = params;
//   const response: IBlogDetailsCard = (
//     await axios.get(`${BASE_URL}/blog/${blogId}`)
//   ).data;

//   console.log("META DATA BLOG: ", response.heading);
//   const title = `${response.heading}`;
//   return {
//     title: {
//       absolute: title,
//     },
//     description: `${title} description`,
//   };
// };

const BlogDetails = async ({ params }: Props) => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["blog-by-id", { blogId: params.blogId }],
  //   queryFn: () => getBlogById(params.blogId),
  // });

  // const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydratedState}>
    <section>
      <BlogDetailsPage blogId={params.blogId} />
    </section>
    // </HydrationBoundary>
  );
};

export default BlogDetails;
