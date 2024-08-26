export default async function fetchArticle(
  articleId: string | undefined,
  apiURL: string,
) {
  if (articleId) {
    try {
      const apiResponse = await fetch(apiURL + `/articles/${articleId}`);
      const article = await apiResponse.json();
      return article;
    } catch (error) {
      throw new Error("API request failed");
    }
  }
}
