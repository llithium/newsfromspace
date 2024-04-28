import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiURL, Launch, Event } from "./ArticlesPage";
import ArticleAndBlogCard from "../Components/ArticleAndBlogCard";
import { Spinner } from "@nextui-org/react";

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
  const [article, setArticle] = useState<ArticleAndBlog>();

  const params = useParams();

  useEffect(() => {
    async function request() {
      if (params.id) {
        try {
          const apiResponse = await fetch(apiURL + `/articles/${params.id}`);
          const data = await apiResponse.json();
          setArticle(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  }, []);

  const loadedArticle = article as ArticleAndBlog;
  return loadedArticle ? (
    <ArticleAndBlogCard card={loadedArticle} />
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
