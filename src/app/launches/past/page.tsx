import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchPastLaunches } from "../../../lib/fetchPastLaunches";
import PastLaunches from "./PastLaunches";
import PastLaunchesSearchResults from "./PastLaunchesSearchResults";
import LaunchesIntro from "../LaunchesIntro";
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
      "Past Launches",
    description:
      "Recent launch results and mission outcomes from around the world.",
    alternates: { canonical: "/launches/past" },
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
    queryKey: ["launches/previous", `page ${page}`],
    queryFn: () =>
      fetchPastLaunches(
        LaunchLibraryAPI +
          `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 10 * 60 * 1000,
  });
  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ["pastLaunchesSearch", q, `page ${page}`],
      queryFn: () =>
        fetchPastLaunches(
          withSearchParam(
            LaunchLibraryAPI +
              `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
            q,
          ),
        ),
      staleTime: 15 * 60 * 1000,
    });
    return (
      <main className="wrap">
        <LaunchesIntro active="past" q={q} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <PastLaunchesSearchResults page={page} />
          </Suspense>
        </HydrationBoundary>
      </main>
    );
  } else {
    return (
      <main className="wrap">
        <LaunchesIntro active="past" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PastLaunches page={page} />
        </HydrationBoundary>
      </main>
    );
  }
}
