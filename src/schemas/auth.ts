import { z } from 'zod'

const GoodResponseSchema = <T extends z.ZodType<object>>(data: T) =>
  z.object({
    status: z.literal('success'),
    data: data,
  })

export default GoodResponseSchema

export const NoDataSchema = GoodResponseSchema(z.object({}))
export type NoDataDTO = z.infer<typeof NoDataSchema>

export interface LoginInput {
  username: string
  password: string
}

export type RegisterInput = {
  username: string
  password: string
  email: string
}

export const defaultRegisterInput: RegisterInput = {
  username: '',
  email: '',
  password: '',
}

export const LoginResponseSchema = GoodResponseSchema(
  z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
      role: z.string(),
    }),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
)

export const RefreshTokenBody = z.object({
  refreshToken: z.string(),
})

export type RefreshTokenBodyDTO = z.infer<typeof RefreshTokenBody>

export const RefreshTokenDTOSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type RefreshTokenDTO = z.infer<typeof RefreshTokenDTOSchema>

export const RefreshTokenResponse = z.object({
  data: RefreshTokenDTOSchema,
})

export type RefreshTokenResponseDTO = z.infer<typeof RefreshTokenResponse>

export const AuthSchema = z.object({
  accessToken: z.string(),
})
export type AuthResponseDTO = z.infer<typeof AuthSchema>
