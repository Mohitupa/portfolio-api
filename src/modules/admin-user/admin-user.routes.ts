import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

import { AdminUserController } from "./admin-user.controller";
import { AdminUserValidation } from "./admin-user.validation";

const router = Router();

router.get(
  "/",
  auth("SUPER_ADMIN"),
  AdminUserController.getAdminUsers
);

router.get(
  "/:id",
  auth("SUPER_ADMIN"),
  AdminUserController.getAdminUser
);

router.post(
  "/",
  auth("SUPER_ADMIN"),
  validateRequest(
    AdminUserValidation.createAdminSchema
  ),
  AdminUserController.createAdminUser
);

router.patch(
  "/:id",
  auth("SUPER_ADMIN"),
  validateRequest(
    AdminUserValidation.updateAdminSchema
  ),
  AdminUserController.updateAdminUser
);

router.patch(
  "/:id/status",
  auth("SUPER_ADMIN"),
  validateRequest(
    AdminUserValidation.updateStatusSchema
  ),
  AdminUserController.updateAdminStatus
);

router.patch(
  "/:id/password",
  auth("SUPER_ADMIN"),
  validateRequest(
    AdminUserValidation.changePasswordSchema
  ),
  AdminUserController.changePassword
);

router.delete(
  "/:id",
  auth("SUPER_ADMIN"),
  AdminUserController.deleteAdminUser
);

export const AdminUserRoutes = router;