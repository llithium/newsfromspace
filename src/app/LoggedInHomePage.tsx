import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Suspense } from "react";
import HomeBookmarks from "./HomeBookmarks";
import HomeLaunches from "./HomeLaunches";
import HomeArticles from "./HomeArticles";
import { Spinner } from "@nextui-org/spinner";
import { Launch } from "./articles/Articles";

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

export default async function LoggedInHomePage({
  bookmarks,
}: {
  bookmarks: BookmarkData[];
}) {
  return (
    <>
      <div className="flex h-fit flex-col gap-4 pb-2 md:h-[calc(100dvh-5rem)] md:flex-row">
        <Card className="h-fit flex-1 md:h-full">
          <CardHeader>
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              href="/bookmarks"
            >
              <h2 className="text-xl font-bold">Bookmarks</h2>
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
              <HomeBookmarks bookmarks={bookmarks} />
            </Suspense>
          </CardBody>
        </Card>
        <div className="flex h-fit flex-1 flex-col gap-4 md:h-full">
          <Card className="flex-1">
            <CardHeader>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/blogs"
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
        </div>
      </div>
    </>
  );
}
