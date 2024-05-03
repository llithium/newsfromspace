import { Card, CardBody, Divider, Skeleton } from "@nextui-org/react";

export default function Loading() {
  const grid = Array.from({ length: 42 }, (_, index) => index);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {grid.map((_value, index) => (
          <Card
            key={index}
            className="flex h-32 w-full flex-row py-2 sm:h-full sm:min-h-44"
          >
            <Skeleton className="sm:flex-0 ml-2 h-full w-44 flex-shrink rounded-xl object-cover sm:w-44 lg:w-56"></Skeleton>
            <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
              <Skeleton className="h-7 w-full rounded-lg"> </Skeleton>
              <Skeleton className="mb-1 mt-1 h-7 w-2/5 rounded-lg"> </Skeleton>
              <Divider />
              <div className=" mt-auto">
                <Skeleton className="mt-2 w-fit rounded-lg">
                  <p className="font m-0 text-tiny italic sm:text-medium">
                    Placeholderpla
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
      </div>
    </>
  );
}
