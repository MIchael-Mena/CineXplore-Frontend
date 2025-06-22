import { GetLikesResponse, GetLikesResponseSchema, UserMovieLike, UserMovieLikeSchema } from "@/schemas/user"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request = '/api/user-movie-likes'
const ratingRequest = '/api/user-movie-ratings'

export const getLikesByUser = (userId: number) : Query<GetLikesResponse, UserMovieLike[]> => ({
  key: KEYS.getLikes,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/user/${userId}`,
  validateResponse: GetLikesResponseSchema,
  parseResponse: response => response,
})

export const getLikesByMovie = (movieId: number) : Query<GetLikesResponse, UserMovieLike[]> => ({
  key: KEYS.getLikes,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/movie/${movieId}`,
  validateResponse: GetLikesResponseSchema,
  parseResponse: response => response,
})

export const likeMovie = (userId: number, movieId: number) : Mutation<UserMovieLike, UserMovieLike, void> => ({
  key: KEYS.getLikes,
  authenticated: true,
  method: 'POST',
  endpoint: request + `?userId=${userId}&movieId=${movieId}`,
  validateResponse: UserMovieLikeSchema,
  parseResponse: response => response,
})

export const unlikeMovie = (userId: number, movieId: number) : Mutation<void> => ({
  key: KEYS.getLikes,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `?userId=${userId}&movieId=${movieId}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})