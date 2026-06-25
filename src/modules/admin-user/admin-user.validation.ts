import { z } from "zod";

const roles = [
  "SUPER_ADMIN",
  "ADMIN",
] as const;

const createAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2),

    email: z.string().email(),

    password: z.string().min(8),

    role: z.enum(roles),

    isActive: z.boolean().optional(),
  }),
});

const updateAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),

    email: z.string().email().optional(),

    role: z.enum(roles).optional(),

    isActive: z.boolean().optional(),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    password: z.string().min(8),
  }),
});

export const AdminUserValidation = {
  createAdminSchema,
  updateAdminSchema,
  updateStatusSchema,
  changePasswordSchema,
};