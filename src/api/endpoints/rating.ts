import { GetRatingsResponse, GetRatingsResponseSchema, UserMovieRating, UserMovieRatingSchema } from "@/schemas/user"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request = '/api/user-movie-ratings'

export const getRatingsByUser = (userId: number) : Query<GetRatingsResponse, UserMovieRating[]> => ({
  key: KEYS.getRatings,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/user/${userId}`,
  validateResponse: GetRatingsResponseSchema,
  parseResponse: response => response,
})

export const getRatingsByMovie = (movieId: number) : Query<GetRatingsResponse, UserMovieRating[]> => ({
  key: KEYS.getRatings,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/movie/${movieId}`,
  validateResponse: GetRatingsResponseSchema,
  parseResponse: response => response,
})

export const rateMovie = (userId: number, movieId: number, rating: number) : Mutation<UserMovieRating, UserMovieRating, void> => ({
  key: KEYS.getRatings,
  authenticated: true,
  method: 'POST',
  endpoint: request + `?userId=${userId}&movieId=${movieId}&rating=${rating}`,
  validateResponse: UserMovieRatingSchema,
  parseResponse: response => response,
})

export const deleteRating = (userId: number, movieId: number) : Mutation<void> => ({
  key: KEYS.getRatings,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `?userId=${userId}&movieId=${movieId}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})