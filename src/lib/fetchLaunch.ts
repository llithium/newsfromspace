import { Launch } from "@/app/launches/[launchId]/Launch";
import { fetchJson } from "./api";

export default async function fetchLaunch(
  launchId: string | undefined,
  launchApiUrl: string,
) {
  if (launchId) {
    return fetchJson<Launch>(
      launchApiUrl + `/launch/${encodeURIComponent(launchId)}`,
      { label: "Launch request", revalidate: 60 },
    );
  }
}
