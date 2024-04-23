import { useNavigate } from "react-router-dom";
import { ArticleAndBlog } from "./../routes/ArticleCard";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import formatDate from "../utils/formatDate";

interface ArticleAndBlogCardProps {
  card: ArticleAndBlog;
}

export default function ArticleAndBlogCard({ card }: ArticleAndBlogCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="modalWrapper fixed inset-0 flex h-screen w-screen items-center bg-white/40 backdrop-blur-sm dark:bg-black/40"
      onClick={() => navigate(-1)}
    >
      <div
        className="modal m-y relative mx-auto h-3/4 w-10/12 sm:w-3/4 md:h-3/5"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="flex h-full min-h-44 flex-col overflow-y-auto px-2 py-2 md:flex md:flex-row md:overflow-y-visible">
          <Image
            alt="Card background"
            className="h-full max-h-full w-full flex-shrink rounded-xl object-cover md:h-full md:w-full"
            src={card.image_url}
          />
          <CardBody className="flex-grow overflow-visible py-2">
            <h2 className="scroll-m-20 border-b pb-2 text-lg font-extrabold tracking-tight transition-colors first:mt-0 md:text-2xl">
              {card.title}
            </h2>
            <p className="mt-2 overflow-y-auto text-sm font-semibold md:text-lg">
              {card.summary}{" "}
              <Link className="" href={card.url} isExternal showAnchorIcon>
                Read More
              </Link>
            </p>
            <div className="mt-auto flex flex-row items-end justify-between">
              <div className="inline w-max">
                <p className="text-sm italic sm:text-medium">
                  <Link href={card.url} isExternal>
                    {card.news_site}
                  </Link>
                </p>
                <small className="text-default-500 ">
                  {formatDate(card.published_at)}
                </small>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
