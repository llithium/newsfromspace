import { Card, CardBody, Image, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ArticlesPageSkelton from "../Components/ArticlesPageSkelton";
import formatDate from "../utils/formatDate";

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
  const [articles, setArticles] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(pageLimit);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiResponse = await fetch(
          apiURL + `/articles/?limit=${pageLimit}&offset=0`,
        );
        const data: ArticlesAndBlogs = await apiResponse.json();
        const dataResults = data.results;
        setArticles(dataResults);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleScroll = () => {
    if (isFetching) {
      return;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (clientHeight + scrollTop >= scrollHeight) {
      fetchMoreData();
    }
  };

  const fetchMoreData = async () => {
    setIsFetching(true);
    try {
      const apiResponse = await fetch(
        apiURL + `/articles/?limit=${pageLimit}&offset=${offset}`,
      );
      const data: ArticlesAndBlogs = await apiResponse.json();
      const dataResults = data.results;
      setArticles((prevArticles) => [...prevArticles, ...dataResults]);
      setOffset((prevOffset) => prevOffset + pageLimit);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, isLoading]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {articles
          ? articles.map((article) => {
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
                      alt="Card background"
                      className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                      src={article.image_url}
                    />

                    <CardBody className="flex-grow overflow-visible overflow-y-auto pb-0 pt-2 sm:flex-1">
                      <h2 className="scroll-m-20 border-b pb-0 text-xs font-bold tracking-tight transition-colors first:mt-0 sm:text-xl xl:text-2xl">
                        {article.title}
                      </h2>
                      <div className="mt-auto">
                        <p className="relative top-2 m-0 text-tiny italic sm:top-0 sm:text-medium">
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
            })
          : null}
        {isLoading && <ArticlesPageSkelton />}
      </div>
      {isFetching && (
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
      <Outlet />
    </>
  );
}

export default ArticlesPage;
