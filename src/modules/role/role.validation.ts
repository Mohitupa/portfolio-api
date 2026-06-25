import { z } from "zod";

const createRoleSchema =
  z.object({
    body: z.object({

      name:
        z.string()
          .min(2),

      displayName:
        z.string()
          .min(2),

      description:
        z.string()
          .optional(),

      sortOrder:
        z.number()
          .optional(),

      isSystem:
        z.boolean()
          .optional(),
    }),
  });

const updateRoleSchema =
  z.object({
    body: z.object({

      displayName:
        z.string()
          .optional(),

      description:
        z.string()
          .optional(),

      sortOrder:
        z.number()
          .optional(),
    }),
  });

export const RoleValidation = {
  createRoleSchema,
  updateRoleSchema,
};