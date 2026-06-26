import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { PermissionController } from "./permission.controller";
import { PermissionValidation } from "./permission.validation";

const router = Router();

router.get(
  "/",
  auth("permission.read"),
  PermissionController.getPermissions
);

router.get(
  "/:id",
  auth("permission.read"),
  PermissionController.getPermission
);

router.post(
  "/",
  auth("permission.create"),
  validateRequest(
    PermissionValidation.createPermissionSchema
  ),
  PermissionController.createPermission
);

router.patch(
  "/:id",
  auth("permission.update"),
  validateRequest(
    PermissionValidation.updatePermissionSchema
  ),
  PermissionController.updatePermission
);

router.delete(
  "/:id",
  auth("permission.delete"),
  PermissionController.deletePermission
);

export const PermissionRoutes = router;