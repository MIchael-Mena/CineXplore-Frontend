import { z } from 'zod'

export const AccountSchema = z.object({
  username: z.string(),
  role: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
  edad: z.number().nullable(),
  peso: z.number().nullable(),
  altura: z.number().nullable(),
  matricula: z.string().nullable(),
})

export type AccountDTO = z.infer<typeof AccountSchema>

export const ChangeAccountSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
  edad: z.number().nullable().optional(),
  peso: z.number().nullable().optional(),
  altura: z.number().nullable().optional(),
})

export type ChangeAccountDTO = z.infer<typeof ChangeAccountSchema>

export const changeInternalPasswordBodySchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export type changeInternalPasswordBodyDTO = z.infer<typeof changeInternalPasswordBodySchema>

export const changeExternalPasswordBodySchema = z.object({
  userId: z.string(),
  code: z.string(),
  newPassword: z.string(),
})

export type changeExternalPasswordBodyDTO = z.infer<typeof changeExternalPasswordBodySchema>

export const PreferencesSchema = z.object({
  atletaId: z.number(),
  planDietaActual: z.number().nullable().optional(),
})

export type PreferencesDTO = z.infer<typeof PreferencesSchema>
