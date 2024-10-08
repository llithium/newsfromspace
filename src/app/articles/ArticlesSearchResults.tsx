"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";

export default function ArticlesSearchResults({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data, isError, error } = useQuery({
    queryKey: ["articlesSearch", search, `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/articles/?limit=${pageLimit}&offset=0&search=${search}`,
      ),
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {isError && <div>{error.message}</div>}
        {data && data.count !== 0
          ? data.results.map((article) => {
              return (
                <Card
                  key={article.id}
                  className="flex h-32 flex-row bg-neutral-950 transition-opacity hover:opacity-80 active:opacity-disabled sm:h-44"
                >
                  <Link
                    scroll={false}
                    key={article.id}
                    href={article.url}
                    className="flex h-32 w-full flex-row py-2 sm:h-full"
                  >
                    <Image
                      alt="Article image"
                      className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                      src={article.image_url}
                    />
                    <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                      <h2 className="pb-0 text-xs font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                        {article.title}
                      </h2>
                      <Divider />
                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                        {article.summary}
                      </p>
                      <div className="mt-auto">
                        <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                          {article.news_site}
                        </p>
                        <small className="m-0 text-tiny text-default-500">
                          {formatDate(article.published_at)}
                        </small>
                      </div>
                    </CardBody>
                  </Link>
                  {/* <SaveIcon /> */}
                </Card>
              );
            })
          : search && (
              <div className="col-span-2 mt-auto flex w-full flex-row justify-center">
                <h2 className="text-3xl">
                  No results found for:{" "}
                  <span className="font-bold tracking-wider">{search}</span>
                </h2>
              </div>
            )}
      </div>
      {data?.count ? (
        <div className="mx-auto w-fit py-4">
          <PageButtons count={data.count} search={search || ""} page={page} />
        </div>
      ) : null}
    </>
  );
}

export interface ArticlesAndBlogs {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
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
}

export interface Event {
  event_id: number;
  provider: string;
}

export interface Launch {
  launch_id: string;
  provider: string;
}
