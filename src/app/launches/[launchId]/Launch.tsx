"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { launchApiUrl } from "src/lib/variables";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { RelatedArticles } from "./page";
import fetchLaunch from "@/lib/fetchLaunch";
import { formatDate } from "@/lib/utils";

const CountdownTimer = dynamic(() => import("@/components/ui/CountdownTimer"), {
  ssr: false,
});
export default function LaunchInformationPage({
  params,
  relatedData,
}: {
  params: { launchId: string };
  relatedData: RelatedArticles;
}) {
  const { isError, data, error } = useQuery({
    queryKey: ["launch", { launchId: params.launchId }],
    staleTime: 60 * 1000,
    queryFn: () => fetchLaunch(params.launchId, launchApiUrl),
  });

  return (
    <div className="grid min-h-full grid-cols-1 gap-2 pb-6 xl:grid-cols-2">
      {isError && <div>{error.message}</div>}
      {data && (
        <>
          {/* Launch */}
          <Card className="launch w-full p-3 dark:bg-neutral-950">
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-4xl font-bold">{data.name}</h2>
                <div className="flex items-center py-2">
                  <Image
                    alt="Agency logo"
                    height={40}
                    radius="sm"
                    src={
                      data.launch_service_provider &&
                      data.launch_service_provider.logo_url
                    }
                    width={40}
                  />
                  <h3 className="pl-2 text-lg font-semibold">
                    {data.launch_service_provider &&
                      data.launch_service_provider.name}
                  </h3>
                </div>
              </div>
              <div className="h-fit w-fit">
                {/* <svg
                  className="transition-opacity hover:opacity-80 active:opacity-disabled"
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
              </div>
            </div>
            <div className="flex h-full w-full flex-wrap md:flex-nowrap">
              <Image
                className="flex-shrink object-cover pb-1 md:h-full md:max-w-xs md:pb-0"
                src={data.image}
                alt="Launch image"
              ></Image>
              <div className="flex flex-grow flex-col px-2">
                <div className="flex">
                  <p className="max-w-1/2 w-fit pr-2 font-semibold">
                    {formatDate(data.window_start)}
                  </p>
                  <CountdownTimer date={data.window_start} />
                </div>
                <Tooltip
                  delay={300}
                  content={data.status && data.status.description}
                >
                  <p
                    className={`w-fit font-semibold ${
                      data.status && data.status.abbrev === "Success"
                        ? "text-success-500"
                        : data.status && data.status.abbrev === "Failure"
                          ? "text-red-600"
                          : ""
                    }`}
                  >
                    Status: {data.status && data.status.name}
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
                  <Link color="foreground" href={data.pad && data.pad.map_url}>
                    <p>{data.pad && data.pad.location.name}</p>
                  </Link>
                  <Tooltip delay={300} content="Mission type">
                    <p className="w-fit">
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
          <Card className="dark:bg-neutral-950">
            <CardHeader className="flex justify-center">
              <h2 className="text-4xl font-bold">
                {data.launch_service_provider &&
                  data.launch_service_provider.name}
              </h2>
              <Image
                width={200}
                height={200}
                radius="sm"
                src={
                  data.launch_service_provider &&
                  data.launch_service_provider.logo_url
                }
                alt="Launch service provider log"
              ></Image>
            </CardHeader>
            <CardBody>
              <p>
                {data.launch_service_provider &&
                  data.launch_service_provider.description}
              </p>
            </CardBody>
            <CardFooter className="flex flex-wrap justify-between gap-2">
              <p className="font-semibold">
                Founded:{" "}
                {data.launch_service_provider &&
                  data.launch_service_provider.founding_year}
              </p>
              <Link
                className="font-semibold"
                href={
                  data.launch_service_provider &&
                  data.launch_service_provider.info_url
                }
                isExternal
                showAnchorIcon
              >
                <p>Website</p>
              </Link>
              <p className="font-semibold">
                {data.launch_service_provider &&
                  data.launch_service_provider.administrator}
              </p>
              <p className="font-semibold">
                {data.launch_service_provider &&
                  data.launch_service_provider.type}
              </p>
            </CardFooter>
          </Card>
          {/* Misssion */}
          <Card className="dark:bg-neutral-950">
            <CardHeader className="flex justify-center">
              <h2 className="text-4xl font-bold">
                {data.mission && data.mission.name}
              </h2>
              <Image
                width={200}
                height={200}
                radius="sm"
                src={
                  data.mission_patches &&
                  data.mission_patches[0] &&
                  data.mission_patches[0].image_url
                }
                alt="Mission patch"
              ></Image>
            </CardHeader>
            <CardBody>
              <p>{data.mission && data.mission.description}</p>
            </CardBody>
            <CardFooter className="flex flex-wrap justify-between">
              <p className="font-semibold">
                {data.mission && data.mission.orbit.name}
              </p>
              <p className="font-semibold">
                {data.mission && data.mission.type}
              </p>
              {data.infoURLs && data.infoURLs[0] && (
                <Link
                  className="font-semibold"
                  href={data.infoURLs && data.infoURLs[0].url}
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
          <Card className="dark:bg-neutral-950">
            <CardHeader className="flex h-full w-full flex-wrap items-start md:flex-nowrap">
              <Image
                className="flex-shrink object-cover pb-1 md:h-full md:max-w-xs md:pb-0"
                alt="Rocket"
                radius="sm"
                removeWrapper
                src={
                  data.rocket &&
                  data.rocket.configuration &&
                  data.rocket.configuration.image_url
                }
              />
              <div className="flex h-full flex-col px-2">
                <h2 className="pb-2 text-4xl font-bold">
                  {data.rocket &&
                    data.rocket.configuration &&
                    data.rocket.configuration.full_name}
                </h2>
                <p>
                  {data.rocket &&
                    data.rocket.configuration &&
                    data.rocket.configuration.description}
                </p>
                <div className="mt-0 flex justify-between gap-2 pt-2 md:mt-auto">
                  <p className="font-semibold">
                    Maiden Flight:{" "}
                    {data.rocket &&
                      data.rocket.configuration &&
                      data.rocket.configuration.maiden_flight}
                  </p>
                  <p className="w-fit font-semibold">
                    Successful Launches:{" "}
                    {data.rocket &&
                      data.rocket.configuration &&
                      data.rocket.configuration.total_launch_count}
                  </p>
                  {data.rocket &&
                    data.rocket.configuration &&
                    data.rocket.configuration.wiki_url && (
                      <Link
                        className="font-semibold"
                        href={
                          data.rocket &&
                          data.rocket.configuration &&
                          data.rocket.configuration.wiki_url
                        }
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
          {/* Launch pad */}
          <Card className="dark:bg-neutral-950">
            <CardHeader className="flex h-full w-full flex-wrap items-start md:flex-nowrap">
              <Link
                className="flex-shrink md:h-full md:max-w-xs"
                href={data.pad && data.pad.map_url ? data.pad.map_url : ""}
                isExternal
              >
                <Image
                  className="flex-shrink object-cover pb-1 md:h-full md:max-w-xs md:pb-0"
                  alt="Rocket"
                  radius="sm"
                  removeWrapper
                  src={data.pad && data.pad.map_image}
                />
              </Link>
              <div className="flex h-full w-full flex-col px-2">
                <h2 className="pb-2 text-3xl font-bold">
                  {data.pad && data.pad.location && data.pad.location.name}
                </h2>
                <p className="text-xl font-semibold">
                  Pad: {data.pad && data.pad.name}
                </p>
                <p>
                  {data.pad &&
                    data.pad.location &&
                    data.pad.location.description}
                </p>
                <div className="mt-0 flex w-full justify-between gap-2 pt-2 md:mt-auto">
                  <p className="font-semibold">
                    Total Launches:{" "}
                    {data.pad &&
                      data.pad.location &&
                      data.pad.location.total_launch_count}
                  </p>
                  <p className="w-fit font-semibold">
                    Launched From This Pad:{" "}
                    {data.pad && data.pad.total_launch_count}
                  </p>
                  {data.pad && data.pad.wiki_url && (
                    <Link
                      className="font-semibold"
                      href={data.pad.wiki_url}
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
          {/* Videos */}
          {data.vidURLs &&
            data.vidURLs.map((video) => {
              if (video.source === "youtube.com") {
                const videoId = video.url.split("v=")[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                return (
                  <Card key={videoId} className="dark:bg-neutral-950">
                    <CardHeader className="flex flex-col items-start">
                      <h2 className="text-xl font-semibold">{video.title}</h2>
                      <div className="flex w-full justify-between pt-1">
                        <p className="w-fit">{video.publisher}</p>
                        <p className="w-fit">{video.type.name}</p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <iframe
                        className="h-96 w-full rounded-small"
                        title={video.title}
                        src={embedUrl}
                        allowFullScreen
                      ></iframe>
                    </CardBody>
                  </Card>
                );
              } else {
                return (
                  <Card
                    key={video.title + video.url}
                    className="dark:bg-neutral-950"
                  >
                    <CardHeader className="flex flex-col items-start">
                      <h2 className="text-xl font-semibold">{video.title}</h2>
                      <div className="flex w-full justify-between pt-1">
                        <p className="w-fit">{video.publisher}</p>
                        <p className="w-fit">{video.type.name}</p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <iframe
                        className="h-96 w-full rounded-small"
                        title={video.title}
                        src={video.url}
                        allowFullScreen
                      ></iframe>
                    </CardBody>
                  </Card>
                );
              }
            })}
          {/* Updates */}
          {data.updates.length > 0 && (
            <Card className="dark:bg-neutral-950 md:max-h-[400px]">
              <CardHeader>
                <h2 className="text-2xl font-bold">Updates</h2>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                {data.updates.map((update) => {
                  return (
                    <Card key={update.id} className="min-h-44 w-full">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={update.profile_image}
                          />
                          <div className="flex flex-col items-start justify-center gap-1">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                              {update.created_by}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                              {formatDate(update.created_on)}
                            </h5>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="px-3 pt-0 text-default-500">
                        <p>{update.comment}</p>
                        <Link
                          className="mt-auto"
                          href={update.info_url}
                          isExternal
                          showAnchorIcon
                        >
                          More info
                        </Link>
                      </CardBody>
                    </Card>
                  );
                })}
              </CardBody>
            </Card>
          )}
          {/* Related articles */}
          {relatedData.results.length > 0 && (
            <Card className="dark:bg-neutral-950 md:max-h-[600px]">
              <CardHeader>
                <h2 className="text-2xl font-bold">Releated News</h2>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                {relatedData.results.map((article) => {
                  return (
                    <Card
                      key={article.id}
                      className="flex min-h-44 w-full flex-row py-2 sm:h-full"
                    >
                      <Image
                        alt="Article image"
                        className="z-0 ml-2 h-full w-48 flex-shrink rounded-xl object-cover sm:w-44 sm:flex-1 lg:w-56"
                        src={article.image_url}
                      />

                      <CardBody className="flex-grow overflow-visible overflow-y-auto py-0 sm:flex-1">
                        <h2 className="pb-0 text-sm font-bold tracking-tight transition-colors first:mt-0 sm:text-xl 2xl:text-2xl">
                          {article.title}
                        </h2>
                        <Divider />
                        <div className="mt-auto flex flex-wrap justify-between">
                          <div className="">
                            <p className="relative top-2 m-0 text-tiny italic sm:top-1 sm:text-medium">
                              {article.news_site}
                            </p>
                            <small className="m-0 text-tiny text-default-500">
                              {formatDate(article.published_at)}
                            </small>
                          </div>
                          <Link
                            className=""
                            href={article.url}
                            isExternal
                            showAnchorIcon
                          >
                            Read Article
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </CardBody>
            </Card>
          )}
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
