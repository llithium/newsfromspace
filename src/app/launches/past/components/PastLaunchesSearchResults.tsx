"use client";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPastLaunches } from "../utils/fetchPastLaunches";
import { useSearchParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
import InfiniteScrollSpinner from "@/components/InfiniteScrollSpinner";
import { launchApiUrl, pageLimit } from "@/utils/variables";

export default function PastLaunchesSearchResults() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pastLaunchesSearch", search],
      queryFn: fetchPastLaunches,
      staleTime: 15 * 60 * 1000,
      initialPageParam:
        launchApiUrl +
        `/launch/previous/?mode=detailed&limit=${pageLimit}&offset=0&search=${search}`,
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {isError && <div>{error.message}</div>}
        {data && data.pages[0].count > 0 ? (
          data.pages.map((page) => {
            return page.results.map((launch) => {
              return (
                <Card key={launch.id} className="h-96">
                  <CardHeader className="flex flex-row justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        alt="Agency logo"
                        height={40}
                        radius="sm"
                        src={
                          launch.launch_service_provider.logo_url
                            ? launch.launch_service_provider.logo_url
                            : ""
                        }
                        width={40}
                      />
                      <div className="flex flex-col">
                        <h2 className="text-md font-bold">{launch.name}</h2>
                        <p className="text-small text-default-500">
                          {launch.launch_service_provider.name}
                        </p>
                      </div>
                    </div>
                    {/* <svg
                      className="hidden transition-opacity hover:opacity-80 active:opacity-disabled md:inline"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 0v3h3v2h-3v3h-2V5h-3V3h3V0zM4 3h9v2H6v14.057l6-4.286l6 4.286V10h2v12.943l-8-5.714l-8 5.714z"
                      />
                    </svg> */}
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="flex items-center justify-between gap-3">
                      <Tooltip delay={300} content={launch.status.description}>
                        <p
                          className={`w-fit font-semibold ${
                            launch.status.abbrev === "Success"
                              ? "text-success-500"
                              : launch.status.abbrev === "Failure"
                                ? "text-red-600"
                                : ""
                          }`}
                        >
                          Status: {launch.status.abbrev}
                        </p>
                      </Tooltip>
                      <p className="w-fit text-medium font-semibold">
                        {formatDate(launch.window_start)}
                      </p>
                    </div>
                    <div className="flex h-full flex-col pt-2">
                      <p>
                        {launch.mission ? (
                          launch.mission.description
                        ) : (
                          <span className="opacity-60">
                            No description provided
                          </span>
                        )}
                      </p>
                      <Link
                        color="foreground"
                        className="mt-auto transition-opacity hover:opacity-80 active:opacity-disabled"
                        href={launch.pad.map_url ? launch.pad.map_url : ""}
                      >
                        <p className="font-semibold">
                          {launch.pad.location.name}
                        </p>
                      </Link>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex justify-between">
                    <Link
                      className="font-bold tracking-wide text-primary transition-opacity hover:opacity-80 active:opacity-disabled"
                      href={`/launches/${launch.id}`}
                    >
                      More Information
                    </Link>
                    <Tooltip delay={300} content="Mission type">
                      <p className="w-fit font-semibold">
                        {launch.mission ? (
                          launch.mission.type
                        ) : (
                          <span className="opacity-60">Unknown</span>
                        )}
                      </p>
                    </Tooltip>
                  </CardFooter>
                </Card>
              );
            });
          })
        ) : (
          <div className="col-span-2 mt-auto flex w-full flex-row justify-center">
            <h2 className="text-2xl">
              No results found for{" "}
              <span className="font-semibold tracking-wider">{search}</span>
            </h2>
          </div>
        )}
      </div>
      {isFetchingNextPage && <InfiniteScrollSpinner />}
      <div ref={ref}></div>
    </>
  );
}
