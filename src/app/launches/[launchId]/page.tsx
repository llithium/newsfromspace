import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LaunchInformationPage, { Launch } from "./components/Launch";
import fetchLaunch from "../utils/fetchLaunch";
import { launchApiUrl } from "../page";
import { Metadata } from "next";
import { apiURL } from "../../articles/page";
import { Result } from "../../articles/components/Articles";

export async function generateMetadata({
  params,
}: {
  params: { launchId: string };
}): Promise<Metadata> {
  // read route params
  const launchId = params.launchId;

  // fetch data
  const launch: Launch = await fetch(launchApiUrl + `/launch/${launchId}`).then(
    (res) => res.json(),
  );

  return {
    title: launch.name,
  };
}

export default async function Page({
  params,
}: {
  params: { launchId: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 3 * 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, launchApiUrl),
  });

  async function fetchRelated(launchId: string) {
    const res = await fetch(apiURL + `/articles/?launch=${launchId}`, {
      next: { revalidate: 180 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data for related articles");
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
