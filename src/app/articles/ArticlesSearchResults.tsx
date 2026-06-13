"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Photo from "@/components/ui/Photo";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import { formatDate } from "@/lib/utils";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";

export default function ArticlesSearchResults({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data, isError, error } = useQuery({
    queryKey: ["articlesSearch", search, `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/articles/?limit=${pageLimit}&offset=0&search=${search}`,
      ),
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}

      {data && data.count !== 0 ? (
        <div className="agrid">
          {data.results.map((article) => (
            <Link
              className="block-link"
              key={article.id}
              href={`/articles/${article.id}`}
            >
              <div className="item">
                <Photo src={article.image_url} caption={article.news_site} />
                <div className="body">
                  <h2 className="hl" style={{ fontSize: 21 }}>
                    {article.title}
                  </h2>
                  <div className="sub" style={{ fontSize: 15 }}>
                    {article.summary}
                  </div>
                  <div className="byline">
                    <span className="src">{article.news_site}</span>
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
