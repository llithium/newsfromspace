"use client";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import formatDate from "../../utils/formatDate";

import { fetchUpcomingLaunches } from "../utils/fetchUpcomingLaunches";
import InfiniteScrollSpinner from "../../components/InfiniteScrollSpinner";
import { launchApiUrl, pageLimit } from "@/utils/variables";

export default function Launches() {
  const { data, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["launches/upcoming"],
      queryFn: fetchUpcomingLaunches,
      staleTime: 15 * 60 * 1000,
      initialPageParam:
        launchApiUrl +
        `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=0`,
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
        {isError && <div>{error.message}</div>}
        {data &&
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
          })}
      </div>
      {isFetchingNextPage && <InfiniteScrollSpinner />}
      <div ref={ref}></div>
    </>
  );
}

export interface LaunchesData {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  id: string;
  url: string;
  slug: string;
  flightclub_url: null | string;
  r_spacex_api_id: null;
  name: string;
  status: NetPrecision;
  last_updated: Date;
  updates: Update[];
  net: Date;
  net_precision: NetPrecision;
  window_end: Date;
  window_start: Date;
  probability: null;
  weather_concerns: null;
  holdreason: string;
  failreason: string;
  hashtag: null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission;
  pad: Pad;
  infoURLs: InfoURL[];
  vidURLs: VidURL[];
  webcast_live: boolean;
  timeline: any[];
  image: string;
  infographic: null;
  program: Program[];
  orbital_launch_attempt_count: number | null;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
  pad_turnaround: string;
  mission_patches: MissionPatch[];
  type: ResultType;
}

export interface InfoURL {
  priority: number;
  source: string;
  title: string;
  description: string;
  feature_image: null;
  url: string;
  type: null;
  language: null;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: LaunchServiceProviderType;
  country_code: CountryCode;
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

export enum CountryCode {
  Chn = "CHN",
  Deu = "DEU",
  Rus = "RUS",
  Usa = "USA",
}

export enum LaunchServiceProviderType {
  Commercial = "Commercial",
  Government = "Government",
  Multinational = "Multinational",
  Private = "Private",
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
  agency: AgencyElement;
}

export interface AgencyElement {
  id: number;
  url: string;
  name: string;
  type: LaunchServiceProviderType;
}

export interface Pad {
  id: number;
  url: string;
  agency_id: number | null;
  name: string;
  description: null | string;
  info_url: null | string;
  wiki_url: null | string;
  map_url: null | string;
  latitude: string;
  longitude: string;
  location: PadLocation;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  orbital_launch_attempt_count: number;
}

export interface PadLocation {
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

export interface Program {
  id: number;
  url: string;
  name: Name;
  description: string;
  agencies: AgencyElement[];
  image_url: string;
  start_date: Date;
  end_date: null;
  info_url: null | string;
  wiki_url: string;
  mission_patches: MissionPatch[];
  type: TypeClass;
}

export enum Name {
  CommercialCrewProgram = "Commercial Crew Program",
  CommercialResupplyServices = "Commercial Resupply Services",
  InternationalSpaceStation = "International Space Station",
  Starlink = "Starlink",
}

export interface TypeClass {
  id: number;
  name: string;
}

export interface Rocket {
  id: number;
  configuration: Configuration;
  launcher_stage: LauncherStage[];
  spacecraft_stage: SpacecraftStage | null;
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
  program: Program[];
  variant: Variant;
  alias: string;
  min_stage: number;
  max_stage: number;
  length: number | null;
  diameter: number;
  maiden_flight: Date | null;
  launch_cost: null | string;
  launch_mass: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
  to_thrust: number | null;
  apogee: number | null;
  vehicle_range: null;
  image_url: string;
  info_url: null | string;
  wiki_url: null | string;
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

export enum Variant {
  Block5 = "Block 5",
  Empty = "",
  VN22 = "V N22",
}

export interface LauncherStage {
  id: number;
  type: string;
  reused: null;
  launcher_flight_number: null;
  launcher: Launcher;
  landing: Landing;
  previous_flight_date: null;
  turn_around_time_days: null;
  previous_flight: null;
}

export interface Landing {
  id: number;
  attempt: boolean;
  success: null;
  description: string;
  downrange_distance: number | null;
  location: LandingLocation;
  type: NetPrecision;
}

export interface LandingLocation {
  id: number;
  name: string;
  abbrev: string;
  description: null | string;
  location: PadLocation | null;
  successful_landings: number;
}

export interface Launcher {
  id: number;
  url: string;
  details: string;
  flight_proven: boolean;
  serial_number: string;
  status: string;
  image_url: string;
  successful_landings: null;
  attempted_landings: null;
  flights: null;
  last_launch_date: null;
  first_launch_date: null;
}

export interface SpacecraftStage {
  id: number;
  url: string;
  mission_end: null;
  destination: Name;
  launch_crew: Crew[];
  onboard_crew: any[];
  landing_crew: Crew[];
  spacecraft: Spacecraft;
  landing: Landing;
  docking_events: any[];
}

export interface Crew {
  id: number;
  role: Role;
  astronaut: Astronaut;
}

export interface Astronaut {
  id: number;
  url: string;
  name: string;
  type: TypeClass;
  in_space: boolean;
  time_in_space: string;
  status: TypeClass;
  agency: AgencyElement;
  date_of_birth: Date;
  date_of_death: null;
  nationality: string;
  twitter: null | string;
  instagram: null | string;
  bio: string;
  profile_image: string;
  wiki: string;
  last_flight: Date;
  first_flight: Date;
}

export interface Role {
  id: number;
  role: string;
  priority: number;
}

export interface Spacecraft {
  id: number;
  url: string;
  name: string;
  serial_number: string;
  is_placeholder: boolean;
  in_space: boolean;
  time_in_space: string;
  time_docked: string;
  flights_count: number;
  mission_ends_count: number;
  status: TypeClass;
  description: string;
  spacecraft_config: SpacecraftConfig;
}

export interface SpacecraftConfig {
  id: number;
  url: string;
  name: string;
  type: TypeClass;
  agency: SpacecraftConfigAgency;
  in_use: boolean;
  capability: string;
  history: string;
  details: string;
  maiden_flight: Date;
  height: number;
  diameter: number;
  human_rated: boolean;
  crew_capacity: number;
  payload_capacity: null;
  payload_return_capacity: null;
  flight_life: string;
  image_url: string;
  nation_url: null;
  wiki_link: string;
  info_link: string;
}

export interface SpacecraftConfigAgency {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: LaunchServiceProviderType;
  country_code: CountryCode;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  parent: null;
  image_url: null;
  logo_url: string;
}

export enum ResultType {
  Detailed = "detailed",
}

export interface Update {
  id: number;
  profile_image: string;
  comment: string;
  info_url: string;
  created_by: CreatedBy;
  created_on: Date;
}

export enum CreatedBy {
  CosmicPenguin = "Cosmic_Penguin",
  HituraNobad = "hitura-nobad",
  Nosu = "Nosu",
  SwGustav = "SwGustav",
}

export interface VidURL {
  priority: number;
  source: string;
  publisher: string;
  title: string;
  description: string;
  feature_image: string;
  url: string;
  type: TypeClass;
  language: Language;
  start_time: Date;
  end_time: null;
}

export interface Language {
  id: number;
  name: string;
  code: string;
}
