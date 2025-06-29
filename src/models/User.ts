// import type { Comment } from './Comment';

export interface User {
  id: string;
  password?: string;
  username: string;
  email: string;
  country?: string | null;
  birthDate?: string | null; // formato LocalDate (YYYY-MM-DD)
  roles: string[];
  avatarUrl?: string;
  // comments?: Comment[];
  // likes?: string[];
  // ratings?: { [movieId: string]: number };
}
