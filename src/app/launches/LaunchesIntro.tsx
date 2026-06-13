import Link from "next/link";

const PROVIDERS = ["SpaceX", "CASC", "Rocket Lab", "ULA"];

export default function LaunchesIntro({
  active,
  q,
}: {
  active: "upcoming" | "past";
  q?: string;
}) {
  const base = active === "upcoming" ? "/launches" : "/launches/past";
  return (
    <>
      <div className="page-intro" style={{ borderBottom: "none" }}>
        <div className="kicker">
          <span className="bar" style={{ maxWidth: 40 }}></span>The Manifest
        </div>
        <h1>Launches</h1>
        <p className="sub">
          Every flight off Earth we&apos;re tracking — live countdowns to the
          next window, and the results once the smoke clears.
        </p>
      </div>

      <div className="toolbar">
        <Link
          className={`chip${active === "upcoming" ? " on" : ""}`}
          href="/launches"
        >
          Upcoming
        </Link>
        <Link
          className={`chip${active === "past" ? " on" : ""}`}
          href="/launches/past"
        >
          Past
        </Link>
        <span className="spacer"></span>
        <Link className={`chip${!q ? " on" : ""}`} href={base}>
          All providers
        </Link>
        {PROVIDERS.map((p) => (
          <Link
            key={p}
            className={`chip${q === p ? " on" : ""}`}
            href={`${base}?q=${encodeURIComponent(p)}`}
          >
            {p}
          </Link>
        ))}
      </div>
    </>
  );
}
