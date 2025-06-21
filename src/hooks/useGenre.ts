import { mutationCall, queryCall } from "@/api/apiCall"
import { createGenre, deleteGenre, getGenreById, getGenres, updateGenre } from "@/api/endpoints/genre"
import { KEYS } from "@/api/keys"
import { Genre } from "@/schemas/genre"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetGenreById = (id: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getGenres,
    queryFn: () => queryCall(getGenreById(id), token),
  })
}

export const useGetGenres = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getGenres,
    queryFn: () => queryCall(getGenres, token),
  })
}

export const useCreateGenre = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Genre) => mutationCall(createGenre, data, token),
    mutationKey: KEYS.getGenres,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getGenres }),
  })
}

export const useUpdateGenre = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Genre }) => mutationCall(updateGenre(id), data, token),
    mutationKey: KEYS.getGenres,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getGenres }),
  })
}

export const useDeleteGenre = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteGenre(id), undefined, token),
    mutationKey: KEYS.getGenres,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getGenres }),
  })
}