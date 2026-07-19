import { fetchJson } from "./api";

export default async function fetchBlog(
  blogId: string | undefined,
  apiURL: string,
) {
  if (blogId) {
    return fetchJson(apiURL + `/blogs/${encodeURIComponent(blogId)}`, {
      label: "Blog request",
      revalidate: 300,
    });
  }
}
