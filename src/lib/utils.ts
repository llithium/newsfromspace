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
