interface MemberDTO {
  id: number;
  fullName: string;
}

export interface Movie {
  id: number;
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string; // ISO string
  averageRating: number;
  //createdAt: string;
  actors: MemberDTO[];
  directors: MemberDTO[];
  genres: string[];
}

export interface MovieRequest {
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string; // ISO string
  directorIds: number[];
  genreIds: number[];
  actorIds: number[]
}