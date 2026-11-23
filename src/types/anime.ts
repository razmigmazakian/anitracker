export type Anime = {
  id: string;
  title: string;
  type: "series" | "movie";
  genres: string[];
  episodes: number;
  year: number;
  rating: number;
  synopsis: string;
  coverUrl: string;
  trending?: boolean;
  popular?: boolean;
};

export type ListStatus =
  | "watching"
  | "planned"
  | "completed"
  | "onHold"
  | "dropped";

export type ListEntry = {
  animeId: string;
  status: ListStatus;
  episodesWatched: number;
  score?: number;
  notes?: string;
};
