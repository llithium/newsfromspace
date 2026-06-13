"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchUpcomingLaunches } from "../../lib/fetchUpcomingLaunches";
import { LaunchLibraryAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";
import LaunchRows from "./LaunchRows";

export default function LaunchesSearchResults({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data, isError, error } = useQuery({
    queryKey: ["launchesSearch", search, `page ${page}`],
    queryFn: () =>
      fetchUpcomingLaunches(
        LaunchLibraryAPI +
          `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}&search=${search}`,
      ),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}
      {data && data.count !== 0 ? (
        <LaunchRows results={data.results} mode="upcoming" />
      ) : (
        search && (
          <div className="page-intro" style={{ borderBottom: "none" }}>
            <h2 className="hl" style={{ fontSize: 28 }}>
              No results found for:{" "}
              <span style={{ color: "var(--accent-ink)" }}>{search}</span>
            </h2>
          </div>
        )
      )}
      {data?.count ? (
        <div className="loadmore">
          <PageButtons count={data.count} search={search || ""} page={page} />
        </div>
      ) : null}
    </>
  );
}
