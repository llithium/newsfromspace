import Link from "next/link";
import { spaceFlightNewsAPI } from "src/lib/variables";
import { ArticlesAndBlogs } from "./articles/Articles";
import { fetchJson } from "@/lib/api";

// "More" ticker — a teal-tagged strip of headline links.
const HomeMore = async () => {
  const data = await fetchJson<ArticlesAndBlogs>(
    spaceFlightNewsAPI + `/articles/?limit=5&offset=10`,
    { label: "More articles request", revalidate: 300 },
  ).catch(() => null);
  if (!data) return null;
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
