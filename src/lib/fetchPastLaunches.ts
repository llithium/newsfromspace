import { LaunchesData } from "../app/launches/Launches";
import { fetchJson } from "./api";

export async function fetchPastLaunches(pageParam: string) {
  return fetchJson<LaunchesData>(pageParam, {
    label: "Past launches request",
    revalidate: 300,
  });
}
