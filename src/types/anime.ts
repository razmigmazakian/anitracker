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
};

export type ListStatus =
  | "watching"
  | "planned"
  | "completed"
  | "onHold"
  | "dropped";