import Link from "next/link";
import { fetchLatestArticles } from "./HomePage";
import Photo from "@/components/ui/Photo";
import { ArticlesAndBlogs } from "./articles/Articles";
import { formatDate } from "@/lib/utils";

// Renders two front-page grid cells: the left "Brief" rail and the center
// "Lead Story" well — both from a single latest-articles fetch.
const HomeArticles = async () => {
  const data: ArticlesAndBlogs = await fetchLatestArticles();
  const results = data.results || [];
  const lead = results[0];
  const brief = results.slice(1, 4);

  return (
    <>
      <div className="rail-l">
        {brief.map((a, i) => (
          <div key={a.id}>
            <Link className="block-link" href={`/articles/${a.id}`}>
              <div className="story">
                {i === 0 && (
                  <div className="kicker" style={{ marginBottom: 11 }}>
                    <span className="bar"></span>The Brief
                  </div>
                )}
                {i === 0 && <Photo src={a.image_url} caption={a.news_site} />}
                <h2 className="hl" style={{ fontSize: i === 0 ? 24 : 19 }}>
                  {a.title}
                </h2>
                <div className="sub">{a.summary}</div>
                <div className="byline">
                  <span className="src">{a.news_site}</span>
                  <span>{formatDate(a.published_at)}</span>
                </div>
              </div>
            </Link>
            {i < brief.length - 1 && <hr className="hr" />}
          </div>
        ))}
      </div>

      <div className="lead">
        {lead && (
          <Link className="block-link" href={`/articles/${lead.id}`}>
            <div className="kicker">
              <span className="bar"></span>Lead Story · Industry
              <span className="bar"></span>
            </div>
            <h1 className="headline">{lead.title}</h1>
            <p className="dek">{lead.summary}</p>
            <Photo src={lead.image_url} caption={lead.news_site} />
            <div className="byline">
              <span className="src">{lead.news_site}</span>
              <span>{formatDate(lead.published_at)}</span>
              <span>·</span>
              <span>Read the dispatch →</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default HomeArticles;
