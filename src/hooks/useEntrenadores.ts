import { mutationCall, queryCall } from '@/api/apiCall'
import {
  connectEntrenador,
  getConexionesEntrenador,
  getEntrenadores,
  getMiEntrenador,
  patchConexionEntrenador,
  crearGrupoEntrenador,
  getGruposEntrenador,
  eliminarGrupoEntrenador,
  asignarRutinaAtleta,
  asignarRutinaGrupo,
  getRutinasAtleta,
  modificarRutinaAtleta,
  eliminarRutinaAtleta,
  getNutrientesRecomendadosEntreFechasAtleta,
  getRegistroComidasEntreFechasResumenAtleta,
  getPesoHistorialAtleta,
} from '@/api/endpoints/entrenadores'
import {
  CreateRutinaDTO,
  UpdateRutinaInput,
} from '@/schemas/rutinas'
import useAuthStore from '@/store/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetEntrenadores = () => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getEntrenadores'],
    queryFn: () => queryCall(getEntrenadores, token),
  })
}

export const useConectarEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['conectarEntrenador'],
    mutationFn: (id: number) => mutationCall(connectEntrenador(id), undefined, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getEntrenadores'] }),
  })
}

export const useGetConexionesEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getConexiones'],
    queryFn: () => queryCall(getConexionesEntrenador, token),
  })
}

export const usePatchConexionEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['patchConexion'],
    mutationFn: (params: { id: number; estado: 'ACEPTADA' | 'RECHAZADA' }) =>
      mutationCall(patchConexionEntrenador(params.id, params.estado), undefined, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getConexiones'] }),
  })
}

export const useGetMiEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getMiEntrenador'],
    queryFn: () => getMiEntrenador(token),
  })
}

export const useCrearGrupoEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['crearGrupoEntrenador'],
    mutationFn: ({ nombre, ids }: { nombre: string; ids: number[] }) =>
      mutationCall(crearGrupoEntrenador(nombre), ids, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getGruposEntrenador'] }),
  })
}

export const useGetGruposEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getGruposEntrenador'],
    queryFn: () => queryCall(getGruposEntrenador, token),
  })
}

export const useDeleteGrupoEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(eliminarGrupoEntrenador(id), undefined, token),
    mutationKey: ['getGruposEntrenador'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getGruposEntrenador'] }),
  })
}

export const useAsignarRutinaAtleta = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['asignarRutina'],
    mutationFn: ({ id, rutina }: { id: number; rutina: CreateRutinaDTO }) =>
      mutationCall(asignarRutinaAtleta(id), rutina, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asignarRutina'] }),
  })
}

export const useAsignarRutinaGrupo = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['asignarRutina'],
    mutationFn: ({ id, rutina }: { id: number; rutina: CreateRutinaDTO }) =>
      mutationCall(asignarRutinaGrupo(id), rutina, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asignarRutina'] }),
  })
}

export const useGetRutinas = (id: number) => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getRutinas'],
    queryFn: () => queryCall(getRutinasAtleta(id), token),
  })
}
import { eliminarConexionEntrenador } from '@/api/endpoints/entrenadores'

export const useEliminarConexionEntrenador = () => {
  const token = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mutationCall(eliminarConexionEntrenador(id), undefined, token),
    mutationKey: ['eliminarConexionEntrenador'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getConexiones'] })
      queryClient.invalidateQueries({ queryKey: ['getMiEntrenador'] })
    },
  })
}

export const useModificarRutinaAtleta = () => {
  const token: string = useAuthStore(state => state.token) ?? ''
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ rutinaId, atletaId, data }: { rutinaId: number; atletaId: number; data: UpdateRutinaInput }) =>
      mutationCall(modificarRutinaAtleta(rutinaId, atletaId), data, token),
    mutationKey: ['getRutinas'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getRutinas'] }),
  })
}

export const useDeleteRutinaAtleta = () => {
   const token = useAuthStore(state => state.token) ?? ''
   const queryClient = useQueryClient()
   return useMutation({
     mutationFn: ({ rutinaId, atletaId }: { rutinaId: number; atletaId: number }) =>
       mutationCall(eliminarRutinaAtleta(rutinaId, atletaId), undefined, token),
     mutationKey: ['getRutinas'],
     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getRutinas'] }),
   })
}

export const useGetNutrientesRecomendadosEntreFechasAtleta = (atletaId: number, fechaMin: string, fechaMax: string) => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getNutrientesRecomendadosEntreFechasAtleta', atletaId, fechaMin, fechaMax],
    queryFn: () => queryCall(getNutrientesRecomendadosEntreFechasAtleta(atletaId, fechaMin, fechaMax), token),
  })
}

export const useGetRegistroComidasEntreFechasResumenAtleta = (atletaId: number, fechaMin: string, fechaMax: string) => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getRegistroComidasEntreFechasResumenAtleta', fechaMin, fechaMax],
    queryFn: () => queryCall(getRegistroComidasEntreFechasResumenAtleta(atletaId, fechaMin, fechaMax), token),
  })
}

export const useGetPesoHistorialAtleta = (atletaId: number, fechaMin: string, fechaMax: string) => {
  const token = useAuthStore(state => state.token) ?? ''
  return useQuery({
    queryKey: ['getPesoHistorialAtleta', atletaId, fechaMin, fechaMax],
    queryFn: () => queryCall(getPesoHistorialAtleta(atletaId, fechaMin, fechaMax), token),
  })
}