import { z } from "zod";

const assignRolesSchema =
  z.object({

    body:

      z.object({

        roleIds:

          z.array(
            z.string()
          )

      })

  });

export const UserRoleValidation = {
  assignRolesSchema,
};