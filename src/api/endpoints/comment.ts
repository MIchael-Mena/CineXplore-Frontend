import { GetCommentsResponse, GetCommentsResponseSchema, UserMovieComment, UserMovieCommentSchema } from "@/schemas/user"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request =  '/api/comments'

export const getCommentsByUser = (userId: number) : Query<GetCommentsResponse, UserMovieComment[]> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/user/${userId}`,
  validateResponse: GetCommentsResponseSchema,
  parseResponse: response => response,
})

export const getCommentsByMovie = (movieId: number) : Query<GetCommentsResponse, UserMovieComment[]> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/movie/${movieId}`,
  validateResponse: GetCommentsResponseSchema,
  parseResponse: response => response,
})

export const addComment = (userId: number, movieId: number) : Mutation<UserMovieComment, UserMovieComment, string> => ({
  key: KEYS.getComments,
  authenticated: true,
  method: 'POST',
  endpoint: request + `?userId=${userId}&movieId=${movieId}`,
  validateResponse: UserMovieCommentSchema,
  parseResponse: response => response,
})

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