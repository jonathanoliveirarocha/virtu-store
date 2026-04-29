import { z } from "zod";
import { urlSchema } from "./shared/urlSchema";

export const productSchema = z
  .object({
    id: z.union([z.string(), z.number()]).transform((v) => String(v)),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    image: urlSchema,
    category: z.string().optional()
  })

export type ProductInput = z.input<typeof productSchema>;
export type ProductOutput = z.output<typeof productSchema>;
