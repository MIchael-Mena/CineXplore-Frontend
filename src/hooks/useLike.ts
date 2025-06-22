import { mutationCall, queryCall } from "@/api/apiCall"
import { getLikesByMovie, getLikesByUser, likeMovie, unlikeMovie } from "@/api/endpoints/like"
import { KEYS } from "@/api/keys"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetLikesByUser = (userId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getLikes,
    queryFn: () => queryCall(getLikesByUser(userId), token),
  })
}

export const useGetLikesByMovie = (movieId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getLikes,
    queryFn: () => queryCall(getLikesByMovie(movieId), token),
  })
}

export const useLikeMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, movieId }: { userId: number; movieId: number }) => mutationCall(likeMovie(userId, movieId), undefined, token),
    mutationKey: KEYS.getLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getLikes }),
  })
}

export const useUnlikeMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, movieId }: { userId: number; movieId: number }) => mutationCall(unlikeMovie(userId, movieId), undefined, token),
    mutationKey: KEYS.getLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getLikes }),
  })
}