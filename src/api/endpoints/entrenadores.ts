import {
  Conexion,
  GetConexionesResponse,
  GetConexionesResponseSchema,
  GetProfesionalesResponse,
  GetProfesionalesResponseSchema,
  Profesional,
  ProfesionalSchema,
  GruposResponse,
  GruposResponseSchema,
} from '@/schemas/profesional'

import {
  CreateRutinaDTO,
  RutinasResponse,
  RutinasResponseSchema,
  UpdateRutinaInput,
} from '@/schemas/rutinas'

import { Mutation, Query } from '../types'
import { KEYS } from '../keys'
import { z } from 'zod'
import env from '@/environment/loader'
import { NutrientesRecomendadosArrayResponse, NutrientesRecomendadosArraySchema, RegistroComidasResumenArrayResponse, RegistroComidasResumenArraySchema } from '@/schemas/objetivos'
import { PesoHistorialResponse, PesoHistorialResponseSchema } from '@/schemas/peso'

// Obtener lista de entrenadores
export const getEntrenadores: Query<GetProfesionalesResponse, Profesional[]> = {
  key: KEYS.getEntrenadores,
  authenticated: true,
  method: 'GET',
  endpoint: '/entrenadores',
  validateResponse: GetProfesionalesResponseSchema,
  parseResponse: response => response,
}

// Enviar solicitud a entrenador
export const connectEntrenador = (id: number): Mutation<void, void> => ({
  key: KEYS.getEntrenadores,
  authenticated: true,
  method: 'POST',
  endpoint: '/conexiones-entrenador/enviar?entrenadorId=' + id,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Obtener conexiones del entrenador
export const getConexionesEntrenador: Query<GetConexionesResponse, Conexion[]> = {
  key: KEYS.getConexiones,
  authenticated: true,
  method: 'GET',
  endpoint: '/entrenadores/conexiones',
  validateResponse: GetConexionesResponseSchema,
  parseResponse: response => response,
}

// Aceptar/Rechazar conexión
export const patchConexionEntrenador = (id: number, estado: 'ACEPTADA' | 'RECHAZADA'): Mutation<void, void> => ({
  key: KEYS.getConexiones,
  authenticated: true,
  method: 'PATCH',
  endpoint: `/conexiones-entrenador/responder?conexionId=${id}&estado=${estado}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Obtener el entrenador asignado al atleta
export const getMiEntrenador = async (token: string): Promise<Profesional | null> => {
  const response = await fetch(env.apiUrl + 'atletas/entrenador', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error(`Failed to fetch entrenador: ${response.status}`)
  if (response.status === 204) return null

  const data = await response.json()
  return ProfesionalSchema.parse(data)
}

// Crear grupo de entrenamiento
export const crearGrupoEntrenador = (nombre: string): Mutation<void, void, number[]> => ({
  key: ['crearGrupoEntrenador'],
  authenticated: true,
  method: 'POST',
  endpoint: `/grupos-entrenador/crear?nombre=${nombre}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Obtener grupos
export const getGruposEntrenador: Query<GruposResponse, GruposResponse> = {
  key: ['getGruposEntrenador'],
  authenticated: true,
  method: 'GET',
  endpoint: '/grupos-entrenador',
  validateResponse: GruposResponseSchema,
  parseResponse: response => response,
}

// Eliminar grupo
export const eliminarGrupoEntrenador = (id: number): Mutation<void> => ({
  key: ['eliminarGrupoEntrenador'],
  authenticated: true,
  method: 'DELETE',
  endpoint: `/grupos-entrenador/eliminar?grupoId=${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Asignar rutina a atleta
export const asignarRutinaAtleta = (id: number): Mutation<void, void, CreateRutinaDTO> => ({
  key: ['getRutinas'],
  authenticated: true,
  method: 'POST',
  endpoint: `/entrenadores/asignar-rutina?atletaId=${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Asignar rutina a grupo
export const asignarRutinaGrupo = (id: number): Mutation<void, void, CreateRutinaDTO> => ({
  key: ['getRutinas'],
  authenticated: true,
  method: 'POST',
  endpoint: `/grupos-entrenador/asignar-rutina?grupoId=${id}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

// Obtener rutinas de atleta
export const getRutinasAtleta = (id: number): Query<RutinasResponse, RutinasResponse> => ({
  key: ['getRutinas'],
  authenticated: true,
  method: 'GET',
  endpoint: `/entrenadores/rutinas?atletaId=${id}`,
  validateResponse: RutinasResponseSchema,
  parseResponse: response => response,
})

//  Eliminar conexión con un atleta (unificado con entrenadores y atletas)
export const eliminarConexionEntrenador = (conexionId: number): Mutation<void> => ({
  key: KEYS.getConexiones,
  authenticated: true,
  method: 'DELETE',
  endpoint: `/conexiones-entrenador/eliminar?conexionId=${conexionId}`,
  validateResponse: z.void(),
  parseResponse: res => res,
})

export const modificarRutinaAtleta = (rutinaId: number, atletaId: number): Mutation<void, void, UpdateRutinaInput> => ({
  key: ['getRutinas'],
  authenticated: true,
  method: 'PATCH',
  endpoint: `/entrenadores/rutinas/${rutinaId}?atletaId=${atletaId}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

export const eliminarRutinaAtleta = (rutinaId: number, atletaId: number): Mutation<void> => ({
  key: KEYS.getRutina,
  authenticated: true,
  method: 'DELETE',
  endpoint: `/entrenadores/rutinas/${rutinaId}?atletaId=${atletaId}`,
  validateResponse: z.void(),
  parseResponse: response => response,
})

export const getNutrientesRecomendadosEntreFechasAtleta = (atletaId: number, fechaMin: string, fechaMax: string): Query<NutrientesRecomendadosArrayResponse> => ({
  key: ['getNutrientesRecomendadosEntreFechasAtleta', fechaMin, fechaMax],
  authenticated: true,
  method: 'GET',
  endpoint: `/entrenadores/atleta/recomendaciones-nutricionales?atletaId=${atletaId}&fechaMin=${fechaMin}&fechaMax=${fechaMax}`,
  validateResponse: NutrientesRecomendadosArraySchema,
  parseResponse: response => NutrientesRecomendadosArraySchema.parse(response),
})

export const getRegistroComidasEntreFechasResumenAtleta = (atletaId: number, fechaMin: string, fechaMax: string): Query<RegistroComidasResumenArrayResponse> => ({
  key: ['getRegistroComidasEntreFechasResumenAtleta', fechaMin, fechaMax],
  authenticated: true,
  method: 'GET',
  endpoint: `/entrenadores/atleta/registro-comidas-historial?atletaId=${atletaId}&fechaMin=${fechaMin}&fechaMax=${fechaMax}`,
  validateResponse: RegistroComidasResumenArraySchema,
  parseResponse: response => RegistroComidasResumenArraySchema.parse(response),
})

export const getPesoHistorialAtleta = (atletaId: number, fechaMin: string, fechaMax: string): Query<PesoHistorialResponse> => ({
  key: ['getPesoHistorialAtleta'],
  authenticated: true,
  method: 'GET',
  endpoint: `/entrenadores/atleta/peso?atletaId=${atletaId}&fechaMin=${fechaMin}&fechaMax=${fechaMax}`,
  validateResponse: PesoHistorialResponseSchema,
  parseResponse: response => PesoHistorialResponseSchema.parse(response),
})