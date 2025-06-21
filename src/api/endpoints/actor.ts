import { Actor, MemberOfTheFilmSchema, GetActorsResponse, GetMembersResponseSchema } from "@/schemas/cast"
import { Mutation, Query } from "../types"
import { KEYS } from "../keys"
import z from "zod"

const request = '/api/Actors'

export const getActors: Query<GetActorsResponse, Actor[]> = {
  key: KEYS.getActors,
  authenticated: true,
  method: 'GET',
  endpoint: request,
  validateResponse: GetMembersResponseSchema,
  parseResponse: response => response,
}

export const getActorById = (id: number) : Query<Actor> => ({
  key: KEYS.getActors,
  authenticated: true,
  method: 'GET',
  endpoint: request + `/${id}`,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
})

export const createActor: Mutation<Actor, Actor, Actor> = {
  key: KEYS.getActors,
  authenticated: true,
  method: 'POST',
  endpoint: request,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
}

export const updateActor = (id: number) : Mutation<Actor, Actor, Actor> => ({
  key: KEYS.getActors,
  authenticated: true,
  method: 'PATCH',
  endpoint: request + `/${id}`,
  validateResponse: MemberOfTheFilmSchema,
  parseResponse: response => response,
})

export const deleteActor = (id: number) : Mutation<void> => ({
  key: KEYS.getActors,
  authenticated: true,
  method: 'DELETE',
  endpoint: request + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})