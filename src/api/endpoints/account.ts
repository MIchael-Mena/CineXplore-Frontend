import type { Mutation, Query } from '@api/types'
import { KEYS } from '@api/keys'
import { AccountDTO, AccountSchema, ChangeAccountDTO, PreferencesDTO, PreferencesSchema } from '@/schemas/account'
import { z } from 'zod'

export const getMyRole: Query<string> = {
  key: KEYS.getMyRole,
  authenticated: true,
  method: 'GET',
  endpoint: '/users/me/role',
  validateResponse: z.string(),
  parseResponse: response => response,
}

export const getMyAccount: Query<AccountDTO> = {
  key: KEYS.getMyAccount,
  authenticated: true,
  method: 'GET',
  endpoint: '/users/me',
  validateResponse: AccountSchema,
  parseResponse: response => response,
}

export const updateMyAccount: Mutation<AccountDTO, AccountDTO, ChangeAccountDTO> = {
  key: KEYS.getMyAccount,
  authenticated: true,
  method: 'PATCH',
  endpoint: '/atletas/perfil',
  validateResponse: AccountSchema,
  parseResponse: response => response,
}

export const getPreferences: Query<PreferencesDTO> = {
  key: KEYS.getPreferences,
  authenticated: true,
  method: 'GET',
  endpoint: '/atletas/preferencias',
  validateResponse: PreferencesSchema,
  parseResponse: response => response,
}

export const updatePreferences: Mutation<PreferencesDTO, PreferencesDTO, PreferencesDTO> = {
  key: KEYS.getPreferences,
  authenticated: true,
  method: 'PATCH',
  endpoint: '/atletas/preferencias',
  validateResponse: PreferencesSchema,
  parseResponse: response => response,
}
