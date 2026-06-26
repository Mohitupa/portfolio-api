import { Router } from "express";

import { DashboardController } from "./dashboard.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get(
  "/stats",
  auth("dashboard.read"),
  DashboardController.getDashboardStats
);

export const DashboardRoutes = router;