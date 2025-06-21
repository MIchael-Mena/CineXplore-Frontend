import { mutationCall, queryCall } from "@/api/apiCall"
import { createActor, deleteActor, getActorById, getActors, updateActor } from "@/api/endpoints/actor"
import { KEYS } from "@/api/keys"
import { Actor } from "@/schemas/cast"
import useAuthStore from "@/store/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetActorById = (id: number) => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getActors,
    queryFn: () => queryCall(getActorById(id), token),
  })
}

export const useGetActors = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: KEYS.getActors,
    queryFn: () => queryCall(getActors, token),
  })
}

export const useCreateActor = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Actor) => mutationCall(createActor, data, token),
    mutationKey: KEYS.getActors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getActors }),
  })
}

export const useUpdateActor = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Actor }) => mutationCall(updateActor(id), data, token),
    mutationKey: KEYS.getActors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getActors }),
  })
}

export const useDeleteActor = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(deleteActor(id), undefined, token),
    mutationKey: KEYS.getActors,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEYS.getActors }),
  })
}