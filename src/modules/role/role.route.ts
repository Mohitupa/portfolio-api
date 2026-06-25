import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { RoleController } from "./role.controller";
import { RoleValidation } from "./role.validation";

const router = Router();

router.get(
  "/",
  auth("SUPER_ADMIN"),
  RoleController.getRoles
);

router.get(
  "/:id",
  auth("SUPER_ADMIN"),
  RoleController.getRole
);

router.post(
  "/",
  auth("SUPER_ADMIN"),
  validateRequest(
    RoleValidation.createRoleSchema
  ),
  RoleController.createRole
);

router.patch(
  "/:id",
  auth("SUPER_ADMIN"),
  validateRequest(
    RoleValidation.updateRoleSchema
  ),
  RoleController.updateRole
);

router.delete(
  "/:id",
  auth("SUPER_ADMIN"),
  RoleController.deleteRole
);

export const RoleRoutes = router;