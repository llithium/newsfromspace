"use client";

import ArticleAndBlogModal from "../../../components/ArticleAndBlogModal";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import fetchBlog from "../../utils/fetchblog";
import { notFound } from "next/navigation";
import { apiURL } from "@/utils/variables";

export default function BlogCard({ params }: { params: { blogId: string } }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blog", params.blogId],
    staleTime: 3600 * 60 * 1000,
    queryFn: () => fetchBlog(params.blogId, apiURL),
  });

  if (data.detail === "Not found.") {
    notFound();
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
