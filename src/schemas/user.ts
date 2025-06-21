import { useCreateActor } from '@/hooks/useActor'
import { z } from 'zod'

export const UserMovieLikeSchema = z.object({
  movieId: z.number(),
  coverMovieUrl: z.string().nullable(),
  movieTitle: z.string(),
  likedAt: z.date()
})

export type UserMovieLike = z.infer<typeof UserMovieLikeSchema>

export const UserMovieRatingSchema = z.object({
  movieId: z.number(),
  movieTitle: z.string(),
  rating: z.number(),
  ratedAt: z.date()
})

export type UserMovieRating = z.infer<typeof UserMovieRatingSchema>

export const UserMovieCommentSchema = z.object({
  movieId: z.number(),
  movieTitle: z.string(),
  commentText: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  sentimentScore: z.number().nullable(),
  aiTopics: z.string()
})

export type UserMovieComment = z.infer<typeof UserMovieCommentSchema>

export const UserSchema = z.object({
  username: z.string(),
  email: z.string(),
  createAt: z.date(),
  likes: z.array(UserMovieLikeSchema),
  ratings: z.array(UserMovieRatingSchema),
  comments: z.array(UserMovieCommentSchema)
})

export type UserDTO = z.infer<typeof UserSchema>
export const GetUsersResponseSchema = z.array(UserSchema)
export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>

export const ChangeUserSchema = z.object({
  username: z.string(),
  email: z.string(),
})

export type ChangeUserDTO = z.infer<typeof ChangeUserSchema>

export const changeInternalPasswordBodySchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export type changeInternalPasswordBodyDTO = z.infer<typeof changeInternalPasswordBodySchema>

export const changeExternalPasswordBodySchema = z.object({
  userId: z.string(),
  code: z.string(),
  newPassword: z.string(),
})

export type changeExternalPasswordBodyDTO = z.infer<typeof changeExternalPasswordBodySchema>