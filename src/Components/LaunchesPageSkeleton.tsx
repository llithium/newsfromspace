import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";

export default function LaunchesPageSkeleton() {
  const grid = Array.from({ length: 42 }, (_, index) => index);

  return (
    <>
      {grid.map((_value, index) => (
        <Card key={index} className="h-96">
          <CardHeader className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-lg"></Skeleton>
            <div className="flex h-10 w-full flex-col justify-between">
              <Skeleton className="w-fit rounded-lg">
                <h2 className="text-md h-5 w-fit font-bold">
                  PlaceholderplaceholdPlaceholderplac
                </h2>
              </Skeleton>
              <Skeleton className="w-fit rounded-lg">
                <p className="h-4 text-small  text-default-500">
                  Placeholderplacehol
                </p>
              </Skeleton>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="mb-2 rounded-lg">
                <p className="h-5  w-fit font-semibold">Placeh: PLA</p>
              </Skeleton>
              <Skeleton className="mb-2 rounded-lg">
                <p className="h-5 w-fit text-medium font-semibold">
                  Placeholderplacehold
                </p>
              </Skeleton>
            </div>
            <div className="flex h-full flex-col">
              <Skeleton className="h-4 w-full rounded-lg"> </Skeleton>
              <Skeleton className="mt-1 h-4 w-full rounded-lg"> </Skeleton>
              <Skeleton className="mt-1 h-4 w-full rounded-lg"> </Skeleton>
              <Skeleton className="mt-1 h-4 w-2/3 rounded-lg"> </Skeleton>
              <Skeleton className="mt-auto w-fit rounded-lg">
                <p className=" w-fit font-semibold">Placeholde PLA, PA, PLA</p>
              </Skeleton>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <Skeleton className="w-fit rounded-lg">
              <p className="font-bold tracking-wide">More Information</p>
            </Skeleton>
            <Skeleton className="w-fit rounded-lg">
              <p className="w-fit font-semibold">PlaceholderPla</p>
            </Skeleton>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
