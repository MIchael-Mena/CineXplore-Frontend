import { z } from 'zod'

export const MovieSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  description: z.string(),
  durationMin: z.number(),
  releaseDate: z.date(),
  averageRating : z.number(),
  createdAt : z.date(),
  directors : z.array(z.string()),
  genres : z.array(z.string()),
  actors : z.array(z.string()),
})

export type Movie = z.infer<typeof MovieSchema>

export const GetMoviesResponseSchema = z.array(MovieSchema)
export type GetMoviesResponse = z.infer<typeof GetMoviesResponseSchema>

export const UpdateMovieSchema = z.object({
  title: z.string(),
  description: z.string(),
  durationMin: z.number(),
  releaseDate: z.date(),
  directorIds : z.array(z.number()),
  genreIds : z.array(z.number()),
  actorIds : z.array(z.number()),
})

export type UpdateMovie = z.infer<typeof MovieSchema>