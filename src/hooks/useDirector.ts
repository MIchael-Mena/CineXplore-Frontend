import { mutationCall, queryCall } from "@/api/apiCall"
import { createDirector, deleteDirector, getDirectorById, getDirectors, updateDirector } from "@/api/endpoints/director"
import { KEYS } from "@/api/keys"
import { Director } from "@/schemas/cast"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetDirectorById = (id: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getDirectors,
    queryFn: () => queryCall(getDirectorById(id), token),
  })
}

export const useGetDirectors = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getDirectors,
    queryFn: () => queryCall(getDirectors, token),
  })
}

export const useCreateDirector = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Director) => mutationCall(createDirector, data, token),
    mutationKey: KEYS.getDirectors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getDirectors }),
  })
}

export const useUpdateDirector = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Director }) => mutationCall(updateDirector(id), data, token),
    mutationKey: KEYS.getDirectors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getDirectors }),
  })
}

export const useDeleteDirector = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteDirector(id), undefined, token),
    mutationKey: KEYS.getDirectors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getDirectors }),
  })
}