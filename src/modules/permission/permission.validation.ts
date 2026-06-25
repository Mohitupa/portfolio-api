import { z } from "zod";

const createPermissionSchema = z.object({
  body: z.object({
    name: z.string().min(3),

    displayName: z.string().min(3),

    module: z.string().min(2),

    action: z.string().min(2),

    description: z.string().optional(),

    isSystem: z.boolean().optional(),

    sortOrder: z.number().optional(),
  }),
});

const updatePermissionSchema = z.object({
  body: z.object({
    displayName: z.string().optional(),

    description: z.string().optional(),

    sortOrder: z.number().optional(),
  }),
});

export const PermissionValidation = {
  createPermissionSchema,
  updatePermissionSchema,
};