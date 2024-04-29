import { useParams } from "react-router-dom";
import { apiURL, Launch, Event } from "./ArticlesPage";
import ArticleAndBlogCard from "../Components/ArticleAndBlogCard";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export interface ArticleAndBlog {
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

export default function ArticleCard() {
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["article", params.id],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchArticle(params.id),
  });

  async function fetchArticle(id: string | undefined) {
    if (id) {
      try {
        const apiResponse = await fetch(apiURL + `/articles/${id}`);
        const article = await apiResponse.json();
        return article;
      } catch (error) {
        console.log(error);
        throw new Error("API request failed");
      }
    }
  }

  isError && <div>{error.message}</div>;
  return !isPending ? (
    <ArticleAndBlogCard card={data} />
  ) : (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <Spinner
        color="current"
        className="relative z-50"
        classNames={{
          wrapper: "w-44 h-44",
        }}
        size="lg"
        // label="Loading..."
      />
    </div>
  );
}
