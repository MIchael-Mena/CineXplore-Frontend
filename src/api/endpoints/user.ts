import type { Mutation, Query } from '@api/types'
import { KEYS } from '@api/keys'
import { UserDTO, UserSchema, ChangeUserDTO, GetUsersResponse, GetUsersResponseSchema } from '@/schemas/user'
import { z } from 'zod'

const userRequest = '/api/users'

export const getUserById = (id: number) : Query<UserDTO> => ({
  key: KEYS.getUsers,
  authenticated: true,
  method: 'GET',
  endpoint: userRequest + `/${id}`,
  validateResponse: UserSchema,
  parseResponse: response => response,
})

export const getUsers: Query<GetUsersResponse, UserDTO[]> = {
  key: KEYS.getUsers,
  authenticated: true,
  method: 'GET',
  endpoint: userRequest,
  validateResponse: GetUsersResponseSchema,
  parseResponse: response => response,
}

export const updateUser = (id: number) : Mutation<UserDTO, UserDTO, ChangeUserDTO> => ({
  key: KEYS.getUsers,
  authenticated: true,
  method: 'PATCH',
  endpoint: userRequest + `/${id}`,
  validateResponse: UserSchema,
  parseResponse: response => response,
})

export const deleteUser = (id: number) : Mutation<void> => ({
  key: KEYS.getUsers,
  authenticated: true,
  method: 'DELETE',
  endpoint: userRequest + `/${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})
