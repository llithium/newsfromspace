import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import fetchLaunch from "../../../lib/fetchLaunch";
import { Metadata } from "next";
import { Result } from "../../articles/Articles";
import { notFound } from "next/navigation";
import { spaceFlightNewsAPI, LaunchLibraryAPI } from "src/lib/variables";
import LaunchInformationPage, { Launch } from "./Launch";

export async function generateMetadata(
  props: {
    params: Promise<{ launchId: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const launchId = params.launchId;

  // fetch data
  const launch: Launch = await fetch(
    LaunchLibraryAPI + `/launch/${launchId}`,
  ).then((res) => {
    if (!res.ok) {
      return;
    }
    return res.json();
  });

  return {
    title: (launch && launch.name) || "",
  };
}

export default async function Page(
  props: {
    params: Promise<{ launchId: string }>;
  }
) {
  const params = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 3 * 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, LaunchLibraryAPI),
  });

  async function fetchRelated(launchId: string) {
    const res = await fetch(
      spaceFlightNewsAPI + `/articles/?launch=${launchId}`,
    );
    if (!res.ok) {
      notFound();
    }
    return res.json();
  }

  const relatedData: RelatedArticles = await fetchRelated(params.launchId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LaunchInformationPage relatedData={relatedData} params={params} />
    </HydrationBoundary>
  );
}
export interface RelatedArticles {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}
