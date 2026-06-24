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
  auth("SUPER_ADMIN"),
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

router.delete(
  "/portfolios/:id",
  auth("SUPER_ADMIN"),
  portfolioController.deletePortfolio
);

export default router;