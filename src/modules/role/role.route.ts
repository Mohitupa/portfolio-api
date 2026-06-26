import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { RoleController } from "./role.controller";
import { RoleValidation } from "./role.validation";

const router = Router();

router.get(
  "/",
  auth("role.read"),
  RoleController.getRoles
);

router.get(
  "/:id",
  auth("role.read"),
  RoleController.getRole
);

router.post(
  "/",
  auth("role.create"),
  validateRequest(
    RoleValidation.createRoleSchema
  ),
  RoleController.createRole
);

router.patch(
  "/:id",
  auth("role.update"),
  validateRequest(
    RoleValidation.updateRoleSchema
  ),
  RoleController.updateRole
);

router.delete(
  "/:id",
  auth("role.delete"),
  RoleController.deleteRole
);

export const RoleRoutes = router;