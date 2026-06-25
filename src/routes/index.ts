import { Router } from "express";

import portfolioRoutes
from "../modules/portfolio/portfolio.routes";
import { PortfolioContentRoutes } from "../modules/portfolio-content/portfolio-content.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { ContactMessageRoutes } from "../modules/contact-message/contact-message.routes";
import { AdminUserRoutes } from "../modules/admin-user/admin-user.routes";

const router = Router();

router.get("/test", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});

router.use(portfolioRoutes);
router.use(
  "/portfolio-content",
  PortfolioContentRoutes
);

router.use(
  "/auth",
  AuthRoutes
);

router.use(
  "/dashboard",
  DashboardRoutes
);

router.use(
  "/admin-users",
  AdminUserRoutes
);

router.use(
  "/media",
  MediaRoutes
);

router.use(
  "/",
  ContactMessageRoutes
);

export default router;
