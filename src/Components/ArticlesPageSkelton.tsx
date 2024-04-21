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
          className="sm:min-h-44 sm:h-full py-2 flex flex-row h-32 w-full"
        >
          <Skeleton className="rounded-xl ml-2 sm:w-44 md:flex-none lg:w-56 w-44 h-full"></Skeleton>
          <CardBody className="overflow-visible py-2 flex-1 ">
            <Skeleton className="rounded-lg">
              <h2 className="sm:text-large text-xs font-bold ">
                BlueHalo wins $24 million Air Force contract for research and
                analysis of satellite vulnerabilities
              </h2>
            </Skeleton>
            <div className=" mt-auto">
              <Skeleton className="rounded-lg w-fit mt-2">
                <p className="sm:text-medium text-tiny font italic m-0">
                  Placehold
                </p>
              </Skeleton>
              <Skeleton className="rounded-lg w-fit mt-1">
                <small className="text-default-500 text-tiny m-0">
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
