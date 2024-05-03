"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import formatDate from "../utils/formatDate";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { ArticleAndBlog } from "../articles/[articleId]/components/ArticleCard";

export default function ArticleAndBlogModal({
  card,
}: {
  card: ArticleAndBlog;
}) {
  const router = useRouter();
  useLockBodyScroll();

  return (
    <div
      className="modalWrapper fixed inset-0 z-50 flex h-dvh w-screen flex-col items-center justify-center bg-white/40 backdrop-blur-sm dark:bg-black/40"
      onClick={() => router.back()}
    >
      <div
        className="modal max-h-4/5 relative top-6 mx-auto h-4/5 w-10/12 sm:w-3/4 md:h-3/5"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="flex h-full min-h-44 w-full flex-col overflow-y-auto  md:flex md:flex-row md:overflow-y-visible">
          <CardHeader className="h-full max-h-60 w-full flex-shrink rounded-xl object-cover md:max-h-full md:w-1/2">
            <Image
              alt="Card image"
              className=" h-full w-full rounded-xl object-cover"
              removeWrapper={true}
              src={card.image_url}
            />
          </CardHeader>
          <CardBody className="flex-grow overflow-visible">
            <h2 className="border-b pb-2 text-lg font-extrabold tracking-tight transition-colors first:mt-0 sm:text-2xl lg:text-4xl">
              {card.title}
            </h2>
            <p className="mt-2 overflow-y-auto text-sm font-semibold sm:text-lg lg:text-xl">
              {card.summary}
              <Link className="" href={card.url} isExternal showAnchorIcon>
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
                  <small className="text-default-500" suppressHydrationWarning>
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
