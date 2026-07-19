import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import Articles from "./Articles";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import ArticlesSearchResults from "./ArticlesSearchResults";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import { Suspense } from "react";
import { Metadata } from "next";
import { normalizePage, normalizeSearch, withSearchParam } from "@/lib/utils";

const SOURCES = [
  "NASA",
  "SpaceNews",
  "Arstechnica",
  "NASASpaceflight",
  "ESA",
  "European Spaceflight",
];

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title:
      (normalizeSearch(searchParams.q) &&
        `${normalizeSearch(searchParams.q)} search`) ||
      "Articles",
    description:
      "The latest reporting on launches, science, policy, and the space industry.",
    alternates: { canonical: "/articles" },
  };
}

function ArticlesIntro({ q }: { q?: string }) {
  return (
    <>
      <div className="page-intro">
        <div className="kicker">
          <span className="bar" style={{ maxWidth: 40 }}></span>The Dispatch
          Desk
        </div>
        <h1>Articles</h1>
        <p className="sub">
          Every dispatch from the world&apos;s space desks, newest first —
          launches, science, policy and the business of leaving Earth.
        </p>
      </div>

      <div className="filters">
        <Link
          className={["chip", !q ? "on" : ""].filter(Boolean).join(" ")}
          href="/articles"
        >
          All sources
        </Link>
        {SOURCES.map((s) => (
          <Link
            key={s}
            className={["chip", q === s ? "on" : ""].filter(Boolean).join(" ")}
            href={`/articles?q=${encodeURIComponent(s)}`}
          >
            {s}
          </Link>
        ))}
        <span className="spacer"></span>
        <span className="tag">Newest first</span>
      </div>
    </>
  );
}

export default async function Page(props: {
  searchParams: Promise<{ page: string; q: string }>;
}) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const page = normalizePage(searchParams.page);
  const q = normalizeSearch(searchParams.q);

  await queryClient.prefetchQuery({
    queryKey: ["articles", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });
  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ["articlesSearch", q, `page ${page}`],
      queryFn: () =>
        fetchArticlesAndBlogs(
          withSearchParam(
            spaceFlightNewsAPI +
              `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
            q,
          ),
        ),
    });
    return (
      <main className="wrap">
        <ArticlesIntro q={q} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <ArticlesSearchResults page={page} />
          </Suspense>
        </HydrationBoundary>
      </main>
    );
  }
  return (
    <main className="wrap">
      <ArticlesIntro />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Articles page={page} />
      </HydrationBoundary>
    </main>
  );
}
