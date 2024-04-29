export default function formatDate(date: string): string {
  return new Date(date).toLocaleString(navigator.language, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateStyle: "short",
    timeStyle: "short",
  });
}
