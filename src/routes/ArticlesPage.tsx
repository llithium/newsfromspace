import { Card, CardBody, Image, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ArticlesPageSkelton from "../Components/ArticlesPageSkelton";

export const apiURL = "https://api.spaceflightnewsapi.net";

export interface Articles {
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

const pageLimit = 20;

function ArticlesPage() {
  const [articles, setArticles] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const apiResponse = await fetch(
        apiURL + `/v4/articles/?limit=${pageLimit}&offset=${offset}`
      );
      const data: Articles = await apiResponse.json();
      const dataResults = data.results;
      setArticles((prevArticles) => [...prevArticles, ...dataResults]);
      setOffset((prevOffset) => prevOffset + pageLimit);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-3 ">
        {articles
          ? articles.map((article) => {
              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="sm:h-44 h-32"
                >
                  <Card
                    key={article.id}
                    className="m:min-h-44 sm:h-full py-2 flex flex-row h-32 w-full "
                  >
                    <Image
                      alt="Card background"
                      className="z-0 object-cover rounded-xl ml-2 flex-1 sm:w-44 lg:w-56 w-44 h-full"
                      src={article.image_url}
                    />

                    <CardBody className="overflow-visible py-2 flex-1">
                      <h2 className="sm:text-large text-xs font-bold ">
                        {article.title}
                      </h2>
                      <div className=" mt-auto">
                        <p className="sm:text-medium text-tiny font italic m-0">
                          {article.news_site}
                        </p>

                        <small className="text-default-500 text-tiny m-0">
                          {article.published_at}
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            })
          : null}
        {isLoading ? <ArticlesPageSkelton /> : null}
      </div>
      {isLoading && offset > 0 ? (
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-end">
          <Spinner
            className="z-50 relative bottom-10"
            size="lg"
            // label="Loading..."
            // color="warning"
          />
        </div>
      ) : null}
      <Outlet />
    </>
  );
}

export default ArticlesPage;
