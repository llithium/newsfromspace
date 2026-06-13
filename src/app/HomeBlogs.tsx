import { fetchLatestBlogs } from "./HomePage";
import Photo from "@/components/ui/Photo";
import { ArticlesAndBlogs } from "./articles/Articles";
import { formatDate } from "@/lib/utils";

// Renders the 4-up story band beneath the front-page grid.
const HomeBlogs = async () => {
  const data: ArticlesAndBlogs = await fetchLatestBlogs();
  const items = (data.results || []).slice(0, 4);

  return (
    <>
      {items.map((b, i) => (
        <a
          key={b.id}
          className="block-link cell story"
          href={b.url}
          target="_blank"
          rel="noreferrer"
        >
          <Photo
            src={b.image_url}
            caption={b.news_site}
            className={i % 2 ? "alt" : undefined}
          />
          <h2 className="hl" style={{ fontSize: 19 }}>
            {b.title}
          </h2>
          <div className="byline">
            <span className="src">{b.news_site}</span>
            <span>{formatDate(b.published_at)}</span>
          </div>
        </a>
      ))}
    </>
  );
};

export default HomeBlogs;
