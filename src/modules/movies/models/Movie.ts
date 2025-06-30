interface MemberDTO {
  id: number;
  fullName: string;
}

export interface Movie {
  movieId: number;
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string | null; // ISO string
  averageRating: number;
  //createdAt: string;
  actors?: MemberDTO[];
  directors?: MemberDTO[];
  genres?: string[];
}

export interface MovieRequest {
  movieId?: number; // Optional for creation
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string | null; // ISO string
  directorIds?: number[];
  genreIds?: number[];
  actorIds?: number[];
}
