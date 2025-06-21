import { Genre, GenreSchema, GetGenresResponse, GetGenresResponseSchema } from "@/schemas/genre"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request = '/api/genres'

export const getGenres: Query<GetGenresResponse, Genre[]> = {
  key: KEYS.getGenres,
  authenticated: true,
  method: 'GET',
  endpoint: request,
  validateResponse: GetGenresResponseSchema,
  parseResponse: response => response,
}

export const getGenreById = (id: number) : Query<Genre> => ({
  key: KEYS.getGenres,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/${id}`,
  validateResponse: GenreSchema,
  parseResponse: response => response,
})

export const createGenre: Mutation<Genre, Genre, Genre> = {
  key: KEYS.getGenres,
  authenticated: true,
  method: 'POST',
  endpoint: request,
  validateResponse: GenreSchema,
  parseResponse: response => response,
}

export const updateGenre = (id: number) : Mutation<Genre, Genre, Genre> => ({
  key: KEYS.getGenres,
  authenticated: true,
  method: 'PATCH',
  endpoint: request + `/${id}`,
  validateResponse: GenreSchema,
  parseResponse: response => response,
})

export const deleteGenre = (id: number) : Mutation<void> => ({
  key: KEYS.getGenres,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})