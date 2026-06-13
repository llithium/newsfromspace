import Link from "next/link";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { statusPill } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import { Result } from "./Launches";

function dayLabel(date: Date) {
  const d = new Date(date);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const md = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return `${weekday} · ${md}`;
}

function groupByDay(results: Result[]) {
  const groups: { key: string; label: string; items: Result[] }[] = [];
  const index = new Map<string, number>();
  for (const l of results) {
    const date = l.window_start || l.net;
    const key = new Date(date).toDateString();
    if (!index.has(key)) {
      index.set(key, groups.length);
      groups.push({ key, label: dayLabel(date), items: [] });
    }
    groups[index.get(key)!].items.push(l);
  }
  return groups;
}

function ProviderMark({ launch }: { launch: Result }) {
  const lsp = launch.launch_service_provider;
  const logo = lsp?.logo_url;
  const fallback = (lsp?.abbrev || lsp?.name || "—").slice(0, 3).toUpperCase();
  return (
    <div className="mark">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={lsp?.name || "Provider"} loading="lazy" />
      ) : (
        fallback
      )}
    </div>
  );
}

export default function LaunchRows({
  results,
  mode,
}: {
  results: Result[];
  mode: "upcoming" | "past";
}) {
  const groups = groupByDay(results);

  return (
    <>
      {groups.map((g) => (
        <div key={g.key}>
          <div className="daygroup">
            {g.label}
            <span className="bar"></span>
          </div>
          {g.items.map((l) => {
            const pill = statusPill(l.status?.abbrev);
            return (
              <Link
                className="block-link"
                key={l.id}
                href={`/launches/${l.id}`}
              >
                <div className="lrow">
                  <ProviderMark launch={l} />
                  <div className="main">
                    <h2 className="hl">{l.name}</h2>
                    <div className="meta">
                      <span>
                        <b>{l.launch_service_provider?.name}</b>
                      </span>
                      {l.pad?.location?.name && (
                        <span>{l.pad.location.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="when">
                    {mode === "upcoming" ? (
                      <div className="cd">
                        T- <CountdownTimer date={l.window_start} />
                      </div>
                    ) : (
                      <div
                        className="cd"
                        style={{
                          color:
                            pill.cls === "fail"
                              ? "#d24b4b"
                              : "var(--go)",
                        }}
                      >
                        {pill.label}
                      </div>
                    )}
                    <div className="date">{formatDate(l.window_start)}</div>
                  </div>
                  <div className="stat">
                    <span className={`pill ${pill.cls}`}>
                      <span className="dot"></span>
                      {pill.label}
                    </span>
                    <span className="tag">{l.mission?.type || "Payload"}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}
