"use client";

import {
  Card,
  CardBody,
  Divider,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { fetchArticlesAndBlogs } from "../../utils/fetchArticlesAndBlogs";
import formatDate from "../../utils/formatDate";
import { apiURL, pageLimit } from "../page";

export default function Articles() {
  const { data, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["articles"],
      queryFn: fetchArticlesAndBlogs,
      initialPageParam: apiURL + `/articles/?limit=${pageLimit}&offset=0`,
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {isError && <div>{error.message}</div>}
        {data &&
          data.pages.map((page) => {
            return page.results.map((article) => {
              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="h-32 sm:h-44"
                >
                  <Card
                    key={article.id}
                    className="flex h-32 w-full flex-row py-2 sm:h-full "
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
                      <div className="mt-auto">
                        <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                          {article.news_site}
                        </p>
                        <small
                          className="m-0 text-tiny text-default-500"
                          suppressHydrationWarning
                        >
                          {formatDate(article.published_at)}
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            });
          })}
      </div>
      {isFetchingNextPage && (
        <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
          <Spinner
            color="current"
            className="relative bottom-10 z-50"
            classNames={{
              wrapper: "h-24 w-24",
            }}
            size="lg"
            // label="Loading..."
          />
        </div>
      )}
      <div ref={ref}></div>
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
  published_at: string;
  updated_at: string;
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
