"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Spinner,
  Tooltip,
} from "@nextui-org/react";

import { useQuery } from "@tanstack/react-query";
import Countdown from "react-countdown";

import { launchApiUrl } from "../../page";
import formatDate from "../../../utils/formatDate";
import fetchLaunch from "../../utils/fetchLaunch";

export default function LaunchInformationPage({
  params,
}: {
  params: { launchId: string };
}) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, launchApiUrl),
  });

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
          {/* Launch */}
          <Card className="launch w-full p-3">
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
            <div className="flex h-full w-full flex-wrap md:flex-nowrap">
              <Image
                className="flex-shrink object-cover pb-1 md:h-full md:max-w-xs md:pb-0"
                src={data.image}
                alt="Launc image"
              ></Image>
              <div className="flex flex-grow flex-col px-2 ">
                <div className="flex">
                  <p className="max-w-1/2 w-fit pr-2 font-semibold">
                    {formatDate(data.window_start)}
                  </p>
                  <Countdown
                    className="font-semibold opacity-70"
                    date={data.window_start}
                  ></Countdown>
                </div>
                <Tooltip delay={300} content={data.status.description}>
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
                <div className="mt-auto flex justify-between gap-2 py-2 font-semibold">
                  <Link color="foreground" href={data.pad.map_url}>
                    <p>{data.pad.location.name}</p>
                  </Link>
                  <Tooltip delay={300} content="Mission type">
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
          {/* Launch Service Provider */}
          <Card className="launchServiceProvider">
            <CardHeader className="flex justify-center">
              <h2 className="text-4xl font-bold">
                {data.launch_service_provider.name}
              </h2>
              <Image
                width={200}
                height={200}
                radius="sm"
                src={data.launch_service_provider.logo_url}
                alt="Launch service provider log"
              ></Image>
            </CardHeader>
            <CardBody>
              <p>{data.launch_service_provider.description}</p>
            </CardBody>
            <CardFooter className="flex flex-wrap justify-between gap-2">
              <p className="font-semibold">
                Founded: {data.launch_service_provider.founding_year}
              </p>
              <Link
                className="font-semibold"
                href={data.launch_service_provider.info_url}
                isExternal
                showAnchorIcon
              >
                <p>Website</p>
              </Link>
              <p className="font-semibold">
                {data.launch_service_provider.administrator}
              </p>
              <p className="font-semibold">
                {data.launch_service_provider.type}
              </p>
            </CardFooter>
          </Card>
          {/* Misssion */}
          <Card className="mission">
            <CardHeader className="flex justify-center">
              <h2 className="text-4xl font-bold">{data.mission.name}</h2>
              <Image
                width={200}
                height={200}
                radius="sm"
                src={
                  data.mission_patches[0] && data.mission_patches[0].image_url
                }
                alt="Mission patch"
              ></Image>
            </CardHeader>
            <CardBody>
              <p>{data.mission.description}</p>
            </CardBody>
            <CardFooter className="flex  flex-wrap justify-between">
              <p className="font-semibold">{data.mission.orbit.name}</p>
              <p className="font-semibold">{data.mission.type}</p>
              {data.infoURLs[0] && (
                <Link
                  className="font-semibold"
                  href={data.infoURLs[0].url}
                  isExternal
                >
                  <svg
                    className="pr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1em"
                    viewBox="0 0 2304 1536"
                  >
                    <path
                      fill="currentColor"
                      d="m1494 1511l-295-695q-25 49-158.5 305.5T842 1511q-1 1-27.5.5T788 1510q-82-193-255.5-587T273 327q-21-50-66.5-107.5T103 119T1 76q0-5-.5-24T0 25h583v50q-39 2-79.5 16T437 134t-10 64q26 59 216.5 499T879 1237q31-61 140-266.5T1150 723q-19-39-126-281T888 147q-38-69-201-71V26l513 1v47q-60 2-93.5 25t-12.5 69q33 70 87 189.5t86 187.5q110-214 173-363q24-55-10-79.5T1301 76q1-7 1-25V27q64 0 170.5-.5t180-1t92.5-.5v49q-62 2-119 33t-90 81l-213 442q13 33 127.5 290t121.5 274l441-1017q-14-38-49.5-62.5t-65-31.5t-55.5-8V25l460 4l1 2l-1 44q-139 4-201 145q-526 1216-559 1291z"
                    />
                  </svg>
                  Wiki
                </Link>
              )}
            </CardFooter>
          </Card>
          {/*? Rocket */}
          <Card className="rocket">
            <CardHeader className="flex h-full w-full flex-wrap items-start md:flex-nowrap">
              <Image
                className="flex-shrink object-cover pb-1 md:h-full md:max-w-xs md:pb-0"
                alt="Rocket"
                radius="sm"
                removeWrapper
                src={data.rocket.configuration.image_url}
              />
              <div className="flex h-full flex-col px-2">
                <h2 className="pb-2 text-4xl font-bold">
                  {data.rocket.configuration.full_name}
                </h2>
                <p className="px-1">{data.rocket.configuration.description}</p>
                <div className="mt-0 flex justify-between gap-2 pt-2 md:mt-auto">
                  <p className="font-semibold">
                    Maiden Flight: {data.rocket.configuration.maiden_flight}
                  </p>
                  <p className="w-fit font-semibold">
                    Successful Launches:{" "}
                    {data.rocket.configuration.total_launch_count}
                  </p>
                  {data.rocket.configuration.wiki_url && (
                    <Link
                      className="font-semibold"
                      href={data.rocket.configuration.wiki_url}
                      isExternal
                    >
                      <svg
                        className="pr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1em"
                        viewBox="0 0 2304 1536"
                      >
                        <path
                          fill="currentColor"
                          d="m1494 1511l-295-695q-25 49-158.5 305.5T842 1511q-1 1-27.5.5T788 1510q-82-193-255.5-587T273 327q-21-50-66.5-107.5T103 119T1 76q0-5-.5-24T0 25h583v50q-39 2-79.5 16T437 134t-10 64q26 59 216.5 499T879 1237q31-61 140-266.5T1150 723q-19-39-126-281T888 147q-38-69-201-71V26l513 1v47q-60 2-93.5 25t-12.5 69q33 70 87 189.5t86 187.5q110-214 173-363q24-55-10-79.5T1301 76q1-7 1-25V27q64 0 170.5-.5t180-1t92.5-.5v49q-62 2-119 33t-90 81l-213 442q13 33 127.5 290t121.5 274l441-1017q-14-38-49.5-62.5t-65-31.5t-55.5-8V25l460 4l1 2l-1 44q-139 4-201 145q-526 1216-559 1291z"
                        />
                      </svg>
                      Wiki
                    </Link>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
          {/* TODO: Add updates and related section*/}
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
  wiki_url: string | null;
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
