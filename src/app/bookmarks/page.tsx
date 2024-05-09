import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getBookmarks } from "@/components/LoggedInHomePage";
import { Card, CardBody, Image, Divider } from "@nextui-org/react";
import formatDate from "@/utils/formatDate";
import Link from "next/link";

export default async function BookmrksPage() {
  const supabase = createClient();

  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (getUserError || !userData?.user) {
    redirect("/login");
  }
  let { data: bookmarks, error: getBookmarksError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userData.user?.id);

  const bookmarksArray = await getBookmarks(bookmarks);

  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
      {bookmarksArray.map((bookmark) => {
        if (bookmark.type === "article") {
          return (
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              key={bookmark.id}
              href={`/articles/${bookmark.id}`}
            >
              <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full ">
                <Image
                  alt="Article image"
                  className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                  src={bookmark.image_url}
                />

                <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                  <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                    {bookmark.title}
                  </h2>
                  <Divider />
                  <div className="mt-auto">
                    <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                      {bookmark.news_site}
                    </p>
                    <small className="m-0 text-tiny text-default-500">
                      {formatDate(bookmark.published_at)}
                    </small>
                  </div>
                </CardBody>
              </Card>
            </Link>
          );
        }
        if (bookmark.type === "blog") {
          return (
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              key={bookmark.id}
              href={`/blogs/${bookmark.id}`}
            >
              <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full ">
                <Image
                  alt="Blog image"
                  className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                  src={bookmark.image_url}
                />

                <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                  <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                    {bookmark.title}
                  </h2>
                  <Divider />
                  <div className="mt-auto">
                    <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                      {bookmark.news_site}
                    </p>
                    <small className="m-0 text-tiny text-default-500">
                      {formatDate(bookmark.published_at)}
                    </small>
                  </div>
                </CardBody>
              </Card>
            </Link>
          );
        }
      })}
    </div>
  );
}
