import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { spaceFlightNewsAPI, LaunchLibraryAPI } from "src/lib/variables";
import HomeArticles from "./HomeArticles";
import HomeBlogs from "./HomeBlogs";
import HomeLaunches from "./HomeLaunches";
import HomeMore from "./HomeMore";
import type { ArticlesAndBlogs, Launch } from "./articles/Articles";
import type { LaunchesData } from "./launches/Launches";
import { fetchJson } from "@/lib/api";

export async function fetchUpcomingLaunchesHomePage() {
  return fetchJson<LaunchesData>(
    LaunchLibraryAPI + `/launch/upcoming/?mode=detailed&limit=6&offset=0`,
    { label: "Homepage launches request", revalidate: 60 },
  );
}
export async function fetchLatestArticles() {
  return fetchJson<ArticlesAndBlogs>(
    spaceFlightNewsAPI + `/articles/?mode=detailed&limit=10&offset=0`,
    { label: "Homepage articles request", revalidate: 300 },
  );
}
export async function fetchLatestBlogs() {
  return fetchJson<ArticlesAndBlogs>(
    spaceFlightNewsAPI + `/blogs/?mode=detailed&limit=6&offset=0`,
    { label: "Homepage blogs request", revalidate: 300 },
  );
}

const CellSpinner = () => (
  <Spinner color="current" className="col-span-full my-10" label="Loading…" />
);

export default async function HomePage() {
  return (
    <>
      <main className="wrap">
        <div className="frontpage">
          <Suspense
            fallback={
              <>
                <div className="rail-l">
                  <CellSpinner />
                </div>
                <div className="lead">
                  <CellSpinner />
                </div>
              </>
            }
          >
            <HomeArticles />
          </Suspense>
          <Suspense
            fallback={
              <div className="rail-r">
                <CellSpinner />
              </div>
            }
          >
            <HomeLaunches />
          </Suspense>
        </div>
      </main>

      <section className="band">
        <div className="wrap">
          <Suspense fallback={<CellSpinner />}>
            <HomeBlogs />
          </Suspense>
        </div>
      </section>

      <div className="wrap">
        <Suspense fallback={null}>
          <HomeMore />
        </Suspense>
      </div>
    </>
  );
}

export interface BookmarkData {
  id: number;
  created_at: string;
  type: string;
  item_id: string;
  user_id: string;
}

export interface Bookmark {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: Event[];
  type: string;
  created_at: string;
}
