import { useParams } from "react-router-dom";
import ArticleAndBlogCard from "../Components/ArticleAndBlogCard";
import { Spinner } from "@nextui-org/react";
import { apiURL } from "./ArticlesPage";
import { useQuery } from "@tanstack/react-query";

export default function BlogCard() {
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blog", params.id],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchBlog(params.id),
  });

  async function fetchBlog(id: string | undefined) {
    if (id) {
      try {
        const apiResponse = await fetch(apiURL + `/blogs/${id}`);
        const blog = await apiResponse.json();
        return blog;
      } catch (error) {
        console.log(error);
        throw new Error("API request failed");
      }
    }
  }

  isError && <div>{error.message}</div>;
  return !isPending ? (
    <ArticleAndBlogCard card={data} />
  ) : (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <Spinner
        color="current"
        className="relative z-50"
        classNames={{
          wrapper: "w-44 h-44",
        }}
        size="lg"
        // label="Loading..."
      />
    </div>
  );
}
