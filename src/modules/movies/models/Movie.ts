export interface Movie {
  id: number;
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string; // ISO string
  directorIds: number[];
  genreIds: number[];
  actorIds: number[];
}
