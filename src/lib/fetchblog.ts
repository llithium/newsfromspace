export default async function fetchBlog(
  blogId: string | undefined,
  apiURL: string,
) {
  if (blogId) {
    try {
      const res = await fetch(apiURL + `/blogs/${blogId}`, {
        next: { revalidate: 60 },
      });
      const blog = await res.json();
      return blog;
    } catch (error) {
      throw new Error("API request failed");
    }
  }
}
