import { ArticlesAndBlogs } from "../routes/ArticlesPage";

export async function fetchArticlesAndBlogs({
  pageParam,
}: {
  pageParam: string;
}) {
  try {
    const apiResponse = await fetch(pageParam);
    const articlesAndBlogs: ArticlesAndBlogs = await apiResponse.json();
    return articlesAndBlogs;
  } catch (error) {
    console.log(error);
    throw new Error("API request failed");
  }
}
