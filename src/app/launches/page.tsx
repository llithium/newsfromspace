import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Launches from "./Launches";
import { fetchUpcomingLaunches } from "../../lib/fetchUpcomingLaunches";
import LaunchesSearchResults from "./LaunchesSearchResults";
import LaunchesIntro from "./LaunchesIntro";
import { LaunchLibraryAPI, pageLimit } from "src/lib/variables";
import { Suspense } from "react";
import { Metadata } from "next";
import { normalizePage, normalizeSearch, withSearchParam } from "@/lib/utils";

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title:
      (normalizeSearch(searchParams.q) &&
        `${normalizeSearch(searchParams.q)} launch search`) ||
      "Upcoming Launches",
    description:
      "Upcoming launch windows, providers, destinations, and live countdowns.",
    alternates: { canonical: "/launches" },
  };
}

export const maxDuration = 30;

export default async function Page(props: {
  searchParams: Promise<{ page: string; q: string }>;
}) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const page = normalizePage(searchParams.page);
  const q = normalizeSearch(searchParams.q);

  await queryClient.prefetchQuery({
    queryKey: ["launches/upcoming", `page ${page}`],
    queryFn: () =>
      fetchUpcomingLaunches(
        LaunchLibraryAPI +
          `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 10 * 60 * 1000,
  });
  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ["launchesSearch", q, `page ${page}`],
      queryFn: () =>
        fetchUpcomingLaunches(
          withSearchParam(
            LaunchLibraryAPI +
              `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
            q,
          ),
        ),
      staleTime: 15 * 60 * 1000,
    });
    return (
      <main className="wrap">
        <LaunchesIntro active="upcoming" q={q} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <LaunchesSearchResults page={page} />
          </Suspense>
        </HydrationBoundary>
      </main>
    );
  } else {
    return (
      <main className="wrap">
        <LaunchesIntro active="upcoming" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Launches page={page} />
        </HydrationBoundary>
      </main>
    );
  }
}
