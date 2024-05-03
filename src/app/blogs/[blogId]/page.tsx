"use client";

import { useParams } from "next/navigation";
import ArticleAndBlogModal from "../../components/ArticleAndBlogModal";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { apiURL } from "../../articles/page";

export default function BlogCard() {
  const params = useParams<{ blogId: string }>();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blog", params.blogId],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchBlog(params.blogId),
  });

  async function fetchBlog(blogId: string | undefined) {
    if (blogId) {
      try {
        const apiResponse = await fetch(apiURL + `/blogs/${blogId}`);
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
    <ArticleAndBlogModal card={data} />
  ) : (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
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
