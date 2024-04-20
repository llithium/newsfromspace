import { useNavigate, useParams } from "react-router-dom";
import { Card as CardElement, CardBody, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { apiURL, Launch, Event } from "./Root";

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
        className="modalWrapper fixed inset-0 w-screen h-screen bg-white/40 backdrop-blur-sm flex items-center"
        onClick={() => navigate("/")}
      >
        <div
          className="modal relative sm:w-3/4 md:h-96 w-10/12  h-2/3 mx-auto m-y"
          onClick={(e) => e.stopPropagation()}
        >
          <CardElement className="px-2 py-2 md:flex md:flex-row min-h-44 h-full flex flex-col">
            {/* <div className="mx-2 md:w-min md:h-96 lg:ml-2 flex-1"> */}
            <Image
              alt="Card background"
              className="md:w-full md:h-full max-h-full flex-shrink object-cover rounded-xl w-full h-full"
              src={loadedArticle.image_url}
            />
            {/* </div> */}

            <CardBody className="overflow-visible py-2 flex-grow ">
              <h2 className="text-lg md:text-2xl font-extrabold ">
                {loadedArticle.title}
              </h2>
              <p className="text-sm md:text-lg  font-semibold ">
                {loadedArticle.summary}
              </p>
              <div className="mt-auto flex flex-row justify-between items-end">
                <div className="  inline w-max">
                  <p className="sm:text-medium text-sm italic">
                    <Link href={loadedArticle.url} isExternal>
                      {loadedArticle.news_site}
                    </Link>
                  </p>
                  <small className="text-default-500 ">
                    {loadedArticle.published_at}
                  </small>
                </div>
                <Link
                  className=""
                  href={loadedArticle.url}
                  isExternal
                  showAnchorIcon
                >
                  Read More
                </Link>
              </div>
            </CardBody>
          </CardElement>
        </div>
      </div>
    );
  }
}
