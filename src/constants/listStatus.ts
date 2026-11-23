import type { ListStatus } from "@/types/anime";

export const listStatuses = ["watching", "planned", "completed", "onHold", "dropped"] as const satisfies readonly ListStatus[];

export const listStatusLabels: Record<ListStatus, string> = {
  watching: "Watching",
  planned: "Planned",
  completed: "Completed",
  onHold: "On Hold",
  dropped: "Dropped",
};
