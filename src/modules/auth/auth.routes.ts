import { Router } from "express";

import { AuthController } from "./auth.controller";
import validateRequest  from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { auth } from "../../middlewares/auth";
import { authLimiter } from "../../middlewares/authRateLimiter";

const router = Router();

router.post(
  "/login",
  authLimiter,
  validateRequest(
    AuthValidation.loginSchema
  ),
  AuthController.login
);

router.post(
  "/refresh-token",
  AuthController.refreshToken
);

router.post(
  "/logout",
  AuthController.logout
);

router.get(
  "/me",
  auth(
    "SUPER_ADMIN",
    "ADMIN"
  ),
  AuthController.getMe
);

export const AuthRoutes = router;