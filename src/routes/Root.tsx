import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const apiURL = "https://api.spaceflightnewsapi.net";

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
  const articles = requestResponse as Articles;

  return (
    <>
      <div className="">
        <nav className="flex">
          <h1 className="font-bold w-fit text-3xl">
            <NavLink to={"/"}> News from Space</NavLink>
          </h1>
        </nav>
        {articles.results.map((article) => {
          return (
            <div key={article.id}>
              <h2 className="font-semibold text-xl">{article.title}</h2>
              <a href={article.url}>{article.url}</a>
              <img src={article.image_url} alt="Article Image" />
              <p>{article.news_site}</p>
              <p> {article.summary} </p>
              <p>
                Published:
                <time dateTime={article.published_at}>
                  ={article.published_at}
                </time>
              </p>
              <p>
                Updated:
                <time dateTime={article.updated_at}>{article.updated_at}</time>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Root;
