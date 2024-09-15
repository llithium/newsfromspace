import { LaunchesData } from "../app/launches/Launches";

export async function fetchPastLaunches(pageParam: string) {
  try {
    const apiResponse = await fetch(pageParam, { cache: "no-cache" });
    const pastLaunches: LaunchesData = await apiResponse.json();
    return pastLaunches;
  } catch (error) {
    throw new Error("API request failed");
  }
}
