import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import { formatDate } from "@/lib/utils";
import { spaceFlightNewsAPI } from "src/lib/variables";
import { Result } from "../Articles";
import { fetchJson } from "@/lib/api";
import { cleanSummary } from "@/lib/utils";

export const revalidate = 300;

interface Article extends Result {
  authors?: { name: string }[];
}

async function getArticle(id: string): Promise<Article | undefined> {
  return fetchJson<Article>(
    spaceFlightNewsAPI + `/articles/${encodeURIComponent(id)}/`,
    { label: "Article request", revalidate: 300 },
  ).catch(() => undefined);
}

async function getRelated(): Promise<Result[]> {
  return fetchJson<{ results?: Result[] }>(
    spaceFlightNewsAPI + `/articles/?mode=detailed&limit=4&offset=0`,
    { label: "Related articles request", revalidate: 300 },
  )
    .then((data) => data.results || [])
    .catch(() => []);
}

export async function generateMetadata(props: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await props.params;
  const article = await getArticle(articleId);
  const description = article ? cleanSummary(article.summary) : undefined;
  return {
    title: article?.title || "Article",
    description,
    alternates: { canonical: `/articles/${articleId}` },
    openGraph: article
      ? {
          type: "article",
          title: article.title,
          description,
          publishedTime: new Date(article.published_at).toISOString(),
          images: article.image_url ? [{ url: article.image_url }] : undefined,
        }
      : undefined,
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await props.params;
  const [article, relatedAll] = await Promise.all([
    getArticle(articleId),
    getRelated(),
  ]);
  if (!article) notFound();

  const related = relatedAll
    .filter((r) => String(r.id) !== String(article.id))
    .slice(0, 3);

  const words = (article.summary || "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(words / 200));
  const authors = article.authors?.map((a) => a.name).join(", ");
  const summary = cleanSummary(article.summary);

  return (
    <main className="wrap">
      <div className="crumb">
        <Link href="/articles">Articles</Link>
        <span className="sep">/</span>
        <span>{article.news_site}</span>
      </div>

      <article className="article">
        <div className="head">
          <div className="kicker" style={{ justifyContent: "center" }}>
            {article.news_site} · Dispatch
          </div>
          <h1>{article.title}</h1>
          <p className="standfirst">{summary}</p>
          <div className="meta">
            <span className="src">{article.news_site}</span>
            {authors && <span>By {authors}</span>}
            <span>{formatDate(article.published_at)}</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </article>

      <div className="hero-img">
        <Photo
          src={article.image_url}
          caption={article.news_site}
          alt={article.title}
          priority
        />
        <div className="credit">Photograph · {article.news_site}</div>
      </div>

      <div className="prose">
        <p className="drop">{summary}</p>
        <p>
          This dispatch is summarised from {article.news_site}. The full report,
          with the complete reporting and any media, is available at the
          original source.
        </p>
      </div>

      <div className="actionbar">
        <Link href="/articles" className="btn ghost">
          ← Back to the desk
        </Link>
        <span className="spacer"></span>
        <a
          className="btn accent"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read at source ↗
        </a>
      </div>

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            More From the Desk<span className="bar"></span>
          </div>
          <div className="rgrid">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/articles/${r.id}`}
                className="block-link"
              >
                <div className="story">
                  <Photo src={r.image_url} caption={r.news_site} />
                  <h3>{r.title}</h3>
                  <div className="byline">
                    <span className="src">{r.news_site}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
