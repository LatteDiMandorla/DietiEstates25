import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        username: z.string(),
        nome: z.string(),
        cognome: z.string(),
        email: z.string().email(),
        password: z.string().min(5).max(20).regex(/^[a-zA-Z0-9._@!?-]+$/),
    })
});

export type RegisterBodyInput = z.infer<typeof registerSchema.shape.body>;
