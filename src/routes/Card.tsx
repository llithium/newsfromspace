import { useNavigate, useParams } from "react-router-dom";
import { Card as CardElement, CardBody, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { apiURL, Launch, Event } from "./ArticlesPage";
import formatDate from "../utils/formatDate";

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

export default function Card() {
  const [article, setArticle] = useState<Article>();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function request() {
      if (params.id) {
        try {
          const apiResponse = await fetch(apiURL + `/v4/articles/${params.id}`);
          const data = await apiResponse.json();
          setArticle(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  }, []);

  const loadedArticle = article as Article;
  if (loadedArticle) {
    return (
      <div
        className="modalWrapper fixed inset-0 flex h-screen w-screen items-center bg-white/40 backdrop-blur-sm dark:bg-black/40"
        onClick={() => navigate(-1)}
      >
        <div
          className="modal m-y relative mx-auto h-2/3 w-10/12 sm:w-3/4 md:h-3/5"
          onClick={(e) => e.stopPropagation()}
        >
          <CardElement className="flex h-full min-h-44 flex-col overflow-y-auto px-2 py-2 md:flex md:flex-row">
            <Image
              alt="Card background"
              className="h-full max-h-full w-full flex-shrink rounded-xl object-cover md:h-full md:w-full"
              src={loadedArticle.image_url}
            />
            <CardBody className="flex-grow overflow-visible py-2">
              <h2 className="scroll-m-20 border-b pb-2 text-lg font-extrabold tracking-tight transition-colors first:mt-0 md:text-2xl">
                {loadedArticle.title}
              </h2>
              <p className="mt-2 text-sm font-semibold md:text-lg">
                {loadedArticle.summary}{" "}
                <Link
                  className=""
                  href={loadedArticle.url}
                  isExternal
                  showAnchorIcon
                >
                  Read More
                </Link>
              </p>
              <div className="mt-auto flex flex-row items-end justify-between">
                <div className="inline w-max">
                  <p className="text-sm italic sm:text-medium">
                    <Link href={loadedArticle.url} isExternal>
                      {loadedArticle.news_site}
                    </Link>
                  </p>
                  <small className="text-default-500 ">
                    {formatDate(loadedArticle.published_at)}
                  </small>
                </div>
              </div>
            </CardBody>
          </CardElement>
        </div>
      </div>
    );
  }
}
