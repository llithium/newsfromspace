import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { apiURL } from "../../../articles/page";
import { Metadata } from "next";
import { ArticleAndBlog } from "../../../articles/[articleId]/components/ArticleCard";
import fetchBlog from "@/blogs/utils/fetchblog";
import BlogCard from "@/blogs/[blogId]/components/BlogCard";

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  // read route params
  const blogId = params.blogId;

  // fetch data
  const blog: ArticleAndBlog = await fetch(apiURL + `/blogs/${blogId}`).then(
    (res) => res.json(),
  );

  return {
    title: blog.title,
  };
}

export default async function Page({ params }: { params: { blogId: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog", params.blogId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchBlog(params.blogId, apiURL),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogCard params={params} />
    </HydrationBoundary>
  );
}
