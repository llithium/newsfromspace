export async function fetchJson<T>(
  url: string,
  {
    label = "API request",
    revalidate = 300,
  }: { label?: string; revalidate?: number } = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { next: { revalidate } });
  } catch (error) {
    const detail = error instanceof Error ? `: ${error.message}` : "";
    throw new Error(`${label} could not connect${detail}`);
  }

  if (!response.ok) {
    throw new Error(
      `${label} failed (${response.status} ${response.statusText || "Unknown error"})`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(`${label} returned an invalid response`);
  }
}
