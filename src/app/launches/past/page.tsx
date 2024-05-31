import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchPastLaunches } from "./utils/fetchPastLaunches";
import { LaunchesData } from "../components/Launches";
import PastLaunches from "./components/PastLaunches";
import PastLaunchesSearchResults from "./components/PastLaunchesSearchResults";
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
      "Past Launches · News From Space",
  };
}

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
        <Suspense>
          <PastLaunchesSearchResults />
        </Suspense>
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
