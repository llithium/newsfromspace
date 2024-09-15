import { ArticlesAndBlogs } from "../app/articles/Articles";

export async function fetchArticlesAndBlogs(pageParam: string) {
  try {
    const apiResponse = await fetch(pageParam, { cache: "no-cache" });
    const articlesAndBlogs: ArticlesAndBlogs = await apiResponse.json();
    return articlesAndBlogs;
  } catch (error) {
    throw new Error("API request failed");
  }
}
