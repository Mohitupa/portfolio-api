import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

import { AdminUserController } from "./admin-user.controller";
import { AdminUserValidation } from "./admin-user.validation";

const router = Router();

router.get(
  "/",
  auth("admin.read"),
  AdminUserController.getAdminUsers
);

router.get(
  "/:id",
  auth("admin.read"),
  AdminUserController.getAdminUser
);

router.post(
  "/",
  auth("admin.create"),
  validateRequest(
    AdminUserValidation.createAdminSchema
  ),
  AdminUserController.createAdminUser
);

router.patch(
  "/:id",
  auth("admin.update"),
  validateRequest(
    AdminUserValidation.updateAdminSchema
  ),
  AdminUserController.updateAdminUser
);

router.patch(
  "/:id/status",
  auth("admin.status"),
  validateRequest(
    AdminUserValidation.updateStatusSchema
  ),
  AdminUserController.updateAdminStatus
);

router.patch(
  "/:id/password",
  auth("admin.password"),
  validateRequest(
    AdminUserValidation.changePasswordSchema
  ),
  AdminUserController.changePassword
);

router.delete(
  "/:id",
  auth("admin.delete"),
  AdminUserController.deleteAdminUser
);

export const AdminUserRoutes = router;