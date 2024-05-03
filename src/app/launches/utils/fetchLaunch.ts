import { Launch } from "../[launchId]/components/Launch";

export default async function fetchLaunch(
  launchId: string | undefined,
  launchApiUrl: string,
) {
  if (launchId) {
    try {
      const apiResponse = await fetch(launchApiUrl + `/launch/${launchId}`);
      const launch: Launch = await apiResponse.json();
      return launch;
    } catch (error) {
      console.log(error);
      throw new Error("API request failed");
    }
  }
}
