import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LaunchInformationPage from "./components/Launch";
import fetchLaunch from "../utils/fetchLaunch";
import { launchApiUrl } from "../page";

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
