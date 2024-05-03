import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Articles from "./components/Articles";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import { ArticlesAndBlogs } from "./components/Articles";

export const apiURL = "https://api.spaceflightnewsapi.net/v4";

export const pageLimit = "40";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles"],
    queryFn: fetchArticlesAndBlogs,
    initialPageParam: apiURL + `/articles/?limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: ArticlesAndBlogs) => {
      return lastPage.next;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Articles />
    </HydrationBoundary>
  );
}
