import {
  Card,
  CardBody,
  Divider,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ArticlesPageSkelton from "../Components/ArticlesPageSkelton";
import formatDate from "../utils/formatDate";
import { useQuery } from "@tanstack/react-query";

export const apiURL = "https://api.spaceflightnewsapi.net/v4";

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

export const pageLimit = 40;

function ArticlesPage() {
  const [isFetching, setIsFetching] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  async function fetchArticles() {
    try {
      const apiResponse = await fetch(
        apiURL + `/articles/?limit=${pageLimit}&offset=0`,
      );
      const articles: ArticlesAndBlogs = await apiResponse.json();
      return articles;
    } catch (error) {
      console.log(error);
      throw new Error("API request failed");
    }
  }

  // const fetchMoreData = async () => {
  //   setIsFetching(true);
  //   try {
  //     const apiResponse = await fetch(
  //       apiURL + `/articles/?limit=${pageLimit}&offset=${offset}`,
  //     );
  //     const data: ArticlesAndBlogs = await apiResponse.json();
  //     const dataResults = data.results;
  //     setArticles((prevArticles) => [...prevArticles, ...dataResults]);
  //     setOffset((prevOffset) => prevOffset + pageLimit);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsFetching(false);
  // };

  // const handleScroll = () => {
  //   if (isFetching) {
  //     return;
  //   }
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight;
  //   const scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     fetchMoreData();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isFetching, isLoading]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {isPending && <ArticlesPageSkelton />}
        {isError && <div>{error.message}</div>}
        {data &&
          data.results.map((article) => {
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
                      <small className="m-0 text-tiny text-default-500">
                        {formatDate(article.published_at)}
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
      </div>

      <Outlet />
    </>
  );
}

export default ArticlesPage;
