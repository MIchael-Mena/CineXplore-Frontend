import type { Mutation, Query } from '@api/types'
import { KEYS } from '@api/keys'
import { AccountDTO, AccountSchema, ChangeAccountDTO} from '@/schemas/account'
import { z } from 'zod'

export const getMyRole: Query<string> = {
  key: KEYS.getMyAccount,
  method: 'GET',
  endpoint: '/user/me/role',
  validateResponse: z.string(),
  parseResponse: response => response,
}

export const getMyAccount: Query<AccountDTO> = {
  key: KEYS.getMyAccount,
  method: 'GET',
  endpoint: '/users/me',
  validateResponse: AccountSchema,
  parseResponse: response => response,
}

export const updateMyAccount: Mutation<AccountDTO, AccountDTO, ChangeAccountDTO> = {
  key: KEYS.getMyAccount,
  method: 'PATCH',
  endpoint: '/atletas/perfil',
  validateResponse: AccountSchema,
  parseResponse: response => response,
}
