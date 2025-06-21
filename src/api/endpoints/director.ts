import { Director, MemberOfTheFilmSchema, GetDirectorsResponse, GetMembersResponseSchema } from "@/schemas/cast"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request = '/api/directors'

export const getDirectors: Query<GetDirectorsResponse, Director[]> = {
  key: KEYS.getDirectors,
  authenticated: true,
  method: 'GET',
  endpoint: request,
  validateResponse: GetMembersResponseSchema,
  parseResponse: response => response,
}

export const getDirectorById = (id: number) : Query<Director> => ({
  key: KEYS.getDirectors,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/${id}`,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
})

export const createDirector: Mutation<Director, Director, Director> = {
  key: KEYS.getDirectors,
  authenticated: true,
  method: 'POST',
  endpoint: request,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
}

export const updateDirector = (id: number) : Mutation<Director, Director, Director> => ({
  key: KEYS.getDirectors,
  authenticated: true,
  method: 'PATCH',
  endpoint: request + `/${id}`,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
})

export const deleteDirector = (id: number) : Mutation<void> => ({
  key: KEYS.getDirectors,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})