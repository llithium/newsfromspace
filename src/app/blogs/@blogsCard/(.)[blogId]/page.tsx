import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BlogCard from "../../[blogId]/components/BlogCard";
import fetchBlog from "../../utils/fetchblog";
import { apiURL } from "../../../articles/page";

export default async function Page({ params }: { params: { blogId: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog", params.blogId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchBlog(params.blogId, apiURL),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogCard params={params} />
    </HydrationBoundary>
  );
}
