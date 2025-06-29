import type { Movie } from '../modules/movies/models/Movie';
import { type User } from './User';

export interface Comment {
  commentId: number;
  user: User;
  movie: Movie;
  commentText: string;
  updatedAt?: string;
  createdAt?: string;
  sentimentScore?: number;
  aiTpoics?: string
}
