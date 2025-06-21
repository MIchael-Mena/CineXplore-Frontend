import { UserMovieComment, UserMovieCommentSchema } from "@/schemas/user"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request =  '/api/comments'
const likeRequest = '/api/user-movie-likes'
const ratingRequest = '/api/user-movie-ratings'

export const getCommentsByUser = (userId: number) : Query<UserMovieComment> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/user/${userId}`,
  validateResponse: UserMovieCommentSchema,
  parseResponse: response => response,
})

export const getCommentsByMovie = (movieId: number) : Query<UserMovieComment> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/movie/${movieId}`,
  validateResponse: UserMovieCommentSchema,
  parseResponse: response => response,
})

export const addComment: Mutation<UserMovieComment, UserMovieComment, UserMovieComment> = {
  key: KEYS.getComments,
  authenticated: true,
  method: 'POST',
  endpoint: request,
  validateResponse: UserMovieCommentSchema,
  parseResponse: response => response,
}

export const editComment = (id: number) : Mutation<UserMovieComment, UserMovieComment, string> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'PATCH',
  endpoint: request + `/${id}`,
  validateResponse: UserMovieCommentSchema,
  parseResponse: response => response,
})

export const deleteComment = (id: number) : Mutation<void> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})