export default async function fetchBlog(
  blogId: string | undefined,
  apiURL: string,
) {
  if (blogId) {
    try {
      const apiResponse = await fetch(apiURL + `/blogs/${blogId}`, {
        next: { revalidate: 60 },
      });
      const blog = await apiResponse.json();
      return blog;
    } catch (error) {
      console.log(error);
      throw new Error("API request failed");
    }
  }
}
