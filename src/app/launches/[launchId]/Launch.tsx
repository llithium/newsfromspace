"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LaunchLibraryAPI } from "src/lib/variables";
import Photo from "@/components/ui/Photo";
import { RelatedArticles } from "./page";
import fetchLaunch from "@/lib/fetchLaunch";
import { formatDate } from "@/lib/utils";
import { statusPill } from "@/lib/status";

const CountdownTimer = dynamic(() => import("@/components/ui/CountdownTimer"), {
  ssr: false,
});

function ProviderMark({ name, logo }: { name?: string; logo?: string | null }) {
  if (logo) {
    return (
      <div className="mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name || "Provider"} />
      </div>
    );
  }
  return <div className="mark">{(name || "—").slice(0, 2).toUpperCase()}</div>;
}

export default function LaunchInformationPage({
  params,
  relatedData,
}: {
  params: { launchId: string };
  relatedData: RelatedArticles;
}) {
  const { isError, data, error } = useQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, LaunchLibraryAPI),
  });

  if (isError) {
    return (
      <main className="wrap">
        <p className="dek">{error.message}</p>
      </main>
    );
  }
  if (!data) {
    return <main className="wrap" />;
  }

  const lsp = data.launch_service_provider;
  const config = data.rocket?.configuration;
  const pad = data.pad;
  const mission = data.mission;
  const pill = statusPill(data.status?.abbrev);
  const isUpcoming = new Date(data.window_start).getTime() > Date.now();
  const watchUrl = data.vidURLs && data.vidURLs[0] && data.vidURLs[0].url;

  return (
    <main className="wrap">
      <div className="crumb">
        <Link href="/launches">Launches</Link>
        <span className="sep">/</span>
        <span>{isUpcoming ? "Upcoming" : "Past"}</span>
      </div>

      {/* hero */}
      <section className="lhero">
        <Photo
          src={data.image}
          caption={`${config?.full_name || data.name} · ${pad?.name || ""}`}
          badge={
            isUpcoming ? (
              <>
                T- <CountdownTimer date={data.window_start} />
              </>
            ) : undefined
          }
        />
        <div className="info">
          <div className="kicker">
            {lsp?.name}
            {config?.name ? ` · ${config.name}` : ""}
          </div>
          <h1>{mission?.name || data.name}</h1>
          <span
            className={`pill ${pill.cls}`}
            style={{ alignSelf: "flex-start", marginTop: 16 }}
          >
            <span className="dot"></span>
            {pill.label}
          </span>
          <p className="desc">
            {mission?.description || "No mission description provided."}
          </p>
          <div className="facts">
            <span>📅 {formatDate(data.window_start)}</span>
            {pad?.location?.name && <span>📍 {pad.location.name}</span>}
            {mission?.type && <span className="tag">{mission.type}</span>}
          </div>
          {watchUrl && (
            <div style={{ marginTop: 20 }}>
              <a
                className="btn accent"
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Watch Live
              </a>
            </div>
          )}
        </div>
      </section>

      {/* dossier */}
      <div className="dossier">
        <div className="facts-col">
          {/* The Rocket */}
          <p className="blocklabel">The Rocket</p>
          <div className="factcard">
            <Photo src={config?.image_url} className="ph" />
            <div>
              <h3>{config?.full_name || data.name}</h3>
              <p>
                {config?.description || "No vehicle description available."}
              </p>
              <div className="stats">
                {config?.maiden_flight && (
                  <span>
                    Maiden flight ·{" "}
                    <b>{new Date(config.maiden_flight).getFullYear()}</b>
                  </span>
                )}
                <span>
                  Successful · <b>{config?.successful_launches ?? "—"}</b>
                </span>
                <span>
                  Landings · <b>{config?.successful_landings ?? "—"}</b>
                </span>
              </div>
            </div>
          </div>

          {/* The Mission */}
          <p className="blocklabel" style={{ marginTop: 22 }}>
            The Mission
          </p>
          <div className="factcard">
            <Photo
              src={data.mission_patches?.[0]?.image_url}
              className="alt ph"
            />
            <div>
              <h3>{mission?.name || "Mission details pending"}</h3>
              <p>
                {mission?.description ||
                  "Mission specifics have not been published yet."}
              </p>
              <div className="stats">
                {mission?.orbit?.name && (
                  <span>
                    Orbit · <b>{mission.orbit.name}</b>
                  </span>
                )}
                {mission?.type && (
                  <span className="tag" style={{ fontSize: 9.5 }}>
                    {mission.type}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* The Pad */}
          <p className="blocklabel" style={{ marginTop: 22 }}>
            The Pad
          </p>
          <div className="factcard">
            <Photo src={pad?.map_image} className="ph" />
            <div>
              <h3>
                {pad?.location?.name}
                {pad?.name ? ` · ${pad.name}` : ""}
              </h3>
              <p>
                {pad?.location?.description ||
                  pad?.description ||
                  "Launch complex details unavailable."}
              </p>
              <div className="stats">
                <span>
                  Total launches ·{" "}
                  <b>{pad?.location?.total_launch_count ?? "—"}</b>
                </span>
                <span>
                  From this pad · <b>{pad?.total_launch_count ?? "—"}</b>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="side">
          {/* Provider */}
          <p className="blocklabel">The Provider</p>
          <div className="provider">
            <div className="top">
              <ProviderMark name={lsp?.name} logo={lsp?.logo_url} />
              <div>
                <h3>{lsp?.name}</h3>
                <div className="byline" style={{ marginTop: 2 }}>
                  {lsp?.administrator || lsp?.type}
                </div>
              </div>
            </div>
            <p>{lsp?.description}</p>
            <div className="row">
              {lsp?.founding_year && <span>Founded · {lsp.founding_year}</span>}
              {lsp?.type && <span>{lsp.type}</span>}
              {lsp?.info_url && (
                <a
                  href={lsp.info_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Site ↗
                </a>
              )}
            </div>
          </div>

          {/* Live Updates */}
          {data.updates && data.updates.length > 0 && (
            <>
              <p className="blocklabel">⦿ Live Updates</p>
              <div className="feed">
                {data.updates.map((u) => (
                  <div className="u" key={u.id}>
                    {u.profile_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="av" src={u.profile_image} alt="" />
                    ) : (
                      <div className="av" />
                    )}
                    <div>
                      <div className="who">
                        {u.created_by}{" "}
                        <span className="t">· {formatDate(u.created_on)}</span>
                      </div>
                      <div className="msg">{u.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* webcasts */}
      {data.vidURLs && data.vidURLs.length > 0 && (
        <section className="webcasts">
          <div className="section-head">
            ▶ Webcasts<span className="bar"></span>
          </div>
          <div className="wgrid">
            {data.vidURLs.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block-link"
              >
                <Photo
                  src={v.feature_image}
                  badge={
                    <span className={data.webcast_live ? "" : ""}>
                      {data.webcast_live ? "● Live" : "▶ Replay"}
                    </span>
                  }
                />
                <div className="t">{v.title}</div>
                <div className="by">{v.publisher || v.source}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* related coverage */}
      {relatedData.results.length > 0 && (
        <section className="related">
          <div className="section-head">
            Related Coverage<span className="bar"></span>
          </div>
          <div className="rgrid">
            {relatedData.results.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="block-link"
              >
                <div className="story">
                  <Photo src={article.image_url} caption={article.news_site} />
                  <h3>{article.title}</h3>
                  <div className="byline">
                    <span className="src">{article.news_site}</span>
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
export interface Launch {
  id: string;
  url: string;
  slug: string;
  flightclub_url: null;
  r_spacex_api_id: null;
  name: string;
  status: NetPrecision;
  last_updated: Date;
  updates: Update[];
  net: Date;
  net_precision: NetPrecision;
  window_end: Date;
  window_start: Date;
  probability: null;
  weather_concerns: null;
  holdreason: string;
  failreason: string;
  hashtag: null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission;
  pad: Pad;
  infoURLs: any[];
  vidURLs: VidURL[];
  webcast_live: boolean;
  timeline: any[];
  image: string;
  infographic: null;
  program: any[];
  orbital_launch_attempt_count: null;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
  pad_turnaround: string;
  mission_patches: MissionPatch[];
  type: string;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  launch_library_url: null;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: string;
  wiki_url: string;
  logo_url: string;
  image_url: null;
  nation_url: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  launch_designator: null;
  type: string;
  orbit: NetPrecision;
  agencies: LaunchServiceProvider[];
  info_urls: any[];
  vid_urls: any[];
}

export interface NetPrecision {
  id: number;
  name: string;
  abbrev: string;
  description?: string;
}

export interface MissionPatch {
  id: number;
  name: string;
  priority: number;
  image_url: string;
  agency: Agency;
}

export interface Agency {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Pad {
  id: number;
  url: string;
  agency_id: number;
  name: string;
  description: string;
  info_url: string;
  wiki_url: string;
  map_url: string;
  latitude: string;
  longitude: string;
  location: Location;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  orbital_launch_attempt_count: number;
}

export interface Location {
  id: number;
  url: string;
  name: string;
  country_code: string;
  description: string;
  map_image: string;
  timezone_name: string;
  total_launch_count: number;
  total_landing_count: number;
}

export interface Rocket {
  id: number;
  configuration: Configuration;
  launcher_stage: any[];
  spacecraft_stage: null;
}

export interface Configuration {
  id: number;
  url: string;
  name: string;
  active: boolean;
  reusable: boolean;
  description: string;
  family: string;
  full_name: string;
  manufacturer: LaunchServiceProvider;
  program: any[];
  variant: string;
  alias: string;
  min_stage: number;
  max_stage: number;
  length: null;
  diameter: number;
  maiden_flight: null;
  launch_cost: null;
  launch_mass: null;
  leo_capacity: null;
  gto_capacity: null;
  to_thrust: number;
  apogee: number;
  vehicle_range: null;
  image_url: string;
  info_url: string;
  wiki_url: string | null;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  attempted_landings: number;
  successful_landings: number;
  failed_landings: number;
  consecutive_successful_landings: number;
}

export interface Update {
  id: number;
  profile_image: string;
  comment: string;
  info_url: string;
  created_by: string;
  created_on: Date;
}

export interface VidURL {
  priority: number;
  source: string;
  publisher: string;
  title: string;
  description: string;
  feature_image: string;
  url: string;
  type: Type;
  language: Language;
  start_time: Date;
  end_time: null;
}

export interface Language {
  id: number;
  name: string;
  code: string;
}

export interface Type {
  id: number;
  name: string;
}
