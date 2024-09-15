import { LaunchesData } from "../app/launches/Launches";

export async function fetchUpcomingLaunches(pageParam: string) {
  try {
    const apiResponse = await fetch(pageParam, { cache: "no-cache" });
    const LaunchesUpcoming: LaunchesData = await apiResponse.json();
    return LaunchesUpcoming;
  } catch (error) {
    throw new Error("API request failed");
  }
}
