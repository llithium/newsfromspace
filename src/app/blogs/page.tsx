import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Blogs from "./components/Blogs";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import { apiURL, pageLimit } from "../articles/page";
import { ArticlesAndBlogs } from "../articles/components/Articles";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: fetchArticlesAndBlogs,
    initialPageParam: apiURL + `/blogs/?limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: ArticlesAndBlogs) => {
      return lastPage.next;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blogs />
    </HydrationBoundary>
  );
}
