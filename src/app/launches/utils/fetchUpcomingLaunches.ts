import { LaunchesData } from "../components/Launches";

export async function fetchUpcomingLaunches(pageParam: string) {
  try {
    const apiResponse = await fetch(pageParam, { next: { revalidate: 900 } });
    const LaunchesUpcoming: LaunchesData = await apiResponse.json();
    return LaunchesUpcoming;
  } catch (error) {
    throw new Error("API request failed");
  }
}
