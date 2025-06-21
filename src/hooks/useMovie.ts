import { mutationCall, queryCall } from "@/api/apiCall"
import { deleteMovie, getMovieById, getMovies, publishMovie, updateMovie } from "@/api/endpoints/movie"
import { KEYS } from "@/api/keys"
import { MovieRequest } from "@/schemas/movies"
import useAuthStore from "@/store/auth"
import { Movie } from "@/schemas/movies"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetMovieById = (id: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getMovies,
    queryFn: () => queryCall(getMovieById(id), token),
  })
}

export const useGetMovies = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getMovies,
    queryFn: () => queryCall(getMovies, token),
  })
}

export const usePublishMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: MovieRequest) => mutationCall(publishMovie, data, token),
    mutationKey: KEYS.getMovies,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getMovies }),
  })
}

export const useUpdateMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MovieRequest }) => mutationCall(updateMovie(id), data, token),
    mutationKey: KEYS.getMovies,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getMovies }),
  })
}

export const useDeleteMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteMovie(id), undefined, token),
    mutationKey: KEYS.getMovies,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getMovies }),
  })
}