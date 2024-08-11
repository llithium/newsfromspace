import { LaunchesData } from "../app/launches/Launches";

export async function fetchPastLaunches(pageParam: string) {
  try {
    const apiResponse = await fetch(pageParam, { next: { revalidate: 900 } });
    const pastLaunches: LaunchesData = await apiResponse.json();
    return pastLaunches;
  } catch (error) {
    throw new Error("API request failed");
  }
}
