export default function formatDate(date: string): string {
  return new Date(date).toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
}
