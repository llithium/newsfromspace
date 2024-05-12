import { LaunchesData } from "@/launches/components/Launches";

export async function fetchPastLaunches({ pageParam }: { pageParam: string }) {
  try {
    const apiResponse = await fetch(pageParam, { next: { revalidate: 900 } });
    const pastLaunches: LaunchesData = await apiResponse.json();
    return pastLaunches;
  } catch (error) {
    console.log(error);
    throw new Error("API request failed");
  }
}
