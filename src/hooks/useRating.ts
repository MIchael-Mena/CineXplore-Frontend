import { mutationCall, queryCall } from "@/api/apiCall"
import { deleteRating, getRatingsByMovie, getRatingsByUser, rateMovie } from "@/api/endpoints/rating"
import { KEYS } from "@/api/keys"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetRatingsByUser = (userId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getRatings,
    queryFn: () => queryCall(getRatingsByUser(userId), token),
  })
}

export const useGetRatingsByMovie = (movieId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getRatings,
    queryFn: () => queryCall(getRatingsByMovie(movieId), token),
  })
}

export const useRateMovie = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, movieId, rating }: { userId: number; movieId: number; rating: number }) => mutationCall(rateMovie(userId, movieId, rating), undefined, token),
    mutationKey: KEYS.getRatings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getRatings }),
  })
}

export const useDeleteRating = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, movieId }: { userId: number; movieId: number }) => mutationCall(deleteRating(userId, movieId), undefined, token),
    mutationKey: KEYS.getRatings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getRatings }),
  })
}
