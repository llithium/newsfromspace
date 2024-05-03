export default function formatDate(date: string): string {
  const defaultLocale = "en-US";
  const locale =
    typeof navigator !== "undefined" && navigator.language
      ? navigator.language
      : defaultLocale;

  return new Date(date).toLocaleString(locale, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
}
