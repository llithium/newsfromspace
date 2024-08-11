import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { apiURL, launchApiUrl } from "src/lib/variables";
import { Suspense } from "react";
import HomeArticles from "./HomeArticles";
import HomeBlogs from "./HomeBlogs";
import { Spinner } from "@nextui-org/spinner";
import HomeLaunches from "./HomeLaunches";

export async function fetchUpcomingLaunchesHomePage() {
  const res = await fetch(
    launchApiUrl + `/launch/upcoming/?mode=detailed&limit=6&offset=0`,
    {
      next: { revalidate: 900 },
    },
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
    apiURL + `/articles/?mode=detailed&limit=6&offset=0`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data for latest articles ${(res.status, res.statusText)}`,
    );
  }
  return res.json();
}
export async function fetchLatestBlogs() {
  const res = await fetch(apiURL + `/blogs/?mode=detailed&limit=6&offset=0`, {
    next: { revalidate: 60 },
  });
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
      <div className="flex h-fit flex-col gap-4 pb-2 md:h-[calc(100dvh-5rem)] md:flex-row">
        <Card className="h-fit flex-1 md:h-full">
          <CardHeader>
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              href="/launches"
            >
              <h2 className="text-xl font-bold">Upcoming Launches</h2>
            </Link>
          </CardHeader>
          <CardBody className="flex flex-col gap-2 overflow-y-auto">
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
        <div className="flex h-fit flex-1 flex-col gap-4 md:h-full">
          <Card className="flex-1">
            <CardHeader>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/articles"
              >
                <h2 className="text-xl font-bold">Latest Articles</h2>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 overflow-y-auto">
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
          <Card className="flex-1">
            <CardHeader>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/blogs"
              >
                <h2 className="text-xl font-bold">Latest Blogs</h2>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 overflow-y-auto">
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
