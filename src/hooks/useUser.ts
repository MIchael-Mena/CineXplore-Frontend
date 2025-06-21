import { mutationCall, queryCall } from "@/api/apiCall"
import { deleteUser, getUserById, getUsers, updateUser } from "@/api/endpoints/user"
import { KEYS } from "@/api/keys"
import { ChangeUserDTO } from "@/schemas/user"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetUserById = (id: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getUsers,
    queryFn: () => queryCall(getUserById(id), token),
  })
}

export const useGetUsers = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getUsers,
    queryFn: () => queryCall(getUsers, token),
  })
}

export const useUpdateUser = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ChangeUserDTO }) => mutationCall(updateUser(id), data, token),
    mutationKey: KEYS.getUsers,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getUsers }),
  })
}

export const useDeleteUser = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteUser(id), undefined, token),
    mutationKey: KEYS.getUsers,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getUsers }),
  })
}