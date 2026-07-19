import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import fetchLaunch from "../../../lib/fetchLaunch";
import { Metadata } from "next";
import { Result } from "../../articles/Articles";
import { spaceFlightNewsAPI, LaunchLibraryAPI } from "src/lib/variables";
import LaunchInformationPage, { Launch } from "./Launch";
import { fetchJson } from "@/lib/api";

export async function generateMetadata(props: {
  params: Promise<{ launchId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const launchId = params.launchId;

  // fetch data
  const launch = await fetchJson<Launch>(
    LaunchLibraryAPI + `/launch/${encodeURIComponent(launchId)}`,
    { label: "Launch metadata request", revalidate: 60 },
  ).catch(() => undefined);

  return {
    title: launch?.name || "Launch",
    description: launch?.mission?.description || launch?.status?.description,
    alternates: { canonical: `/launches/${launchId}` },
    openGraph: launch
      ? {
          title: launch.name,
          description:
            launch.mission?.description || launch.status?.description,
          images: launch.image ? [{ url: launch.image }] : undefined,
        }
      : undefined,
  };
}

export default async function Page(props: {
  params: Promise<{ launchId: string }>;
}) {
  const params = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 3 * 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, LaunchLibraryAPI),
  });

  async function fetchRelated(launchId: string) {
    return fetchJson<RelatedArticles>(
      spaceFlightNewsAPI + `/articles/?launch=${launchId}`,
      { label: "Related launch articles request", revalidate: 300 },
    ).catch(() => ({ count: 0, next: null, previous: null, results: [] }));
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
