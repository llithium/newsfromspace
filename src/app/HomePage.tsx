import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { spaceFlightNewsAPI, LaunchLibraryAPI } from "src/lib/variables";
import { Suspense } from "react";
import HomeArticles from "./HomeArticles";
import HomeBlogs from "./HomeBlogs";
import { Spinner } from "@nextui-org/spinner";
import HomeLaunches from "./HomeLaunches";
import { Launch } from "./articles/Articles";

export const dynamic = "force-dynamic";

export async function fetchUpcomingLaunchesHomePage() {
  const res = await fetch(
    LaunchLibraryAPI + `/launch/upcoming/?mode=detailed&limit=6&offset=0`,
    { cache: "no-cache" },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data for upcoming launches ${(res.status, res.statusText)}`,
    );
  }
  return res.json();
}
export async function fetchLatestArticles() {
  const res = await fetch(
    spaceFlightNewsAPI + `/articles/?mode=detailed&limit=6&offset=0`,
    { cache: "no-cache" },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data for latest articles ${(res.status, res.statusText)}`,
    );
  }
  return res.json();
}
export async function fetchLatestBlogs() {
  const res = await fetch(
    spaceFlightNewsAPI + `/blogs/?mode=detailed&limit=6&offset=0`,
    { cache: "no-cache" },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data for latest blogs ${(res.status, res.statusText)}`,
    );
  }
  return res.json();
}

export default async function HomePage() {
  return (
    <>
      <div className="flex h-fit flex-col pb-2 md:flex-row">
        <div className="flex flex-1 flex-col">
          <Card className="h-fit bg-background shadow-none">
            <CardHeader className="pt-1">
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/launches"
              >
                <h2 className="text-xl font-bold">Upcoming Launches</h2>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 overflow-y-auto pt-1">
              <Suspense
                fallback={
                  <Spinner
                    color="current"
                    className="mx-auto my-auto h-[calc(100svh-200px)]"
                    classNames={{
                      wrapper: "w-44 h-44",
                    }}
                    size="lg"
                    label="Loading..."
                  />
                }
              >
                <HomeLaunches />
              </Suspense>
            </CardBody>
          </Card>
        </div>
        <div className="flex h-fit flex-1 flex-col">
          <Card className="h-fit flex-1 bg-background shadow-none md:h-full">
            <CardHeader className="pt-1">
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/articles"
              >
                <h2 className="text-xl font-bold">Latest Articles</h2>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 overflow-y-auto pt-1">
              <Suspense
                fallback={
                  <Spinner
                    color="current"
                    className="mx-auto my-auto h-[calc(100svh-200px)]"
                    classNames={{
                      wrapper: "w-44 h-44",
                    }}
                    size="lg"
                    label="Loading..."
                  />
                }
              >
                <HomeArticles />
              </Suspense>
            </CardBody>
          </Card>

          <Card className="h-fit flex-1 bg-background shadow-none md:h-full">
            <CardHeader className="pt-1">
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/blogs"
              >
                <h2 className="text-xl font-bold">Latest Blogs</h2>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 overflow-y-auto pt-1">
              <Suspense
                fallback={
                  <Spinner
                    color="current"
                    className="mx-auto my-auto h-[calc(100svh-200px)]"
                    classNames={{
                      wrapper: "w-44 h-44",
                    }}
                    size="lg"
                    label="Loading..."
                  />
                }
              >
                <HomeBlogs />
              </Suspense>
            </CardBody>
          </Card>
        </div>
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
