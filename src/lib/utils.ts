export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function cleanSummary(summary: string): string {
  return summary
    .replace(/\s*The post .+? appeared first on [^.]+\.?\s*$/i, "")
    .trim();
}

export function normalizePage(value?: string | null): number {
  const page = Number.parseInt(value ?? "", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function normalizeSearch(value?: string | null): string {
  return (value ?? "").trim();
}

export function buildPageUrl(
  pathname: string,
  page: number,
  search?: string | null,
): string {
  const params = new URLSearchParams();
  const query = normalizeSearch(search);
  if (query) params.set("q", query);
  params.set("page", String(Math.max(1, page)));
  return `${pathname}?${params.toString()}`;
}

export function buildSearchUrl(pathname: string, search: string): string {
  const query = normalizeSearch(search);
  return query ? `${pathname}?${new URLSearchParams({ q: query })}` : pathname;
}

export function withSearchParam(url: string, search?: string | null): string {
  const result = new URL(url);
  const query = normalizeSearch(search);
  if (query) result.searchParams.set("search", query);
  return result.toString();
}

export interface LaunchWindow {
  window_start: Date | string;
  status?: { abbrev?: string } | null;
  webcast_live?: boolean;
}

const COMPLETED_LAUNCH_STATUSES = new Set([
  "success",
  "failure",
  "partial failure",
]);

export function isUpcomingLaunch(
  launch: LaunchWindow,
  now = Date.now(),
): boolean {
  const status = launch.status?.abbrev?.toLowerCase() ?? "";
  const windowStart = new Date(launch.window_start).getTime();
  return (
    Number.isFinite(windowStart) &&
    !COMPLETED_LAUNCH_STATUSES.has(status) &&
    (windowStart > now || launch.webcast_live === true)
  );
}

export function selectNextLaunch<T extends LaunchWindow>(
  launches: T[],
  now = Date.now(),
): T | undefined {
  return launches
    .filter((launch) => isUpcomingLaunch(launch, now))
    .sort(
      (a, b) =>
        new Date(a.window_start).getTime() - new Date(b.window_start).getTime(),
    )[0];
}

export function isCountdownExpired(
  date: Date | string,
  now = Date.now(),
): boolean {
  return new Date(date).getTime() <= now;
}
