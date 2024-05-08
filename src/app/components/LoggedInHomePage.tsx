import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Tooltip,
  Link as NextUILink,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { launchApiUrl } from "../launches/page";
import { LaunchesUpcoming } from "../launches/components/Launches";
import formatDate from "../utils/formatDate";
import dynamic from "next/dynamic";
import { ArticlesAndBlogs, Launch } from "../articles/components/Articles";
import { apiURL } from "../articles/page";
import { createClient } from "@/utils/supabase/server";
import fetchArticle from "@/articles/utils/fetchArticle";
import { ArticleAndBlog } from "@/articles/[articleId]/components/ArticleCard";
import fetchBlog from "@/blogs/utils/fetchblog";
const CountdownTimer = dynamic(() => import("../components/CountdownTimer"), {
  ssr: false,
});
async function fetchUpcomingLaunches() {
  const res = await fetch(
    launchApiUrl + `/launch/upcoming/?mode=detailed&limit=3&offset=0`,
    {
      next: { revalidate: 180 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data for upcoming launches");
  }
  return res.json();
}
async function fetchLatestArticles() {
  const res = await fetch(
    apiURL + `/articles/?mode=detailed&limit=6&offset=0`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data for lastest articles");
  }
  return res.json();
}
async function fetchLatestBlogs() {
  const res = await fetch(apiURL + `/blogs/?mode=detailed&limit=6&offset=0`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data for latest blogs");
  }
  return res.json();
}

export interface BookmarkData {
  id: number;
  created_at: Date;
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
}
export default async function LoggedInHomePage() {
  const launches: LaunchesUpcoming = await fetchUpcomingLaunches();
  const articles: ArticlesAndBlogs = await fetchLatestArticles();
  const blogs: ArticlesAndBlogs = await fetchLatestBlogs();
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  let { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userData.user?.id);

  const bookmarksData = bookmarks as BookmarkData[];
  let bookmarksArray: Bookmark[] = [];
  await Promise.all(
    bookmarksData.map(async (bookmark) => {
      if (bookmark.type === "article") {
        const article: ArticleAndBlog = await fetchArticle(
          bookmark.item_id,
          apiURL,
        );
        bookmarksArray.push({ ...article, type: bookmark.type });
      }
      if (bookmark.type === "blog") {
        const blog: ArticleAndBlog = await fetchBlog(bookmark.item_id, apiURL);
        bookmarksArray.push({ ...blog, type: bookmark.type });
      }
    }),
  );
  return (
    <>
      <div className="flex h-fit flex-col gap-4 pb-2 md:h-[calc(100dvh-5rem)] md:flex-row">
        <Card className="h-fit flex-1 md:h-full">
          <CardHeader>
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              href="/launches"
            >
              <h2 className="text-xl font-bold">Bookmarks</h2>
            </Link>
          </CardHeader>
          <CardBody className="flex flex-col gap-2 overflow-y-auto ">
            {bookmarksArray.map((bookmark) => {
              if (bookmark.type === "article") {
                return (
                  <NextUILink key={bookmark.id} href={bookmark.url} isExternal>
                    <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full ">
                      <Image
                        alt="Article image"
                        className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                        src={bookmark.image_url}
                      />

                      <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                        <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                          {bookmark.title}
                        </h2>
                        <Divider />
                        <div className="mt-auto">
                          <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                            {bookmark.news_site}
                          </p>
                          <small className="m-0 text-tiny text-default-500">
                            {formatDate(bookmark.published_at)}
                          </small>
                        </div>
                      </CardBody>
                    </Card>
                  </NextUILink>
                );
              }
              if (bookmark.type === "blog") {
                return (
                  <NextUILink key={bookmark.id} href={bookmark.url} isExternal>
                    <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full ">
                      <Image
                        alt="Blog image"
                        className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                        src={bookmark.image_url}
                      />

                      <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                        <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                          {bookmark.title}
                        </h2>
                        <Divider />
                        <div className="mt-auto">
                          <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                            {bookmark.news_site}
                          </p>
                          <small className="m-0 text-tiny text-default-500">
                            {formatDate(bookmark.published_at)}
                          </small>
                        </div>
                      </CardBody>
                    </Card>
                  </NextUILink>
                );
              }
            })}
            {/* {launches.results.map((launch) => {
              return (
                <Card
                  className="flex w-full flex-col overflow-y-auto p-3 md:min-h-96"
                  key={launch.id}
                >
                  <h3 className="text-xl font-bold">{launch.name}</h3>
                  <div className="flex  items-end py-2">
                    <Image
                      alt="Agency logo"
                      height={40}
                      radius="sm"
                      src={
                        launch.launch_service_provider &&
                        launch.launch_service_provider.logo_url
                      }
                      width={40}
                    />
                    <h3 className="pl-2 text-lg font-semibold">
                      {launch.launch_service_provider &&
                        launch.launch_service_provider.name}
                    </h3>
                  </div>
                  <div className="flex h-full w-full flex-wrap md:flex-nowrap">
                    <div className="flex flex-grow flex-col px-2 ">
                      <div className="flex">
                        <p className="max-w-1/2 w-fit pr-2 font-semibold">
                          {formatDate(launch.window_start)}
                        </p>
                        <CountdownTimer date={launch.window_start} />
                      </div>
                      <Tooltip
                        delay={300}
                        content={launch.status && launch.status.description}
                      >
                        <p
                          className={`w-fit font-semibold ${
                            launch.status && launch.status.abbrev === "Success"
                              ? "text-success-500"
                              : ""
                          }`}
                        >
                          Status: {launch.status && launch.status.name}
                        </p>
                      </Tooltip>
                      <p className="py-2">
                        {launch.mission ? (
                          launch.mission.description
                        ) : (
                          <span className="py-2 opacity-60">
                            No description provided
                          </span>
                        )}
                      </p>
                      <Link
                        className="mt-auto self-end pb-0 font-semibold text-primary-500 transition-opacity hover:opacity-80 active:opacity-disabled"
                        href={`/launches/${launch.id}`}
                      >
                        More Info
                      </Link>
                      <div className=" flex justify-between gap-2 py-2  font-semibold">
                        <NextUILink
                          color="foreground"
                          href={launch.pad.map_url ? launch.pad.map_url : ""}
                        >
                          <p>{launch.pad && launch.pad.location.name}</p>
                        </NextUILink>
                        <Tooltip delay={300} content="Mission type">
                          <p className="w-fit ">
                            {launch.mission ? (
                              launch.mission.type
                            ) : (
                              <span className="opacity-60">Unknown</span>
                            )}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })} */}
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
              {launches.results.map((launch) => {
                return (
                  <Card
                    className="flex w-full flex-col overflow-y-auto p-3 md:min-h-72"
                    key={launch.id}
                  >
                    <h3 className="text-xl font-bold">{launch.name}</h3>
                    <div className="flex  items-end py-2">
                      <Image
                        alt="Agency logo"
                        height={40}
                        radius="sm"
                        src={
                          launch.launch_service_provider &&
                          launch.launch_service_provider.logo_url
                        }
                        width={40}
                      />
                      <h3 className="pl-2 text-lg font-semibold">
                        {launch.launch_service_provider &&
                          launch.launch_service_provider.name}
                      </h3>
                    </div>
                    <div className="flex h-full w-full flex-wrap md:flex-nowrap">
                      <div className="flex flex-grow flex-col px-2 ">
                        <div className="flex">
                          <p className="max-w-1/2 w-fit pr-2 font-semibold">
                            {formatDate(launch.window_start)}
                          </p>
                          <CountdownTimer date={launch.window_start} />
                        </div>
                        <Tooltip
                          delay={300}
                          content={launch.status && launch.status.description}
                        >
                          <p
                            className={`w-fit font-semibold ${
                              launch.status &&
                              launch.status.abbrev === "Success"
                                ? "text-success-500"
                                : ""
                            }`}
                          >
                            Status: {launch.status && launch.status.name}
                          </p>
                        </Tooltip>
                        <p className="py-2">
                          {launch.mission ? (
                            launch.mission.description
                          ) : (
                            <span className="py-2 opacity-60">
                              No description provided
                            </span>
                          )}
                        </p>
                        <Link
                          className="mt-auto self-end pb-0 font-semibold text-primary-500 transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/launches/${launch.id}`}
                        >
                          More Info
                        </Link>
                        <div className=" flex justify-between gap-2 py-2  font-semibold">
                          <NextUILink
                            color="foreground"
                            href={launch.pad.map_url ? launch.pad.map_url : ""}
                          >
                            <p>{launch.pad && launch.pad.location.name}</p>
                          </NextUILink>
                          <Tooltip delay={300} content="Mission type">
                            <p className="w-fit ">
                              {launch.mission ? (
                                launch.mission.type
                              ) : (
                                <span className="opacity-60">Unknown</span>
                              )}
                            </p>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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
              {articles.results.map((article) => {
                return (
                  <NextUILink key={article.id} href={article.url} isExternal>
                    <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full ">
                      <Image
                        alt="Article image"
                        className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                        src={article.image_url}
                      />

                      <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                        <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                          {article.title}
                        </h2>
                        <Divider />
                        <div className="mt-auto">
                          <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                            {article.news_site}
                          </p>
                          <small className="m-0 text-tiny text-default-500">
                            {formatDate(article.published_at)}
                          </small>
                        </div>
                      </CardBody>
                    </Card>
                  </NextUILink>
                );
              })}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
