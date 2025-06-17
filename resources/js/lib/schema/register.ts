import { z } from "zod";

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string()
})

export type RegisterSchema = z.infer<typeof registerSchema>
