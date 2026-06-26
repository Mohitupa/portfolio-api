import { Router } from "express";

import * as portfolioController
  from "./portfolio.controller";

import validateRequest
  from "../../middlewares/validateRequest";

import {
  createPortfolioSchema,
} from "./portfolio.validation";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/portfolios",
  auth("portfolio.create"),
  validateRequest(createPortfolioSchema),
  portfolioController.createPortfolio
);

router.get(
  "/portfolios",
  portfolioController.getPortfolios
);

router.get(
  "/portfolios/:slug",
  portfolioController.getPortfolioBySlug
);

router.patch(
  "/portfolios/:id/status",
  auth("portfolio.update"),
  portfolioController.togglePortfolioStatus
);

router.delete(
  "/portfolios/:id",
  auth("portfolio.delete"),
  portfolioController.deletePortfolio
);

export default router;