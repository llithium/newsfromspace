import Link from "next/link";
import { fetchUpcomingLaunchesHomePage } from "./HomePage";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Photo from "@/components/ui/Photo";
import { LaunchesData } from "./launches/Launches";
import { statusPill } from "@/lib/status";
import { formatDate } from "@/lib/utils";

const metaColor = (cls: string) =>
  cls === "go" || cls === "success"
    ? "var(--go)"
    : cls === "fail"
      ? "#d24b4b"
      : "var(--warn)";

// Renders the right "rail" cell: live countdown card, upcoming list, secondary.
const HomeLaunches = async () => {
  const data: LaunchesData = await fetchUpcomingLaunchesHomePage();
  const results = data.results || [];
  const next = results[0];
  const list = results.slice(1, 5);
  const secondary = results[5] || results[1];
  const pill = next ? statusPill(next.status?.abbrev) : null;

  return (
    <div className="rail-r">
      {next && (
        <div className="countdown">
          <div className="lab">
            <span className="dot"></span> Next Launch
          </div>
          <div className="veh">{next.name}</div>
          <div className="prov">
            {next.launch_service_provider?.name}
            {next.pad?.location?.name ? ` · ${next.pad.location.name}` : ""}
          </div>
          <CountdownTimer date={next.window_start} variant="card" />
          <div className="meta">
            <span>{formatDate(next.window_start)}</span>
            {pill && (
              <span style={{ color: metaColor(pill.cls), fontWeight: 600 }}>
                ● {pill.label}
              </span>
            )}
          </div>
          <Link className="block-link" href={`/launches/${next.id}`}>
            <button className="watch">▶ Watch Live</button>
          </Link>
        </div>
      )}

      <hr className="hr" />
      <div className="section-head">
        Upcoming Launches<span className="bar"></span>
      </div>
      <div className="ulist">
        {list.map((l) => (
          <Link className="block-link" key={l.id} href={`/launches/${l.id}`}>
            <div className="row">
              <div>
                <div className="t">{l.name}</div>
                <div className="p">{l.launch_service_provider?.name}</div>
              </div>
              <div className="cd">
                T- <CountdownTimer date={l.window_start} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {secondary && (
        <>
          <hr className="hr" />
          <Link className="block-link" href={`/launches/${secondary.id}`}>
            <div className="story">
              <Photo
                src={secondary.image}
                caption={secondary.launch_service_provider?.name}
                className="alt"
              />
              <h2 className="hl" style={{ fontSize: 19, marginTop: 12 }}>
                {secondary.name}
              </h2>
              <div className="byline">
                <span className="src">
                  {secondary.launch_service_provider?.name}
                </span>
                <span>{secondary.mission?.type || "Launch"}</span>
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default HomeLaunches;
