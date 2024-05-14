import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Blogs from "./components/Blogs";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import { ArticlesAndBlogs } from "../articles/components/Articles";
import BlogsSearchResults from "./components/BlogsSearchResults";
import { apiURL, pageLimit } from "@/utils/variables";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: fetchArticlesAndBlogs,
    initialPageParam: apiURL + `/blogs/?limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: ArticlesAndBlogs) => {
      return lastPage.next;
    },
  });
  if (searchParams.q) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["blogsSearch", searchParams.q],
      queryFn: fetchArticlesAndBlogs,
      initialPageParam:
        apiURL + `/blogs/?limit=${pageLimit}&offset=0&search=${searchParams.q}`,
      getNextPageParam: (lastPage: ArticlesAndBlogs) => {
        return lastPage.next;
      },
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogsSearchResults />
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Blogs />
      </HydrationBoundary>
    );
  }
}
