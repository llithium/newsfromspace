"use client";
import ArticleAndBlogModal from "../../components/ArticleAndBlogModal";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Launch, apiURL } from "../page";
import { useParams } from "next/navigation";

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
  const params = useParams<{ articleId: string }>();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["article", params.articleId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchArticle(params.articleId),
  });

  async function fetchArticle(articleId: string | undefined) {
    if (articleId) {
      try {
        const apiResponse = await fetch(apiURL + `/articles/${articleId}`);
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
    <ArticleAndBlogModal card={data} />
  ) : (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
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
