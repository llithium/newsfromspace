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
              <Card className="flex h-fit min-h-52 w-full flex-row py-2 dark:bg-neutral-950">
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
            </NextUILink>
          );
        }
        if (bookmark.type === "blog") {
          return (
            <NextUILink key={bookmark.id} href={bookmark.url} isExternal>
              <Card className="flex h-fit min-h-52 w-full flex-row py-2 dark:bg-neutral-950">
                <Image
                  alt="Blog image"
                  className="z-0 ml-2 h-full max-h-48 w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
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
            </NextUILink>
          );
        }
      })}
    </>
  );
};

export default HomeBookmarks;
