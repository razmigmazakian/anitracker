import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Enter a valid email address." })),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." }),
});