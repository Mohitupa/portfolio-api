import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { RolePermissionController } from "./role-permission.controller";
import { RolePermissionValidation } from "./role-permission.validation";

const router = Router();

router.get(
  "/:roleId",
  auth("role-permission.read"),
  RolePermissionController.getRolePermissions
);

router.put(
  "/:roleId",
  auth("role-permission.update"),
  validateRequest(
    RolePermissionValidation.assignPermissionsSchema
  ),
  RolePermissionController.assignPermissions
);

export const RolePermissionRoutes =
  router;