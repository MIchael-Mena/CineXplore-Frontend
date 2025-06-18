import { z } from 'zod'

export const ProfesionalSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string(),
  conexionId: z.number().optional(),
  matriculaProfesional: z.string().optional(),
  solicitudEnviada: z.boolean().optional(),
})

export type Profesional = z.infer<typeof ProfesionalSchema>

export const GetProfesionalesResponseSchema = z.array(ProfesionalSchema)
export type GetProfesionalesResponse = z.infer<typeof GetProfesionalesResponseSchema>

const ConexionSchema = z.object({
  conexionId: z.number(),
  atletaId: z.number(),
  atletaNombre: z.string(),
  atletaApellido: z.string(),
  atletaEmail: z.string(),
  estado: z.enum(['PENDIENTE', 'ACEPTADA', 'RECHAZADA']),
})
export type Conexion = z.infer<typeof ConexionSchema>

export const GetConexionesResponseSchema = z.array(ConexionSchema)
export type GetConexionesResponse = z.infer<typeof GetConexionesResponseSchema>

// Esquema para un atleta
const AtletaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
})

// Esquema para un grupo de atletas
const GrupoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  atletas: z.array(AtletaSchema), // Lista de atletas
})

// Esquema para una lista de grupos
export const GruposResponseSchema = z.array(GrupoSchema)

// Tipos inferidos
export type Atleta = z.infer<typeof AtletaSchema>
export type Grupo = z.infer<typeof GrupoSchema>
export type GruposResponse = z.infer<typeof GruposResponseSchema>
