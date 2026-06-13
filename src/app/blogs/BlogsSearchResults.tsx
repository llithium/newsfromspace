"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import { fetchArticlesAndBlogs } from "@/lib/fetchArticlesAndBlogs";
import BlogTimeline from "./BlogTimeline";

export default function BlogsSearchResults({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data, isError, error } = useQuery({
    queryKey: ["blogsSearch", search, `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}&search=${search}`,
      ),
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}
      {data && data.count !== 0 ? (
        <BlogTimeline
          results={data.results}
          count={data.count}
          page={page}
          search={search || ""}
        />
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
    </>
  );
}
