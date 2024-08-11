import { ArticleAndBlog } from "@/app/articles/[articleId]/ArticleCard";
import { apiURL } from "src/lib/variables";
import fetchArticle from "./fetchArticle";
import fetchBlog from "./fetchblog";
import { Bookmark, BookmarkData } from "@/app/HomePage";

export async function getBookmarks(
  bookmarksData: BookmarkData[],
): Promise<Bookmark[]> {
  let bookmarksArray: Bookmark[] = [];
  await Promise.all(
    bookmarksData.map(async (bookmark) => {
      if (bookmark.type === "article") {
        const article: ArticleAndBlog = await fetchArticle(
          bookmark.item_id,
          apiURL,
        );
        bookmarksArray.push({
          ...article,
          type: bookmark.type,
          created_at: bookmark.created_at,
        });
      }
      if (bookmark.type === "blog") {
        const blog: ArticleAndBlog = await fetchBlog(bookmark.item_id, apiURL);
        bookmarksArray.push({
          ...blog,
          type: bookmark.type,
          created_at: bookmark.created_at,
        });
      }
    }),
  );
  return bookmarksArray.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}
