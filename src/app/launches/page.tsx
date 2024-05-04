import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Launches, { LaunchesUpcoming } from "./components/Launches";
import { fetchUpcomingLaunches } from "./utils/fetchUpcomingLaunches";
import { pageLimit } from "../articles/page";

// export const launchApiUrl = "https://ll.thespacedevs.com/2.2.0";
export const launchApiUrl = "https://lldev.thespacedevs.com/2.2.0"; // * For development

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["launches/upcoming"],
    queryFn: fetchUpcomingLaunches,
    staleTime: 10 * 60 * 1000,
    initialPageParam:
      launchApiUrl +
      `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: LaunchesUpcoming) => {
      return lastPage.next;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Launches />
    </HydrationBoundary>
  );
}
