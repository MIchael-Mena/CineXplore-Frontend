import { Mutation, Query } from '../types'
import { KEYS } from '../keys'
import { z } from 'zod'
import { GetMoviesResponse, GetMoviesResponseSchema, Movie, MovieRequest, MovieSchema } from '@/schemas/movies'

const request = '/api/movies'

// Get movies list
export const getMovies: Query<GetMoviesResponse, Movie[]> = {
  key: KEYS.getMovies,
  authenticated: true,
  method: 'GET',
  endpoint: request,
  validateResponse: GetMoviesResponseSchema,
  parseResponse: response => response,
}

export const getMovieById = (id: number) : Query<Movie> => ({
  key: KEYS.getMovies,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/${id}`,
  validateResponse: MovieSchema,
  parseResponse: response => response,
})

// Publish a movie
export const publishMovie: Mutation<Movie, Movie, MovieRequest> = {
  key: KEYS.getMovies,
  authenticated: true,
  method: 'POST',
  endpoint: request,
  validateResponse: MovieSchema,
  parseResponse: response => response,
}

export const updateMovie = (id: number) : Mutation<Movie, Movie, MovieRequest> => ({
  key: KEYS.getMovies,
  authenticated: true,
  method: 'PATCH',
  endpoint: request + `/${id}`,
  validateResponse: MovieSchema,
  parseResponse: response => response,
})

export const deleteMovie = (id: number) : Mutation<void> => ({
  key: KEYS.getMovies,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})