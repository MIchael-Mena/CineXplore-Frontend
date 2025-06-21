import z from "zod";
import { MovieSchema } from "@schemas/movies";

export const GenreSchema = z.object({
  name: z.string(),
  movies: z.array(MovieSchema),
})

export type Genre = z.infer<typeof GenreSchema>

export const GetGenresResponseSchema = z.array(GenreSchema)
export type GetGenresResponse = z.infer<typeof GetGenresResponseSchema>
