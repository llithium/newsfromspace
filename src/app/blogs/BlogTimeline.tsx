import Photo from "@/components/ui/Photo";
import PageButtons from "src/components/ui/PageButtons";
import { Result } from "../articles/Articles";
import { cleanSummary } from "@/lib/utils";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function relativeLabel(date: Date) {
  const today = startOfDay(new Date());
  const day = startOfDay(new Date(date));
  const diff = Math.round((today - day) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

function groupByDay(results: Result[]) {
  const groups: { key: string; label: string; rel: string; items: Result[] }[] =
    [];
  const index = new Map<string, number>();
  for (const b of results) {
    const date = new Date(b.published_at);
    const key = date.toDateString();
    if (!index.has(key)) {
      index.set(key, groups.length);
      groups.push({
        key,
        label: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        rel: relativeLabel(date),
        items: [],
      });
    }
    groups[index.get(key)!].items.push(b);
  }
  return groups;
}

export default function BlogTimeline({
  results,
  count,
  page,
  search,
}: {
  results: Result[];
  count?: number;
  page: number;
  search?: string;
}) {
  const groups = groupByDay(results);

  return (
    <div className="logbook">
      <div className="spine">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="daymark">
              <div className="d">{g.label}</div>
              <div className="rel">{g.rel}</div>
            </div>
            {g.items.map((e, i) => (
              <article className="entry" key={e.id}>
                <div className="body">
                  <div className="tagline">
                    {e.news_site} ·{" "}
                    {new Date(e.published_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  <h2>{e.title}</h2>
                  <p>{cleanSummary(e.summary)}</p>
                  <div style={{ marginTop: 14 }}>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn ghost"
                      style={{ padding: "7px 14px" }}
                    >
                      Read the log →
                    </a>
                  </div>
                </div>
                <Photo
                  src={e.image_url}
                  caption={e.news_site}
                  className={i % 2 ? "alt ph" : "ph"}
                  decorative
                />
              </article>
            ))}
          </div>
        ))}
      </div>
      {count ? (
        <div className="loadmore">
          <PageButtons count={count} page={page} search={search} />
        </div>
      ) : null}
    </div>
  );
}
