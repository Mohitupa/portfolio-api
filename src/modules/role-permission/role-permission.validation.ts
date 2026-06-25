import { z } from "zod";

const assignPermissionsSchema =
  z.object({

    body:

      z.object({

        permissionIds:

          z.array(
            z.string()
          )

      })

  });

export const RolePermissionValidation = {
  assignPermissionsSchema,
};