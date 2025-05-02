import { z } from "zod";

export const GuitarSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number()
})

export const GuitarCarSchema = GuitarSchema.extend({
  quantity: z.number()
});