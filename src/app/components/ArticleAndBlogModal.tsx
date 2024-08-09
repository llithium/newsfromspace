"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import formatDate from "../utils/formatDate";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";
import { ArticleAndBlog } from "../articles/[articleId]/components/ArticleCard";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bookmark } from "@/actions";
import { Session } from "@supabase/supabase-js";

export default function ArticleAndBlogModal({
  card,
}: {
  card: ArticleAndBlog;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useLockBodyScroll();

  const [session, setSession] = useState<Session | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const opts = pathname.split("/").filter((part) => part !== "");
  const type = opts[0];
  const id = opts[1];
  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const error = await bookmark.check(type, id);
      !error ? setBookmarked(true) : null;
      const { data, error: getSessionError } = await supabase.auth.getSession();
      if (!getSessionError) {
        setSession(data.session);
      }
    };

    fetchUserData();
  }, [type, id]);

  return (
    <div
      className="modalWrapper fixed inset-0 z-40 flex h-dvh w-screen flex-col items-center justify-center bg-white/40 backdrop-blur-sm dark:bg-black/40"
      onClick={() => router.back()}
    >
      <div
        className="modal relative top-6 mx-auto h-4/5 w-10/12 sm:w-4/5 md:h-4/5"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="flex h-full min-h-44 w-full flex-col overflow-y-auto md:flex md:flex-row md:overflow-y-visible">
          <CardHeader className="h-full max-h-60 w-full flex-shrink rounded-xl object-cover md:max-h-full md:w-1/2">
            <Image
              alt="Card image"
              className="h-full w-full rounded-xl object-cover"
              removeWrapper={true}
              src={card.image_url}
            />
          </CardHeader>
          <CardBody className="flex-grow overflow-visible">
            <div className="flex flex-row justify-between">
              <h2 className="pb-2 text-lg font-extrabold tracking-tight transition-colors first:mt-0 sm:text-2xl lg:text-4xl">
                {card.title}
              </h2>
              <div className="h-fit w-fit">
                {bookmarked ? (
                  <svg
                    onClick={async () => {
                      const error = await bookmark.delete(opts[0], opts[1]);
                      if (!error) {
                        setBookmarked(false);
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            } pointer-events-auto flex h-10 w-44 max-w-md justify-center rounded-lg bg-white px-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-content1`}
                          >
                            <div className="flex items-center">
                              <p className="font-medium text-danger">
                                Bookmark Deleted
                              </p>
                            </div>
                          </div>
                        ));
                      } else {
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            } pointer-events-auto flex h-10 w-44 max-w-md justify-center rounded-lg bg-white px-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-content1`}
                          >
                            <div className="flex items-center">
                              <p className="font-medium text-warning">
                                {error}
                              </p>
                            </div>
                          </div>
                        ));
                      }
                    }}
                    className="transition-opacity hover:opacity-80 active:opacity-disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="fill-primary-500"
                      d="M22.596 2.94L16.94 8.595L13.405 5.06l1.414-1.415l2.121 2.122l4.243-4.243zM4 3h8v2H6v14.057l6-4.286l6 4.286V10h2v12.943l-8-5.714l-8 5.714z"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={async () => {
                      const error = await bookmark.add(opts[0], opts[1]);
                      if (!error) {
                        setBookmarked(true);
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            } pointer-events-auto flex h-10 w-44 max-w-md justify-center rounded-lg bg-white px-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-content1`}
                          >
                            <div className="flex items-center">
                              <p className="font-medium text-primary">
                                Bookmark Added
                              </p>
                            </div>
                          </div>
                        ));
                      } else {
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            } pointer-events-auto flex h-10 w-44 max-w-md justify-center rounded-lg bg-white px-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-content1`}
                          >
                            <div className="flex items-center">
                              <p className="font-medium text-warning">
                                {error}
                              </p>
                            </div>
                          </div>
                        ));
                      }
                    }}
                    className={`transition-opacity hover:opacity-80 active:opacity-disabled ${!session ? "hidden" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M20 0v3h3v2h-3v3h-2V5h-3V3h3V0zM4 3h9v2H6v14.057l6-4.286l6 4.286V10h2v12.943l-8-5.714l-8 5.714z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <Divider />
            <p className="mt-2 overflow-y-auto text-sm font-semibold sm:text-lg lg:text-xl">
              {card.summary}{" "}
              <Link
                className="text-xl font-bold"
                href={card.url}
                isExternal
                showAnchorIcon
              >
                Read More
              </Link>
            </p>
            <div className="mt-auto flex justify-between">
              <div className="flex flex-row items-end justify-between">
                <div className="inline w-max">
                  <p className="text-sm italic sm:text-medium">
                    <Link href={card.url} isExternal>
                      {card.news_site}
                    </Link>
                  </p>
                  <small className="text-default-500">
                    {formatDate(card.published_at)}
                  </small>
                </div>
              </div>
              <Button
                className="mt-auto rounded-full bg-transparent sm:hidden"
                size="sm"
                isIconOnly
                onClick={() => router.back()}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m7.05 5.636l4.95 4.95l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.414l4.95-4.95l-4.95-4.95z"
                  />
                </svg>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
