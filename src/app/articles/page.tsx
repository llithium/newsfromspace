import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Articles from "./components/Articles";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import ArticlesSearchResults from "./components/ArticlesSearchResults";
import { apiURL, pageLimit } from "@/utils/variables";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  return {
    title:
      (searchParams.q && searchParams.q + " · News From Space") ||
      "News From Space",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; q: string };
}) {
  const queryClient = new QueryClient();
  const page = parseInt(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["articles", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        apiURL +
          `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });
  if (searchParams.q) {
    await queryClient.prefetchQuery({
      queryKey: ["articlesSearch", searchParams.q, `page ${page}`],
      queryFn: () =>
        fetchArticlesAndBlogs(
          apiURL +
            `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}&search=${searchParams.q}`,
        ),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <ArticlesSearchResults page={page} />
        </Suspense>
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Articles page={page} />
      </HydrationBoundary>
    );
  }
}
