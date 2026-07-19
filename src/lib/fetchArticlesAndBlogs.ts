import { ArticlesAndBlogs } from "../app/articles/Articles";
import { fetchJson } from "./api";

export async function fetchArticlesAndBlogs(pageParam: string) {
  return fetchJson<ArticlesAndBlogs>(pageParam, {
    label: "News request",
    revalidate: 300,
  });
}
