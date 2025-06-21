import useAuthStore from '@store/auth'
import { useMutation } from '@tanstack/react-query'
import { mutationCall } from '@/api/apiCall'
import { loginRequest, register } from '@/api/endpoints/auth'
import { LoginInput, RegisterInput } from '@/schemas/auth'

export const useLogin = () => {
  const { setToken } = useAuthStore()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (fields: LoginInput) => mutationCall(loginRequest, fields, ''),
    onSuccess: data => setToken(data),
  })
}

export const useRegister = () => {
  const { setToken } = useAuthStore()

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (fields: RegisterInput) => mutationCall(register, fields, ''),
    onSuccess: data => setToken(data),
  })
}

export type AuthContext = boolean
