"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPastLaunches } from "../../../lib/fetchPastLaunches";
import { LaunchLibraryAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";
import LaunchRows from "../LaunchRows";

export default function PastLaunches({ page }: { page: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["launches/previous", `page ${page}`],
    queryFn: () =>
      fetchPastLaunches(
        LaunchLibraryAPI +
          `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}
      {data && <LaunchRows results={data.results} mode="past" />}
      {data?.count ? (
        <div className="loadmore">
          <PageButtons count={data.count} page={page} />
        </div>
      ) : null}
    </>
  );
}
