import { z } from "zod"
import { GuitarCarSchema, GuitarSchema } from "../schemas"

export type Guitar = z.infer<typeof GuitarSchema>
export type GuitarCar = z.infer<typeof GuitarCarSchema>