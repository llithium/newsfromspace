import { Card, CardBody, Image, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ArticlesPageSkelton from "../Components/ArticlesPageSkelton";
import formatDate from "../utils/formatDate";
import { ArticlesAndBlogs, Result, apiURL, pageLimit } from "./ArticlesPage";

function BlogsPage() {
  const [blogs, setBlogs] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(pageLimit);

  const fetchMoreData = async () => {
    if (blogs.length < pageLimit) {
      return;
    }
    setIsFetching(true);
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
    setIsFetching(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiResponse = await fetch(
          apiURL + `/blogs/?limit=${pageLimit}&offset=0`,
        );
        const data: ArticlesAndBlogs = await apiResponse.json();
        const dataResults = data.results;
        setBlogs(dataResults);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleScroll = () => {
    if (isFetching) {
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
  }, [isFetching, isLoading]);

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
                      className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                      src={blog.image_url}
                    />

                    <CardBody className="flex-grow overflow-visible overflow-y-auto pb-0 pt-2 sm:flex-1">
                      <h2 className="scroll-m-20 border-b pb-0 text-xs font-bold tracking-tight transition-colors first:mt-0 sm:text-xl xl:text-2xl">
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
      {isFetching ? (
        <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
          <Spinner
            color="current"
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
