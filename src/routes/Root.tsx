import { useEffect, useState } from "react";
import { Link as NavLink, Outlet } from "react-router-dom";
import { Card, CardBody, Image, Link } from "@nextui-org/react";

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

function Root() {
  const [requestResponse, setRequestResponse] = useState<Articles>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });

  useEffect(() => {
    async function request() {
      const apiResponse = await fetch(
        apiURL + "/v4/articles/?limit=20&offset=0"
      );
      const data = await apiResponse.json();
      setRequestResponse(data);
    }
    request();
  }, []);
  const articles = requestResponse;

  return (
    <>
      <div className="sm:w-4/5 sm:mx-auto">
        <nav className="flex flex-row justify-between items-center py-12">
          <h1 className=" ">
            <NavLink to={"/"}> News from Space</NavLink>
          </h1>
          {/* <h3 className=" text-xl font-bold h-max ">Articles</h3> */}
        </nav>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 ">
          {articles.results.map((article) => {
            return (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="sm:h-44 h-32 "
              >
                <Card
                  key={article.id}
                  className="m:min-h-44 sm:h-full py-2 flex flex-row h-32 s w-full "
                >
                  <Image
                    alt="Card background"
                    className="z-0 object-cover rounded-xl ml-2 flex-1 sm:w-44 lg:w-56 w-44 h-full"
                    src={article.image_url}
                  />

                  <CardBody className="overflow-visible py-2 flex-1 ">
                    <h2 className="sm:text-large text-xs font-bold ">
                      {article.title}
                    </h2>
                    {/* <p className="text-tiny font-semibold ">
                    {article.summary}
                  </p> */}
                    <div className=" mt-auto">
                      <p className="sm:text-medium text-sm font italic">
                        {article.news_site}
                      </p>
                      <small className="text-default-500 text-tiny">
                        {article.published_at}
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Root;
