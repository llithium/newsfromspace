import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { BookmarkData } from "@/components/LoggedInHomePage";
import { Card, CardBody, Image, Divider } from "@nextui-org/react";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import PageButtons from "./components/PageButtons";
import { getBookmarks } from "./utils/getBookmarks";
import { pageLimit } from "@/utils/variables";

export default async function BookmrksPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (getUserError || !userData?.user) {
    redirect("/login");
  }

  let {
    data: bookmarks,
    error: getBookmarksError,
    count,
  } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact" })
    .range(
      ((parseInt(searchParams.page) || 1) - 1) * parseInt(pageLimit),
      (parseInt(searchParams.page) || 1) * parseInt(pageLimit) - 1,
    )
    .eq("user_id", userData.user?.id);

  if (
    parseInt(searchParams.page) > Math.ceil(count || 0 / parseInt(pageLimit))
  ) {
    redirect(`/bookmarks`);
  }
  if (getBookmarksError) {
    console.log(getBookmarksError?.message);
    throw new Error(getBookmarksError.message);
  }

  const bookmarksArray = await getBookmarks(bookmarks as BookmarkData[]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {bookmarksArray.length > 0 ? (
          bookmarksArray.map((bookmark) => {
            if (bookmark.type === "article") {
              return (
                <Link
                  className="transition-opacity hover:opacity-80 active:opacity-disabled"
                  key={bookmark.id}
                  href={`/articles/${bookmark.id}`}
                >
                  <Card className="flex h-32 w-full flex-row py-2 sm:h-44  ">
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
                  <Card className="flex h-32 w-full flex-row py-2 sm:h-44">
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
          })
        ) : (
          <Card className="flex min-h-52 w-full flex-row items-center justify-center p-3 sm:h-full">
            <h2 className="text-center text-2xl font-semibold">
              You have 0 bookmarks
            </h2>
          </Card>
        )}
      </div>
      {count ? (
        <div className="mx-auto w-fit py-4">
          <PageButtons count={count} page={searchParams.page || "1"} />
        </div>
      ) : null}
    </>
  );
}
