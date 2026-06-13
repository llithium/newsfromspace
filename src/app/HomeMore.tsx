import Link from "next/link";
import { spaceFlightNewsAPI } from "src/lib/variables";
import { ArticlesAndBlogs } from "./articles/Articles";

// "More" ticker — a teal-tagged strip of headline links.
const HomeMore = async () => {
  const res = await fetch(
    spaceFlightNewsAPI + `/articles/?limit=5&offset=10`,
    { cache: "no-cache" },
  );
  if (!res.ok) return null;
  const data: ArticlesAndBlogs = await res.json();
  const items = (data.results || []).slice(0, 5);
  if (!items.length) return null;

  return (
    <div className="more">
      <div className="mtag">→ More</div>
      <div className="items">
        {items.map((a) => (
          <Link key={a.id} className="it" href={`/articles/${a.id}`}>
            {a.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeMore;
