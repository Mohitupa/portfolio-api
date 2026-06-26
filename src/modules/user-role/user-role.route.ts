import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { UserRoleController } from "./user-role.controller";
import { UserRoleValidation } from "./user-role.validation";

const router = Router();

router.get(
  "/:userId",
  auth("user-role.read"),
  UserRoleController.getUserRoles
);

router.put(
  "/:userId",
  auth("user-role.update"),
  validateRequest(
    UserRoleValidation.assignRolesSchema
  ),
  UserRoleController.assignRoles
);

export const UserRoleRoutes = router;