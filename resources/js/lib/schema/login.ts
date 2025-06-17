import * as z from 'zod/v4-mini';

export const loginSchema = z.object({
    email: z.string().check(z.email({ error: 'Invalid email' })),
    password: z.string().check(z.minLength(1, { message: 'The password field is required' })),
});

export type LoginSchema = z.infer<typeof loginSchema>;
