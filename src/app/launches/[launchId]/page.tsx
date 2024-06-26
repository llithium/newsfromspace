import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LaunchInformationPage, { Launch } from "./components/Launch";
import fetchLaunch from "../utils/fetchLaunch";
import { Metadata } from "next";
import { Result } from "../../articles/components/Articles";
import { notFound } from "next/navigation";
import { apiURL, launchApiUrl } from "@/utils/variables";

export async function generateMetadata({
  params,
}: {
  params: { launchId: string };
}): Promise<Metadata> {
  // read route params
  const launchId = params.launchId;

  // fetch data
  const launch: Launch = await fetch(launchApiUrl + `/launch/${launchId}`).then(
    (res) => {
      if (!res.ok) {
        return;
      }
      return res.json();
    },
  );

  return {
    title: (launch && launch.name) || "",
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
