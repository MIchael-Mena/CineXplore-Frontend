import { Mutation, Query } from '../types'
import { KEYS } from '../keys'
import { z } from 'zod'
import { GetMoviesResponse, GetMoviesResponseSchema, Movie, UpdateMovie } from '@/schemas/movies'

// Obtener lista de entrenadores
export const getMovies: Query<GetMoviesResponse, Movie[]> = {
  key: KEYS.getMovies,
  method: 'GET',
  endpoint: '/movies',
  validateResponse: GetMoviesResponseSchema,
  parseResponse: response => response,
}

// Crear grupo de entrenamiento
export const publishMovie : Mutation<void, void, Movie> = {
  key: KEYS.getMovies,
  method: 'POST',
  endpoint: '/movies',
  validateResponse: z.void(),
  parseResponse: response => response,
}

export const modificarRutinaAtleta = (movieId : number) : Mutation<void, void, UpdateMovie> => ({
  key: KEYS.getMovies,
  method: 'PATCH',
  endpoint: 'movies/${movieId}',
  validateResponse: z.void(),
  parseResponse: response => response,
})

export const eliminarRutinaAtleta = (rutinaId: number, atletaId: number): Mutation<void> => ({
  key: KEYS.getMovies,
  method: 'DELETE',
  endpoint: `/entrenadores/rutinas/${rutinaId}?atletaId=${atletaId}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})