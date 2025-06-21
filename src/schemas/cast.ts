import z from "zod";
import { MovieSchema } from "./movies";

export const MemberOfTheFilmSchema = z.object({
    fullName: z.string(),
    birthDate: z.date(),
    movies: z.array(MovieSchema)
})

export type Director = z.infer<typeof MemberOfTheFilmSchema>

export type Actor = z.infer<typeof MemberOfTheFilmSchema>

export const GetMembersResponseSchema = z.array(MemberOfTheFilmSchema)
export type GetDirectorsResponse = z.infer<typeof GetMembersResponseSchema>

export type GetActorsResponse = z.infer<typeof GetMembersResponseSchema>
