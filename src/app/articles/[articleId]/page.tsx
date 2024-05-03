import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ArticleCard from "./components/ArticleCard";
import fetchArticle from "../utils/fetchArticle";
import { apiURL } from "../page";

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
