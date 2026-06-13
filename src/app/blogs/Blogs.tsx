"use client";
import { useQuery } from "@tanstack/react-query";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import { fetchArticlesAndBlogs } from "@/lib/fetchArticlesAndBlogs";
import BlogTimeline from "./BlogTimeline";

export default function Blogs({ page }: { page: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["blogs", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}
      {data && (
        <BlogTimeline results={data.results} count={data.count} page={page} />
      )}
    </>
  );
}
