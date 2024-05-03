import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LaunchInformationPage, { Launch } from "./components/Launch";
import fetchLaunch from "../utils/fetchLaunch";
import { launchApiUrl } from "../page";
import { Metadata } from "next";

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
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, launchApiUrl),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LaunchInformationPage params={params} />
    </HydrationBoundary>
  );
}
