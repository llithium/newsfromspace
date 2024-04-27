import { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { testData } from "../testData";

const launchApiUrl = "https://ll.thespacedevs.com/2.2.0";

export default function LaunchesPage() {
  const [upcomingLaunches, setUpcomingLaunches] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(pageLimit);

  // async function fetchMoreData() {
  //   try {
  //     setIsFetching(true);
  //     const apiResponse = await fetch(
  //       launchApiUrl + `/launch/upcoming/?limit=${pageLimit}&offset=${offset}`,
  //     );
  //     const data: LaunchesUpcoming = await apiResponse.json();
  //     const dataResults = data.results;
  //     setUpcomingLaunches((prevUpcomingLaunches) => [
  //       ...prevUpcomingLaunches,
  //       ...dataResults,
  //     ]);

  //     setOffset((prevOffset) => prevOffset + pageLimit);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsFetching(false);
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const apiResponse = await fetch(
  //         launchApiUrl +
  //           `/launch/upcoming/?limit=${pageLimit}&offset=${offset}`,
  //       );
  //       const data: LaunchesUpcoming = await apiResponse.json();
  //       const dataResults = data.results;
  //       setUpcomingLaunches(dataResults);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, []);

  // const handleScroll = () => {
  //   if (isFetching) {
  //     return;
  //   }
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight;
  //   const scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     fetchMoreData();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isFetching, isLoading]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 ">
        {}
        {testData &&
          testData.map((launch, Index) => {
            return (
              <Card key={launch.id} className="h-96">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={
                      launch.mission.agencies[0]
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
                  <p className={`w-fit font-semibold ${""}`}>
                    Status: {launch.status.abbrev}
                  </p>
                  <p>{launch.status.description}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link showAnchorIcon href={`/launches/${launch.id}`}>
                    More Information
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
      {isFetching ? (
        <div className="fixed inset-0 flex h-screen w-screen items-end justify-center">
          <Spinner
            color="current"
            className="relative bottom-10 z-50"
            classNames={{
              wrapper: "h-24 w-24",
            }}
            size="lg"
            // label="Loading..."
            // color="warning"
          />
        </div>
      ) : null}
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
  window_start: Date;
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

export enum LaunchServiceProviderType {
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
  info_urls: any[];
  vid_urls: any[];
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
  logo_url: string;
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

export enum CountryCode {
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

export enum Variant {
  Block5 = "Block 5",
  Empty = "",
  VN22 = "V N22",
}

export enum ResultType {
  Normal = "normal",
}
