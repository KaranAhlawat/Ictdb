import * as z from 'zod/v4-mini';

export const talkSchema = z.object({
    title: z.string().check(z.minLength(3)),
    link: z.url(),
    description: z.optional(z.string()),
    speaker: z.optional(z.string()),
    tags: z.array(z.object({ value: z.string() })),
});

export type TalkSchema = z.infer<typeof talkSchema>;
