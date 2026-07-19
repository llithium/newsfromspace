import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import { Suspense } from "react";
import { Metadata } from "next";
import BlogsSearchResults from "./BlogsSearchResults";
import Blogs from "./Blogs";
import { normalizePage, normalizeSearch, withSearchParam } from "@/lib/utils";

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title:
      (normalizeSearch(searchParams.q) &&
        `${normalizeSearch(searchParams.q)} search`) ||
      "Blogs",
    description:
      "Field notes and daily updates from space agencies and missions.",
    alternates: { canonical: "/blogs" },
  };
}

export default async function Page(props: {
  searchParams: Promise<{ page: string; q: string }>;
}) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const page = normalizePage(searchParams.page);
  const q = normalizeSearch(searchParams.q);

  await queryClient.prefetchQuery({
    queryKey: ["blogs", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });
  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ["blogsSearch", q, `page ${page}`],
      queryFn: () =>
        fetchArticlesAndBlogs(
          withSearchParam(
            spaceFlightNewsAPI +
              `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
            q,
          ),
        ),
    });
    return (
      <main className="wrap">
        <LogbookIntro />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <BlogsSearchResults page={page} />
          </Suspense>
        </HydrationBoundary>
      </main>
    );
  } else {
    return (
      <main className="wrap">
        <LogbookIntro />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Blogs page={page} />
        </HydrationBoundary>
      </main>
    );
  }
}

function LogbookIntro() {
  return (
    <div
      className="page-intro"
      style={{ textAlign: "center", borderBottom: "none", paddingBottom: 6 }}
    >
      <div className="kicker" style={{ justifyContent: "center" }}>
        <span className="bar" style={{ maxWidth: 40 }}></span>Field Notes From
        Orbit<span className="bar" style={{ maxWidth: 40 }}></span>
      </div>
      <h1 style={{ fontStyle: "italic" }}>The Logbook</h1>
      <p
        className="sub"
        style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
      >
        The daily diary of life aboard the station and the people working it —
        kept day by day, newest entry on top.
      </p>
    </div>
  );
}
