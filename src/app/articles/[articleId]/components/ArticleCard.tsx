"use client";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Launch } from "../../components/Articles";
import { apiURL } from "../../page";
import ArticleAndBlogModal from "../../../components/ArticleAndBlogModal";
import fetchArticle from "../../utils/fetchArticle";

export interface ArticleAndBlog {
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

export default function ArticleCard({
  params,
}: {
  params: { articleId: string };
}) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["article", params.articleId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchArticle(params.articleId, apiURL),
  });

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