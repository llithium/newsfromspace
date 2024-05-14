import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Articles from "./components/Articles";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import { ArticlesAndBlogs } from "./components/Articles";
import ArticlesSearchResults from "./components/ArticlesSearchResults";
import { apiURL, pageLimit } from "@/utils/variables";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles"],
    queryFn: fetchArticlesAndBlogs,
    initialPageParam: apiURL + `/articles/?limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: ArticlesAndBlogs) => {
      return lastPage.next;
    },
  });
  if (searchParams.q) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["articlesSearch", searchParams.q],
      queryFn: fetchArticlesAndBlogs,
      initialPageParam:
        apiURL +
        `/articles/?limit=${pageLimit}&offset=0&search=${searchParams.q}`,
      getNextPageParam: (lastPage: ArticlesAndBlogs) => {
        return lastPage.next;
      },
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticlesSearchResults />
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Articles />
      </HydrationBoundary>
    );
  }
}
