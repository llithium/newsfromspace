import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Launches, { LaunchesData } from "./components/Launches";
import { fetchUpcomingLaunches } from "./utils/fetchUpcomingLaunches";
import LaunchesSearchResults from "./components/LaunchesSearchResults";
import { launchApiUrl, pageLimit } from "@/utils/variables";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  return {
    title:
      (searchParams.q && searchParams.q + " · News From Space") ||
      "Upcoming Launches · News From Space",
  };
}

export const maxDuration = 30;

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["launches/upcoming"],
    queryFn: fetchUpcomingLaunches,
    staleTime: 10 * 60 * 1000,
    initialPageParam:
      launchApiUrl +
      `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=0`,
    getNextPageParam: (lastPage: LaunchesData) => {
      return lastPage.next;
    },
  });
  if (searchParams.q) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["launchesSearch", searchParams.q],
      queryFn: fetchUpcomingLaunches,
      staleTime: 15 * 60 * 1000,
      initialPageParam:
        launchApiUrl +
        `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=0&search=${searchParams.q}`,
      getNextPageParam: (lastPage: LaunchesData) => {
        return lastPage.next;
      },
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <LaunchesSearchResults />
        </Suspense>
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Launches />
      </HydrationBoundary>
    );
  }
}
