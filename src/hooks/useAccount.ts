import { mutationCall, queryCall } from '@/api/apiCall'
import { getMyAccount, updateMyAccount, getMyRole, getPreferences, updatePreferences } from '@/api/endpoints/account'
import { ChangeAccountDTO, PreferencesDTO } from '@/schemas/account'
import useAuthStore from '@/store/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetMyRole = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getMyRole'],
    queryFn: () => queryCall(getMyRole, token),
  })
}

export const useGetMyProfile = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getMyProfile'],
    queryFn: () => queryCall(getMyAccount, token),
    enabled: !!token,
  })
}

export const useUpdateProfile = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ChangeAccountDTO) => mutationCall(updateMyAccount, data, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getMyProfile'] }),
  })
}

export const useGetPreferences = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getPreferences'],
    queryFn: () => queryCall(getPreferences, token),
    enabled: !!token,
  })
}

export const useUpdatePreferences = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: PreferencesDTO) => mutationCall(updatePreferences, data, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getPreferences'] }),
  })
}
