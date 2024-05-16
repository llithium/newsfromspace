import { ArticlesAndBlogs } from "../articles/components/Articles";

export async function fetchArticlesAndBlogs({
  pageParam,
}: {
  pageParam: string;
}) {
  try {
    const apiResponse = await fetch(pageParam, {
      next: { revalidate: 60 },
    });
    const articlesAndBlogs: ArticlesAndBlogs = await apiResponse.json();
    return articlesAndBlogs;
  } catch (error) {
    throw new Error("API request failed");
  }
}
