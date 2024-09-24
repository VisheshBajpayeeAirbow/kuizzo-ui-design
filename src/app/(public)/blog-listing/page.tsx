import type { Metadata } from "next";
import BlogListingPage from "@/_pages/BlogListingPage/BlogListingPage";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs Listing Page",
};

const BlogListing = async () => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["blogs"],
  //   queryFn: getBlogs,
  // });
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <BlogListingPage />
    // </HydrationBoundary>
  );
};

export default BlogListing;
