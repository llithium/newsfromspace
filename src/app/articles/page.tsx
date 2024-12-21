import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Articles from "./Articles";
import { fetchArticlesAndBlogs } from "../../lib/fetchArticlesAndBlogs";
import ArticlesSearchResults from "./ArticlesSearchResults";
import { spaceFlightNewsAPI, pageLimit } from "src/lib/variables";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata(
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title:
      (searchParams.q && searchParams.q + " · News From Space") ||
      "News From Space",
  };
}

export default async function Page(
  props: {
    searchParams: Promise<{ page: string; q: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const page = parseInt(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["articles", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        spaceFlightNewsAPI +
          `/articles/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });
  if (searchParams.q) {
    await queryClient.prefetchQuery({
      queryKey: ["articlesSearch", searchParams.q, `page ${page}`],
      queryFn: () =>
        fetchArticlesAndBlogs(
          spaceFlightNewsAPI +
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
