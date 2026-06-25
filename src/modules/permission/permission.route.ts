import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { PermissionController } from "./permission.controller";
import { PermissionValidation } from "./permission.validation";

const router = Router();

router.get(
  "/",
  auth("SUPER_ADMIN"),
  PermissionController.getPermissions
);

router.get(
  "/:id",
  auth("SUPER_ADMIN"),
  PermissionController.getPermission
);

router.post(
  "/",
  auth("SUPER_ADMIN"),
  validateRequest(
    PermissionValidation.createPermissionSchema
  ),
  PermissionController.createPermission
);

router.patch(
  "/:id",
  auth("SUPER_ADMIN"),
  validateRequest(
    PermissionValidation.updatePermissionSchema
  ),
  PermissionController.updatePermission
);

router.delete(
  "/:id",
  auth("SUPER_ADMIN"),
  PermissionController.deletePermission
);

export const PermissionRoutes = router;