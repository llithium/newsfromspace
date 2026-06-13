import { Metadata } from "next";
import Link from "next/link";
import { fetchUpcomingLaunches } from "@/lib/fetchUpcomingLaunches";
import { fetchArticlesAndBlogs } from "@/lib/fetchArticlesAndBlogs";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Photo from "@/components/ui/Photo";
import { statusPill } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import { spaceFlightNewsAPI, LaunchLibraryAPI } from "src/lib/variables";
import { LaunchesData } from "../launches/Launches";
import { ArticlesAndBlogs } from "../articles/Articles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mission Control · News From Space",
};

export default async function MissionControlPage() {
  const [launchData, articleData]: [LaunchesData, ArticlesAndBlogs] =
    await Promise.all([
      fetchUpcomingLaunches(
        LaunchLibraryAPI + `/launch/upcoming/?mode=detailed&limit=8&offset=0`,
      ),
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI + `/articles/?mode=detailed&limit=5&offset=0`,
      ),
    ]);

  const launches = launchData.results || [];
  const next = launches[0];
  const manifest = launches.slice(0, 5);
  const dispatches = (articleData.results || []).slice(0, 4);

  // derived stats
  const now = Date.now();
  const within48h = launches.filter(
    (l) => new Date(l.window_start).getTime() - now < 48 * 3600 * 1000,
  ).length;
  const goCount = launches.filter((l) => l.status?.abbrev === "Go").length;
  const liveUpdates = launches.reduce(
    (sum, l) => sum + (l.updates?.length || 0),
    0,
  );

  const nextPill = next ? statusPill(next.status?.abbrev) : null;

  return (
    <main className="wrap">
      <div className="ops-intro">
        <div>
          <div className="kicker">
            <span className="bar" style={{ maxWidth: 40 }}></span>Live Operations
          </div>
          <h1>Mission Control</h1>
        </div>
        <div className="ops-stat">
          <div className="s">
            <div className="n">{within48h}</div>
            <div className="l">Launches / 48h</div>
          </div>
          <div className="s">
            <div className="n">{goCount}</div>
            <div className="l">Go for launch</div>
          </div>
          <div className="s">
            <div className="n">{liveUpdates}</div>
            <div className="l">Live updates</div>
          </div>
        </div>
      </div>

      {/* countdown bay */}
      {next && (
        <div className="bay">
          <div className="b-left">
            <div className="lab">
              <span className="dot"></span> Next off Earth
            </div>
            <div className="veh">{next.name}</div>
            <div className="sub">
              {next.launch_service_provider?.name}
              <br />
              {next.pad?.location?.name}
              <br />
              {next.mission?.type || "Mission"}
              {next.mission?.orbit?.name ? ` · ${next.mission.orbit.name}` : ""}
            </div>
          </div>
          <div className="b-mid">
            <div className="lab" style={{ justifyContent: "center" }}>
              T-minus
            </div>
            <CountdownTimer date={next.window_start} variant="bay" />
            <div className="sub" style={{ textAlign: "center" }}>
              {formatDate(next.window_start)}
            </div>
          </div>
          <div className="b-right">
            {nextPill && (
              <span
                className={`pill ${nextPill.cls}`}
                style={{ alignSelf: "flex-start", fontSize: 11 }}
              >
                <span className="dot"></span>
                {nextPill.label}
              </span>
            )}
            {next.vidURLs?.[0]?.url && (
              <a href={next.vidURLs[0].url} target="_blank" rel="noreferrer">
                <button className="watch" style={{ marginTop: 0 }}>
                  ▶ Watch Live
                </button>
              </a>
            )}
            <Link href={`/launches/${next.id}`}>
              <button
                className="btn ghost"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Mission dossier →
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* manifest + dispatches */}
      <div className="ops-grid">
        <div className="manifest">
          <div className="section-head">
            ⌁ Launch Manifest · Upcoming<span className="bar"></span>
          </div>
          {manifest.map((m) => {
            const pill = statusPill(m.status?.abbrev);
            return (
              <Link key={m.id} href={`/launches/${m.id}`} className="block-link">
                <div className="mrow">
                  <div>
                    <div className="v">{m.name}</div>
                    <div className="p">
                      {m.launch_service_provider?.name}
                      {m.pad?.location?.name ? ` · ${m.pad.location.name}` : ""}
                    </div>
                  </div>
                  <span
                    className={`pill ${pill.cls}`}
                    style={{ fontSize: 9.5, padding: "2px 8px" }}
                  >
                    <span className="dot"></span>
                    {pill.label}
                  </span>
                  <div className="cd">
                    T- <CountdownTimer date={m.window_start} />
                  </div>
                </div>
              </Link>
            );
          })}
          <div style={{ marginTop: 18 }}>
            <Link href="/launches">
              <button className="btn ghost">Full manifest →</button>
            </Link>
          </div>
        </div>

        <div className="dispatch">
          <div className="section-head">
            ✉ Dispatches · Latest<span className="bar"></span>
          </div>
          {dispatches.map((d) => (
            <Link key={d.id} href={`/articles/${d.id}`} className="block-link">
              <div className="drow">
                <Photo
                  src={d.image_url}
                  caption={d.news_site}
                  className="ph"
                />
                <div>
                  <h3>{d.title}</h3>
                  <div className="byline" style={{ marginTop: 7 }}>
                    <span className="src">{d.news_site}</span>
                    <span>{formatDate(d.published_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ marginTop: 18 }}>
            <Link href="/articles">
              <button className="btn ghost">All dispatches →</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
