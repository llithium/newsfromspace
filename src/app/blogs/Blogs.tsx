"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

import { apiURL, pageLimit } from "src/lib/variables";
import { useQuery } from "@tanstack/react-query";
import PageButtons from "src/components/ui/PageButtons";
import { fetchArticlesAndBlogs } from "@/lib/fetchArticlesAndBlogs";
import { formatDate } from "@/lib/utils";

export default function Blogs({ page }: { page: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["blogs", `page ${page}`],
    queryFn: () =>
      fetchArticlesAndBlogs(
        apiURL +
          `/blogs/?limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {isError && <div>{error.message}</div>}
        {data &&
          data.results.map((blog) => {
            return (
              <Card
                key={blog.id}
                className="flex h-32 flex-row justify-between transition-opacity hover:opacity-80 active:opacity-disabled sm:h-44"
              >
                <Link
                  scroll={false}
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="flex h-32 w-full flex-row py-2 sm:h-full"
                >
                  <Image
                    alt="Blog image"
                    className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                    src={blog.image_url}
                  />

                  <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                    <h2 className="pb-0 text-xs font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
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
                </Link>
                {/* <SaveIcon /> */}
              </Card>
            );
          })}
      </div>
      {data?.count ? (
        <div className="mx-auto w-fit py-4">
          <PageButtons count={data.count} page={page} />
        </div>
      ) : null}
    </>
  );
}
