import { LaunchesData } from "../app/launches/Launches";
import { fetchJson } from "./api";

export async function fetchUpcomingLaunches(pageParam: string) {
  return fetchJson<LaunchesData>(pageParam, {
    label: "Upcoming launches request",
    revalidate: 60,
  });
}
