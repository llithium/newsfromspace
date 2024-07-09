import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Blogs from "./components/Blogs";
import { fetchArticlesAndBlogs } from "../utils/fetchArticlesAndBlogs";
import BlogsSearchResults from "./components/BlogsSearchResults";
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
      "Blogs · News From Space",
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
    queryKey: ["blogs", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        apiURL +
          `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });
  if (searchParams.q) {
    await queryClient.prefetchQuery({
      queryKey: ["blogsSearch", searchParams.q, `page ${page}`],
      queryFn: () =>
        fetchArticlesAndBlogs(
          apiURL +
            `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}&search=${searchParams.q}`,
        ),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <BlogsSearchResults page={page} />
        </Suspense>
      </HydrationBoundary>
    );
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Blogs page={page} />
      </HydrationBoundary>
    );
  }
}
