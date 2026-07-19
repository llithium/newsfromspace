import { fetchJson } from "./api";

export default async function fetchArticle(
  articleId: string | undefined,
  apiURL: string,
) {
  if (articleId) {
    return fetchJson(apiURL + `/articles/${encodeURIComponent(articleId)}`, {
      label: "Article request",
      revalidate: 300,
    });
  }
}
