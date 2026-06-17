import { Router } from "express";

import portfolioRoutes
from "../modules/portfolio/portfolio.routes";
import { PortfolioContentRoutes } from "../modules/portfolio-content/portfolio-content.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

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

export default router;
