import { mutationCall, queryCall } from "@/api/apiCall"
import { addComment, deleteComment, editComment, getCommentsByMovie, getCommentsByUser } from "@/api/endpoints/comment"
import { KEYS } from "@/api/keys"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetCommentsByUser = (userId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getComments,
    queryFn: () => queryCall(getCommentsByUser(userId), token),
  })
}

export const useGetCommentsByMovie = (movieId: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getComments,
    queryFn: () => queryCall(getCommentsByMovie(movieId), token),
  })
}

export const useAddComment = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, movieId, data }: { userId: number; movieId: number; data: string }) => mutationCall(addComment(userId, movieId), data, token),
    mutationKey: KEYS.getComments,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getComments }),
  })
}

export const useUpdateComment = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: string }) => mutationCall(editComment(userId), data, token),
    mutationKey: KEYS.getComments,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getComments }),
  })
}

export const useDeleteComment = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteComment(id), undefined, token),
    mutationKey: KEYS.getComments,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getComments }),
  })
}