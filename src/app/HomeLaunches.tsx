import { fetchUpcomingLaunchesHomePage } from "./HomePage";
import { Card } from "@nextui-org/card";
import { Link as NextUILink } from "@nextui-org/link";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Image } from "@nextui-org/image";
import dynamic from "next/dynamic";
import { LaunchesData } from "./launches/Launches";
import { formatDate } from "@/lib/utils";
const CountdownTimer = dynamic(() => import("@/components/ui/CountdownTimer"), {
  ssr: false,
});
const HomeLaunches = async () => {
  const launches: LaunchesData = await fetchUpcomingLaunchesHomePage();

  return (
    <>
      {launches.results.map((launch) => {
        return (
          <div key={launch.id}>
            <Card className="flex h-fit w-full flex-col overflow-y-auto p-3 dark:bg-neutral-950">
              <h3 className="text-xl font-bold">{launch.name}</h3>
              <div className="flex items-center py-2">
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
                <div className="flex flex-grow flex-col px-2">
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
                          : launch.status.abbrev === "Failure"
                            ? "text-red-600"
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
                  <div className="flex justify-between gap-2 py-2 font-semibold">
                    <NextUILink
                      color="foreground"
                      href={launch.pad.map_url ? launch.pad.map_url : ""}
                    >
                      <p>{launch.pad && launch.pad.location.name}</p>
                    </NextUILink>
                    <Tooltip delay={300} content="Mission type">
                      <p className="w-fit">
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
          </div>
        );
      })}
    </>
  );
};

export default HomeLaunches;
