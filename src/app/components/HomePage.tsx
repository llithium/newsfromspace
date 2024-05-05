import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Tooltip,
  Link as NextUILink,
} from "@nextui-org/react";
import Link from "next/link";
import { launchApiUrl } from "../launches/page";
import { LaunchesUpcoming } from "../launches/components/Launches";
import formatDate from "../utils/formatDate";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("../components/CountdownTimer"), {
  ssr: false,
});
async function fetchUpcomingLaunches() {
  const res = await fetch(
    launchApiUrl + `/launch/upcoming/?mode=detailed&limit=3&offset=0`,
    {
      next: { revalidate: 180 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data for related articles");
  }
  return res.json();
}

export default async function HomePage() {
  const launches: LaunchesUpcoming = await fetchUpcomingLaunches();
  return (
    <>
      <div className="flex h-[85rem] flex-col gap-4 pb-2 md:h-[calc(100dvh-5rem)] md:flex-row">
        <Card className="h-full flex-1">
          <CardHeader>
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              href="/launches"
            >
              <h2 className="text-xl font-bold">Upcoming Launches</h2>
            </Link>
          </CardHeader>
          <CardBody className="flex flex-col gap-2 overflow-y-auto">
            {launches.results.map((launch) => {
              return (
                <Card
                  className="flex min-h-96 w-full  flex-col overflow-y-auto p-3"
                  key={launch.id}
                >
                  <h3 className="text-xl font-bold">{launch.name}</h3>
                  <div className="flex  items-end py-2">
                    <Image
                      alt="Agency logo"
                      height={40}
                      radius="sm"
                      src={
                        launch.launch_service_provider &&
                        launch.launch_service_provider.logo_url
                      }
                      width={40}
                    />
                    <h3 className="pl-2 text-lg font-semibold">
                      {launch.launch_service_provider &&
                        launch.launch_service_provider.name}
                    </h3>
                  </div>
                  <div className="flex h-full w-full flex-wrap md:flex-nowrap">
                    <div className="flex flex-grow flex-col px-2 ">
                      <div className="flex">
                        <p className="max-w-1/2 w-fit pr-2 font-semibold">
                          {formatDate(launch.window_start)}
                        </p>
                        <CountdownTimer date={launch.window_start} />
                      </div>
                      <Tooltip
                        delay={300}
                        content={launch.status && launch.status.description}
                      >
                        <p
                          className={`w-fit font-semibold ${
                            launch.status && launch.status.abbrev === "Success"
                              ? "text-success-500"
                              : ""
                          }`}
                        >
                          Status: {launch.status && launch.status.name}
                        </p>
                      </Tooltip>
                      <p className="py-2">
                        {launch.mission ? (
                          launch.mission.description
                        ) : (
                          <span className="py-2 opacity-60">
                            No description provided
                          </span>
                        )}
                      </p>
                      <Link
                        className="mt-auto self-end pb-0 font-semibold text-primary-500 transition-opacity hover:opacity-80 active:opacity-disabled"
                        href={`/launches/${launch.id}`}
                      >
                        More Info
                      </Link>
                      <div className=" flex justify-between gap-2 py-2  font-semibold">
                        <NextUILink
                          color="foreground"
                          href={launch.pad.map_url ? launch.pad.map_url : ""}
                        >
                          <p>{launch.pad && launch.pad.location.name}</p>
                        </NextUILink>
                        <Tooltip delay={300} content="Mission type">
                          <p className="w-fit ">
                            {launch.mission ? (
                              launch.mission.type
                            ) : (
                              <span className="opacity-60">Unknown</span>
                            )}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardBody>
        </Card>
        <div className="flex h-full flex-1 flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/articles"
              >
                <h2 className="text-xl font-bold">Latest Articles</h2>
              </Link>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href="/blogs"
              >
                <h2 className="text-xl font-bold">Latest Blogs</h2>
              </Link>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
