import { Router } from "express";

import { DashboardController } from "./dashboard.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get(
  "/stats",
  auth("SUPER_ADMIN"),
  DashboardController.getDashboardStats
);

export const DashboardRoutes = router;