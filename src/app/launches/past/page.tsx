import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchPastLaunches } from "../../../lib/fetchPastLaunches";
import PastLaunches from "./PastLaunches";
import PastLaunchesSearchResults from "./PastLaunchesSearchResults";
import { LaunchLibraryAPI, pageLimit } from "src/lib/variables";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata(
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title:
      (searchParams.q && searchParams.q + " · News From Space") ||
      "Past Launches · News From Space",
  };
}

export const maxDuration = 30;

export default async function Page(
  props: {
    searchParams: Promise<{ page: string; q: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const page = parseInt(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["launches/previous", `page ${page}`],
    queryFn: () =>
      fetchPastLaunches(
        LaunchLibraryAPI +
          `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 10 * 60 * 1000,
  });
  if (searchParams.q) {
    await queryClient.prefetchQuery({
      queryKey: ["pastLaunchesSearch", searchParams.q, `page ${page}`],
      queryFn: () =>
        fetchPastLaunches(
          LaunchLibraryAPI +
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
