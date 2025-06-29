// import type { Comment } from './Comment';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  avtarUrl?: string; // Optional property for user's avatar URL
  // comments?: Comment[]; // Optional property to hold user's comments
  // likes?: string[]; // Optional property to hold liked movie IDs
  // ratings?: { [movieId: string]: number }; // Optional property to hold movie ratings
}
