import { NavLink, useLoaderData } from "react-router-dom";

const apiURL = "https://api.spaceflightnewsapi.net";

export async function rootLoader() {
  const apiRespons = await fetch(apiURL + "/v4/articles/?limit=20&offset=0");
  return apiRespons.json();
}

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

function Root() {
  const articles = useLoaderData() as Articles;
  console.log();

  return (
    <>
      <div className="">
        <nav className="flex">
          <h1 className="font-bold w-fit ">
            <NavLink to={"/"}> News from Space</NavLink>
          </h1>
        </nav>
      </div>
    </>
  );
}

export default Root;
