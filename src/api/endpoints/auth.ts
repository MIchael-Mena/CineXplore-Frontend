import { AuthResponseDTO, AuthSchema, LoginInput, RegisterInput } from '@/schemas/auth'
import type { Mutation } from '@api/types'
import { KEYS } from '@api/keys'

export const loginRequest: Mutation<AuthResponseDTO, string, LoginInput> = {
  key: KEYS.login,
  authenticated: false,
  method: 'POST',
  endpoint: '/session',
  validateResponse: AuthSchema,
  parseResponse: response => response.accessToken,
}

export const register: Mutation<AuthResponseDTO, string, RegisterInput> = {
  key: KEYS.login,
  authenticated: false,
  method: 'POST',
  endpoint: '/api/users',
  validateResponse: AuthSchema,
  parseResponse: data => data.accessToken,
}
