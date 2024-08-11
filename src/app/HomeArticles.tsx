import { fetchLatestArticles } from "./HomePage";
import { Card, CardBody } from "@nextui-org/card";
import { Link as NextUILink } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { ArticlesAndBlogs } from "./articles/Articles";
import { formatDate } from "@/lib/utils";

const HomeArticles = async () => {
  const articles: ArticlesAndBlogs = await fetchLatestArticles();

  return (
    <>
      {articles.results.map((article) => {
        return (
          <NextUILink key={article.id} href={article.url} isExternal>
            <Card className="flex min-h-52 w-full flex-row py-2 sm:h-full">
              <Image
                alt="Article image"
                className="z-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                src={article.image_url}
              />

              <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                <h2 className="pb-0 text-medium font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                  {article.title}
                </h2>
                <Divider />
                <div className="mt-auto">
                  <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                    {article.news_site}
                  </p>
                  <small className="m-0 text-tiny text-default-500">
                    {formatDate(article.published_at)}
                  </small>
                </div>
              </CardBody>
            </Card>
          </NextUILink>
        );
      })}
    </>
  );
};

export default HomeArticles;
