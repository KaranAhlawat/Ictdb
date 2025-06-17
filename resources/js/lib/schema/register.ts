import * as z from 'zod/v4-mini';

export const registerSchema = z
    .object({
        name: z.string().check(z.minLength(1, { message: 'The name field is required' })),
        email: z.string().check(z.email()),
        password: z
            .string()
            .check(z.minLength(1, { message: 'The password field is required' }), z.maxLength(20, { message: 'Maximum password length is 20' })),
        password_confirmation: z.string().check(z.minLength(1, { message: 'The password confirmation field is required' })),
    })
    .check(
        z.refine((data) => data.password === data.password_confirmation, {
            message: "Passwords don't match",
            path: ['password_confirmation'],
        }),
    );

export type RegisterSchema = z.infer<typeof registerSchema>;
