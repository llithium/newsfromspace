import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleAndBlogCard from "../Components/ArticleAndBlogCard";
import { Spinner } from "@nextui-org/react";
import { ArticleAndBlog } from "./ArticleCard";
import { apiURL } from "./ArticlesPage";

export default function BlogCard() {
  const [blog, setBlog] = useState<ArticleAndBlog>();

  const params = useParams();

  useEffect(() => {
    async function request() {
      if (params.id) {
        try {
          const apiResponse = await fetch(apiURL + `/blogs/${params.id}`);
          const data = await apiResponse.json();
          setBlog(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  }, []);

  const loadedBlog = blog as ArticleAndBlog;
  return loadedBlog ? (
    <ArticleAndBlogCard card={loadedBlog} />
  ) : (
    <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
      <Spinner
        className="relative bottom-1/2 z-50"
        classNames={{
          wrapper: "w-44 h-44",
        }}
        size="lg"
        // label="Loading..."
        // color="warning"
      />
    </div>
  );
}
