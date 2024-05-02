import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import formatDate from "../utils/formatDate";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { launchApiUrl } from "./LaunchesPage";

export default function LaunchInformationPage() {
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["launch", params.id],
    staleTime: 60 * 60 * 1000,
    queryFn: () => fetchLaunch(params.id),
  });

  async function fetchLaunch(id: string | undefined) {
    if (id) {
      try {
        const apiResponse = await fetch(launchApiUrl + `/launch/${id}`);
        const launch: Launch = await apiResponse.json();
        return launch;
      } catch (error) {
        console.log(error);
        throw new Error("API request failed");
      }
    }
  }
  return (
    <div className="grid min-h-full grid-cols-1 gap-2 xl:grid-cols-2">
      {isPending && (
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
          <Spinner
            color="current"
            className="relative z-50"
            classNames={{
              wrapper: "w-44 h-44",
            }}
            size="lg"
            // label="Loading..."
          />
        </div>
      )}
      {isError && <div>{error.message}</div>}
      {data && (
        <>
          <Card className="w-full p-3">
            <h2 className="text-4xl font-bold">{data.name}</h2>
            <div className="flex items-end py-2">
              <Image
                alt="Agency logo"
                height={40}
                radius="sm"
                src={
                  data.launch_service_provider.logo_url &&
                  data.launch_service_provider.logo_url
                }
                width={40}
              />
              <h3 className="pl-2 text-lg font-semibold">
                {data.launch_service_provider.name}
              </h3>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap">
              <Image
                className="h-full flex-shrink object-cover md:max-w-xs"
                src={data.image}
              ></Image>
              <div className="flex flex-grow flex-col px-2 ">
                <p className="max-w-1/2 w-fit font-bold">
                  {formatDate(data.window_start)}
                </p>
                <Tooltip content={data.status.description}>
                  <p
                    className={`w-fit font-semibold ${
                      data.status.abbrev === "Success" ? "text-success-500" : ""
                    }`}
                  >
                    Status: {data.status.name}
                  </p>
                </Tooltip>
                <p className="py-2">
                  {data.mission ? (
                    data.mission.description
                  ) : (
                    <span className="py-2 opacity-60">
                      No description provided
                    </span>
                  )}
                </p>
                <div className="mt-auto flex justify-between">
                  <Link color="foreground" href={data.pad.map_url}>
                    <p className="font-semibold">{data.pad.location.name}</p>
                  </Link>
                  <Tooltip content="Mission type">
                    <p className="w-fit ">
                      {data.mission ? (
                        data.mission.type
                      ) : (
                        <span className="opacity-60">Unknown</span>
                      )}
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader className="flex justify-center">
              <h2 className="text-4xl font-bold">
                {data.launch_service_provider.name}
              </h2>
              <Image
                width={200}
                height={200}
                radius="sm"
                src={data.launch_service_provider.logo_url}
              ></Image>
            </CardHeader>
            <CardBody>
              <p>{data.launch_service_provider.description}</p>
            </CardBody>
            <CardFooter className="flex flex-wrap justify-between">
              <p>Founded: {data.launch_service_provider.founding_year}</p>
              <Link isExternal showAnchorIcon>
                {data.launch_service_provider.info_url}
              </Link>
              <p>{data.launch_service_provider.administrator}</p>
              <p>{data.launch_service_provider.type}</p>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
export interface Launch {
  id: string;
  url: string;
  slug: string;
  flightclub_url: null;
  r_spacex_api_id: null;
  name: string;
  status: NetPrecision;
  last_updated: Date;
  updates: Update[];
  net: Date;
  net_precision: NetPrecision;
  window_end: Date;
  window_start: string;
  probability: null;
  weather_concerns: null;
  holdreason: string;
  failreason: string;
  hashtag: null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission;
  pad: Pad;
  infoURLs: any[];
  vidURLs: VidURL[];
  webcast_live: boolean;
  timeline: any[];
  image: string;
  infographic: null;
  program: any[];
  orbital_launch_attempt_count: null;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
  pad_turnaround: string;
  mission_patches: MissionPatch[];
  type: string;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
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
  image_url: null;
  nation_url: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  launch_designator: null;
  type: string;
  orbit: NetPrecision;
  agencies: LaunchServiceProvider[];
  info_urls: any[];
  vid_urls: any[];
}

export interface NetPrecision {
  id: number;
  name: string;
  abbrev: string;
  description?: string;
}

export interface MissionPatch {
  id: number;
  name: string;
  priority: number;
  image_url: string;
  agency: Agency;
}

export interface Agency {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Pad {
  id: number;
  url: string;
  agency_id: number;
  name: string;
  description: string;
  info_url: string;
  wiki_url: string;
  map_url: string;
  latitude: string;
  longitude: string;
  location: Location;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  orbital_launch_attempt_count: number;
}

export interface Location {
  id: number;
  url: string;
  name: string;
  country_code: string;
  description: string;
  map_image: string;
  timezone_name: string;
  total_launch_count: number;
  total_landing_count: number;
}

export interface Rocket {
  id: number;
  configuration: Configuration;
  launcher_stage: any[];
  spacecraft_stage: null;
}

export interface Configuration {
  id: number;
  url: string;
  name: string;
  active: boolean;
  reusable: boolean;
  description: string;
  family: string;
  full_name: string;
  manufacturer: LaunchServiceProvider;
  program: any[];
  variant: string;
  alias: string;
  min_stage: number;
  max_stage: number;
  length: null;
  diameter: number;
  maiden_flight: null;
  launch_cost: null;
  launch_mass: null;
  leo_capacity: null;
  gto_capacity: null;
  to_thrust: number;
  apogee: number;
  vehicle_range: null;
  image_url: string;
  info_url: string;
  wiki_url: null;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  attempted_landings: number;
  successful_landings: number;
  failed_landings: number;
  consecutive_successful_landings: number;
}

export interface Update {
  id: number;
  profile_image: string;
  comment: string;
  info_url: string;
  created_by: string;
  created_on: Date;
}

export interface VidURL {
  priority: number;
  source: string;
  publisher: string;
  title: string;
  description: string;
  feature_image: string;
  url: string;
  type: Type;
  language: Language;
  start_time: Date;
  end_time: null;
}

export interface Language {
  id: number;
  name: string;
  code: string;
}

export interface Type {
  id: number;
  name: string;
}
