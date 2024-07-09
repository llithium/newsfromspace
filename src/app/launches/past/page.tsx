import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchPastLaunches } from "./utils/fetchPastLaunches";
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

export const maxDuration = 30;

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; q: string };
}) {
  const queryClient = new QueryClient();
  const page = parseInt(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["launches/previous", `page ${page}`],
    queryFn: () =>
      fetchPastLaunches(
        launchApiUrl +
          `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 10 * 60 * 1000,
  });
  if (searchParams.q) {
    await queryClient.prefetchQuery({
      queryKey: ["pastLaunchesSearch", searchParams.q, `page ${page}`],
      queryFn: () =>
        fetchPastLaunches(
          launchApiUrl +
            `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}&search=${searchParams.q}`,
        ),
      staleTime: 15 * 60 * 1000,
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <PastLaunchesSearchResults page={page} />
        </Suspense>
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PastLaunches page={page} />
      </HydrationBoundary>
    );
  }
}
