import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchPastLaunches } from "./utils/fetchPastLaunches";
import { LaunchesData } from "../components/Launches";
import { pageLimit } from "@/articles/page";
import PastLaunches from "./components/PastLaunches";
import PastLaunchesSearchResults from "./components/PastLaunchesSearchResults";
import { launchApiUrl } from "../page";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["launches/previous"],
    queryFn: fetchPastLaunches,
    staleTime: 10 * 60 * 1000,
    initialPageParam:
      launchApiUrl +
      `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: LaunchesData) => {
      return lastPage.next;
    },
  });
  if (searchParams.q) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["pastLaunchesSearch", searchParams.q],
      queryFn: fetchPastLaunches,
      staleTime: 15 * 60 * 1000,
      initialPageParam:
        launchApiUrl +
        `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=0&search=${searchParams.q}`,
      getNextPageParam: (lastPage: LaunchesData) => {
        return lastPage.next;
      },
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PastLaunchesSearchResults />
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PastLaunches />
      </HydrationBoundary>
    );
  }
}
