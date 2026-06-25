import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { UserRoleController } from "./user-role.controller";
import { UserRoleValidation } from "./user-role.validation";

const router = Router();

router.get(
  "/:userId",
  auth("SUPER_ADMIN"),
  UserRoleController.getUserRoles
);

router.put(
  "/:userId",
  auth("SUPER_ADMIN"),
  validateRequest(
    UserRoleValidation.assignRolesSchema
  ),
  UserRoleController.assignRoles
);

export const UserRoleRoutes = router;