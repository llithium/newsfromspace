import { useEffect } from "react";
import { pageLimit } from "./ArticlesPage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { fetchUpcomingLaunches } from "../utils/fetchUpcomingLaunches";
import { useInfiniteQuery } from "@tanstack/react-query";
import formatDate from "../utils/formatDate";
import LaunchesPageSkeleton from "../Components/LaunchesPageSkeleton";

// const launchApiUrl = "https://ll.thespacedevs.com/2.2.0";
const launchApiUrl = "https://lldev.thespacedevs.com/2.2.0"; // * For development

export default function LaunchesPage() {
  const { data, isPending, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["launches/upcoming"],
      queryFn: fetchUpcomingLaunches,
      staleTime: 10 * 60 * 1000,
      initialPageParam:
        launchApiUrl + `/launch/upcoming/?limit=${pageLimit}&offset=0`,
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
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {isPending && <LaunchesPageSkeleton />}
        {isError && <div>{error.message}</div>}
        {data &&
          data.pages.map((page) => {
            return page.results.map((launch) => {
              return (
                <Card key={launch.id} className="h-96">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="Agency logo"
                      height={40}
                      radius="sm"
                      src={
                        launch.mission &&
                        launch.mission.agencies[0] &&
                        launch.mission.agencies[0].logo_url
                          ? launch.mission.agencies[0].logo_url
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
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="flex items-center justify-between gap-3">
                      <Tooltip content={launch.status.description}>
                        <p
                          className={`w-fit font-semibold ${
                            launch.status.abbrev === "Success"
                              ? "text-success-500"
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
                    <div className="flex h-full flex-col">
                      <p>{launch.mission.description}</p>
                      <Link
                        color="foreground"
                        className="mt-auto"
                        href={launch.pad.map_url}
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
                      className="font-bold tracking-wide"
                      showAnchorIcon
                      href={`/launches/${launch.id}`}
                    >
                      More Information
                    </Link>
                    <p className="w-fit font-semibold">{launch.mission.type}</p>
                  </CardFooter>
                </Card>
              );
            });
          })}
        {/* TODO Add page Skeleton */}
      </div>
      {isFetchingNextPage && (
        <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
          <Spinner
            color="current"
            className="relative bottom-10 z-50"
            classNames={{
              wrapper: "h-24 w-24",
            }}
            size="lg"
            // label="Loading..."
          />
        </div>
      )}
      <div ref={ref}></div>
    </>
  );
}

export interface LaunchesUpcoming {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  id: string;
  url: string;
  slug: string;
  name: string;
  status: NetPrecision;
  last_updated: Date;
  net: Date;
  window_end: Date;
  window_start: string;
  net_precision: NetPrecision;
  probability: number | null;
  weather_concerns: null | string;
  holdreason: string;
  failreason: string;
  hashtag: null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission;
  pad: Pad;
  webcast_live: boolean;
  image: string;
  infographic: null;
  program: Program[];
  orbital_launch_attempt_count: number;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
  type: ResultType;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  type: LaunchServiceProviderType;
}

enum LaunchServiceProviderType {
  Commercial = "Commercial",
  Government = "Government",
  Multinational = "Multinational",
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  launch_designator: null;
  type: string;
  orbit: NetPrecision;
  agencies: Agency[];
  info_urls: string[];
  vid_urls: string[];
}

export interface Agency {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: LaunchServiceProviderType | null;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  launch_library_url: null;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: string;
  wiki_url: string;
  logo_url: null | string;
  image_url: null | string;
  nation_url: null | string;
}

export interface NetPrecision {
  id: number;
  name: string;
  abbrev: string;
  description?: string;
}

export interface Pad {
  id: number;
  url: string;
  agency_id: number | null;
  name: string;
  description: null | string;
  info_url: null;
  wiki_url: null | string;
  map_url: string;
  latitude: string;
  longitude: string;
  location: Location;
  country_code: CountryCode;
  map_image: string;
  total_launch_count: number;
  orbital_launch_attempt_count: number;
}

enum CountryCode {
  Chn = "CHN",
  Kaz = "KAZ",
  Usa = "USA",
}

export interface Location {
  id: number;
  url: string;
  name: string;
  country_code: CountryCode;
  description: string;
  map_image: string;
  timezone_name: string;
  total_launch_count: number;
  total_landing_count: number;
}

export interface Program {
  id: number;
  url: string;
  name: string;
  description: string;
  agencies: LaunchServiceProvider[];
  image_url: string;
  start_date: Date;
  end_date: null;
  info_url: string;
  wiki_url: string;
  mission_patches: MissionPatch[];
  type: TypeClass;
}

export interface MissionPatch {
  id: number;
  name: string;
  priority: number;
  image_url: string;
  agency: LaunchServiceProvider;
}

export interface TypeClass {
  id: number;
  name: string;
}

export interface Rocket {
  id: number;
  configuration: Configuration;
}

export interface Configuration {
  id: number;
  url: string;
  name: string;
  family: string;
  full_name: string;
  variant: Variant;
}

enum Variant {
  Block5 = "Block 5",
  Empty = "",
  VN22 = "V N22",
}

enum ResultType {
  Normal = "normal",
}
