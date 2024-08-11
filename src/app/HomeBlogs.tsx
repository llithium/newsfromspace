import { Card, CardBody } from "@nextui-org/card";
import { Link as NextUILink } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { fetchLatestBlogs } from "./HomePage";
import { ArticlesAndBlogs } from "./articles/Articles";
import { formatDate } from "@/lib/utils";

const HomeBlogs = async () => {
  const blogs: ArticlesAndBlogs = await fetchLatestBlogs();

  return (
    <>
      {blogs.results.map((blog) => {
        return (
          <NextUILink key={blog.id} href={blog.url} isExternal>
            <Card className="flex min-h-52 w-full flex-row py-2 dark:bg-neutral-950 sm:h-full">
              <Image
                alt="Blog image"
                className="z-0 ml-2 h-full max-h-48 w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                src={blog.image_url}
              />

              <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                  {blog.title}
                </h2>
                <Divider />
                <div className="mt-auto">
                  <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                    {blog.news_site}
                  </p>
                  <small className="m-0 text-tiny text-default-500">
                    {formatDate(blog.published_at)}
                  </small>
                </div>
              </CardBody>
            </Card>
          </NextUILink>
        );
      })}
    </>
  );
};

export default HomeBlogs;
