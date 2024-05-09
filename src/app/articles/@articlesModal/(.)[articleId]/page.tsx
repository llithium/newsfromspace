import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ArticleCard, {
  ArticleAndBlog,
} from "../../[articleId]/components/ArticleCard.tsx";
import fetchArticle from "../../utils/fetchArticle.ts";
import { apiURL } from "../../page.tsx";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  // read route params
  const articleId = params.articleId;

  // fetch data
  const article: ArticleAndBlog = await fetch(
    apiURL + `/articles/${articleId}`,
  ).then((res) => res.json());

  return {
    title: article.title,
  };
}

export default async function Page({
  params,
}: {
  params: { articleId: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article", params.articleId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchArticle(params.articleId, apiURL),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleCard params={params} />
    </HydrationBoundary>
  );
}
