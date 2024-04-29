import { LaunchesUpcoming } from "../routes/LaunchesPage";

export async function fetchUpcomingLaunches({
  pageParam,
}: {
  pageParam: string;
}) {
  try {
    const apiResponse = await fetch(pageParam);
    const LaunchesUpcoming: LaunchesUpcoming = await apiResponse.json();
    return LaunchesUpcoming;
  } catch (error) {
    console.log(error);
    throw new Error("API request failed");
  }
}
