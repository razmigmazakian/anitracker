import type { ListEntry } from "@/types/anime";

export const mockEntries: ListEntry[] = [
  { animeId: "1", status: "watching", episodesWatched: 5 },
  { animeId: "2", status: "watching", episodesWatched: 12 },
  { animeId: "5", status: "planned", episodesWatched: 0 },
  { animeId: "3", status: "completed", episodesWatched: 1, score: 9 },
];
