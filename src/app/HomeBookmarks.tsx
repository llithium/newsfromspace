import { Card, CardBody } from "@nextui-org/card";
import { Link as NextUILink } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { getBookmarks } from "@/lib/getBookmarks";
import { formatDate } from "@/lib/utils";
import { BookmarkData } from "./HomePage";

const HomeBookmarks = async ({ bookmarks }: { bookmarks: BookmarkData[] }) => {
  const bookmarksArray = await getBookmarks(bookmarks);

  return (
    <>
      {bookmarksArray.map((bookmark) => {
        if (bookmark.type === "article") {
          return (
            <NextUILink key={bookmark.id} href={bookmark.url} isExternal>
              <Card className="flex min-h-52 w-full flex-col gap-2 py-2 dark:bg-neutral-950 sm:h-full sm:flex-row">
                <Image
                  alt="Article image"
                  className="z-0 ml-2 h-full w-full flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                  src={bookmark.image_url}
                />

                <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                  <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                    {bookmark.title}
                  </h2>
                  <Divider className="my-2" />
                  <div className="mt-auto">
                    <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                      {bookmark.news_site}
                    </p>
                    <small className="m-0 text-tiny text-default-500">
                      {formatDate(bookmark.published_at)}
                    </small>
                  </div>
                  <p>{bookmark.summary}</p>
                </CardBody>
              </Card>
            </NextUILink>
          );
        }
        if (bookmark.type === "blog") {
          return (
            <NextUILink key={bookmark.id} href={bookmark.url} isExternal>
              <Card className="flex min-h-52 w-full flex-col gap-2 py-2 dark:bg-neutral-950 sm:h-full sm:flex-row">
                <Image
                  alt="Blog image"
                  className="z-0 ml-2 h-full w-full flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                  src={bookmark.image_url}
                />

                <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                  <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                    {bookmark.title}
                  </h2>
                  <Divider className="my-2" />

                  <p>{bookmark.summary}</p>

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
            </NextUILink>
          );
        }
      })}
    </>
  );
};

export default HomeBookmarks;
