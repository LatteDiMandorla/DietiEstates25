import { z } from "zod";

export const boundsSearchSchema = z.object({
  query: z.object({
    neLat: z.coerce.number(),
    neLon: z.coerce.number(),
    swLat: z.coerce.number(),
    swLon: z.coerce.number(),
  }),
});

export type BoundsSearchQueryInput = z.infer<typeof boundsSearchSchema.shape.query>;
