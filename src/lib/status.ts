/**
 * Maps a Launch Library `status.abbrev` to a broadsheet status pill.
 * Mirrors the branching used across the launch components.
 */
export function statusPill(abbrev?: string): { cls: string; label: string } {
  switch (abbrev) {
    case "Go":
      return { cls: "go", label: "Go" };
    case "Success":
      return { cls: "success", label: "Launched" };
    case "Failure":
      return { cls: "fail", label: "Failure" };
    case "TBC":
      return { cls: "tbc", label: "TBC" };
    case "TBD":
      return { cls: "tbc", label: "TBD" };
    case "Hold":
      return { cls: "tbc", label: "Hold" };
    default:
      return { cls: "tbc", label: abbrev || "TBD" };
  }
}
