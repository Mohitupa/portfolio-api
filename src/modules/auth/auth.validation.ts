import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1),
  }),
});

export const AuthValidation = {
  loginSchema,
};