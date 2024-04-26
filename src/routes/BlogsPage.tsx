import { Card, CardBody, Image, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ArticlesPageSkelton from "../Components/ArticlesPageSkelton";
import formatDate from "../utils/formatDate";
import { ArticlesAndBlogs, Result, pageLimit } from "./ArticlesPage";

export const apiURL = "https://api.spaceflightnewsapi.net/v4";

function BlogsPage() {
  const [blogs, setBlogs] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchMoreData = async () => {
    if (blogs.length < pageLimit) {
      return;
    }
    setIsLoading(true);
    try {
      const apiResponse = await fetch(
        apiURL + `/blogs/?limit=${pageLimit}&offset=${offset}`,
      );
      const data: ArticlesAndBlogs = await apiResponse.json();
      const dataResults = data.results;
      setBlogs((prevBlogs) => [...prevBlogs, ...dataResults]);
      setOffset((prevOffset) => prevOffset + pageLimit);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const apiResponse = await fetch(
          apiURL + `/blogs/?limit=${pageLimit}&offset=0`,
        );
        const data: ArticlesAndBlogs = await apiResponse.json();
        const dataResults = data.results;
        setBlogs(dataResults);
        setOffset((prevOffset) => prevOffset + pageLimit);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleScroll = () => {
    if (isLoading) {
      return;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (clientHeight + scrollTop >= scrollHeight) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {blogs
          ? blogs.map((blog) => {
              return (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="h-32 sm:h-44"
                >
                  <Card
                    key={blog.id}
                    className="flex h-32 w-full flex-row py-2 sm:h-full "
                  >
                    <Image
                      alt="Card background"
                      className="z-0 ml-2 h-full w-44 flex-1 rounded-xl object-cover sm:w-44 lg:w-56"
                      src={blog.image_url}
                    />

                    <CardBody className="flex-1 overflow-visible pb-0 pt-2">
                      <h2 className="scroll-m-20 border-b pb-0 text-xs font-bold tracking-tight transition-colors first:mt-0 sm:text-large">
                        {blog.title}
                      </h2>
                      <div className="mt-auto">
                        <p className="relative top-2 m-0 text-tiny italic sm:top-0 sm:text-medium">
                          {blog.news_site}
                        </p>

                        <small className="m-0 text-tiny text-default-500">
                          {formatDate(blog.published_at)}
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            })
          : null}
        {isLoading && <ArticlesPageSkelton />}
      </div>
      {isLoading && offset > 0 ? (
        <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
          <Spinner
            className="relative bottom-10 z-50"
            classNames={{
              wrapper: "w-24 h-24",
            }}
            size="lg"
            // label="Loading..."
            // color="warning"
          />
        </div>
      ) : null}
      <Outlet />
    </>
  );
}

export default BlogsPage;
