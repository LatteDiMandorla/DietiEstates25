import { z } from "zod";

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
    timestamp: z.coerce.date().optional(),
  }),
});

export type PaginationQueryInput = z.infer<typeof paginationSchema.shape.query>;