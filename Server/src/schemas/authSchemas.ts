import { z } from "zod";

const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(5).max(20).regex(/^[a-zA-Z0-9._@!?-]+$/),
        callback: z.string(),
    })
});

const registerWithoutPasswordSchema = z.object({
    body: z.object({
        email: z.string().email(),
        callback: z.string(),
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(5).max(20).regex(/^[a-zA-Z0-9._@!?-]+$/),
    })
});


export const registerClienteSchema = registerSchema.extend({
    body: registerSchema.shape.body.extend({
        nome: z.string(),
        cognome: z.string(),
        username: z.string(),
    })
})

export const registerAgenteSchema = registerWithoutPasswordSchema.extend({
    body: registerWithoutPasswordSchema.shape.body.extend({
        nome: z.string(),
        cognome: z.string(),
        biografia: z.string().optional(),
    })
})

export const registerSupportoSchema = registerWithoutPasswordSchema.extend({
    body: registerWithoutPasswordSchema.shape.body.extend({
        nome: z.string(),
        cognome: z.string(),
    })
})

export const registerGestoreSchema = registerWithoutPasswordSchema.extend({
    body: registerWithoutPasswordSchema.shape.body.extend({
        nome: z.string(),
        cognome: z.string(),
        AgenziaId: z.number().int(), 
    })
})

export type RegisterClienteBodyInput = z.infer<typeof registerClienteSchema.shape.body>;
export type RegisterAgenteBodyInput = z.infer<typeof registerAgenteSchema.shape.body>;
export type RegisterSupportoBodyInput = z.infer<typeof registerSupportoSchema.shape.body>;
export type RegisterGestoreBodyInput = z.infer<typeof registerGestoreSchema.shape.body>;

export type LoginBodyInput = z.infer<typeof loginSchema.shape.body>;