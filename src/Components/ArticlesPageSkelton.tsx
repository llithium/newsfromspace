import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function ArticlesPageSkelton() {
  const grid = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  return (
    <>
      {grid.map((_value, index) => (
        <Card
          key={index}
          className="flex h-32 w-full flex-row py-2 sm:h-full sm:min-h-44"
        >
          <Skeleton className="ml-2 h-full w-44 rounded-xl sm:w-44 md:flex-none lg:w-56"></Skeleton>
          <CardBody className="flex-1 overflow-visible py-2 ">
            <Skeleton className="rounded-lg">
              <h2 className="text-xs font-bold sm:text-large ">
                PlaceholderPlaceholderPlaceholderPlaceholderPlaceholderPlaceh
                PlaceholderPlaceholderPlaceholderPlac
              </h2>
            </Skeleton>
            <div className=" mt-auto">
              <Skeleton className="mt-2 w-fit rounded-lg">
                <p className="font m-0 text-tiny italic sm:text-medium">
                  Placehold
                </p>
              </Skeleton>
              <Skeleton className="mt-1 w-fit rounded-lg">
                <small className="m-0 text-tiny text-default-500">
                  Placeholderplacehold
                </small>
              </Skeleton>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
