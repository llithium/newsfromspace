"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingLaunches } from "../../lib/fetchUpcomingLaunches";
import { LaunchLibraryAPI, pageLimit } from "src/lib/variables";
import PageButtons from "src/components/ui/PageButtons";
import LaunchRows from "./LaunchRows";

export default function Launches({ page }: { page: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["launches/upcoming", `page ${page}`],
    queryFn: () =>
      fetchUpcomingLaunches(
        LaunchLibraryAPI +
          `/launch/upcoming/?mode=detailed&limit=${pageLimit}&offset=${(page - 1) * parseInt(pageLimit)}`,
      ),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      {isError && <div className="dek">{error.message}</div>}
      {data && <LaunchRows results={data.results} mode="upcoming" />}
      {data?.count ? (
        <div className="loadmore">
          <PageButtons count={data.count} page={page} />
        </div>
      ) : null}
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
