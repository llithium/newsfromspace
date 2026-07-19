"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import { cleanSummary, formatDate } from "@/lib/utils";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";

export default function Articles({ page }: { page: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["articles", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });

  const results = data?.results || [];
  const featured = page === 1 ? results[0] : undefined;
  const rest = featured ? results.slice(1) : results;

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}

      {featured && (
        <Link className="block-link" href={`/articles/${featured.id}`}>
          <div className="feat">
            <Photo
              src={featured.image_url}
              caption={featured.news_site}
              alt={featured.title}
              priority
            />
            <div className="lead-meta">
              <div className="kicker">Featured · Latest</div>
              <h2
                className="hl"
                style={{ fontSize: "clamp(30px,3vw,44px)", marginTop: 12 }}
              >
                {featured.title}
              </h2>
              <p className="dek" style={{ fontSize: 18 }}>
                {cleanSummary(featured.summary)}
              </p>
              <div className="byline">
                <span className="src">{featured.news_site}</span>
                <span>{formatDate(featured.published_at)}</span>
                <span>·</span>
                <span>Read →</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="agrid">
        {rest.map((article) => (
          <Link
            className="block-link"
            key={article.id}
            href={`/articles/${article.id}`}
          >
            <div className="item">
              <Photo
                src={article.image_url}
                caption={article.news_site}
                decorative
              />
              <div className="body">
                <h2 className="hl" style={{ fontSize: 21 }}>
                  {article.title}
                </h2>
                <div className="sub" style={{ fontSize: 15 }}>
                  {cleanSummary(article.summary)}
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

      {data?.count ? (
        <div className="loadmore">
          <PageButtons count={data.count} page={page} />
        </div>
      ) : null}
    </>
  );
}

export interface ArticlesAndBlogs {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

export interface Event {
  event_id: number;
  provider: string;
}

export interface Launch {
  launch_id: string;
  provider: string;
}
