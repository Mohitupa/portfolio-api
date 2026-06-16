// portfolio-content.routes.ts
import { Router } from "express";
import {
  createPortfolioContent,
  getPortfolioContentByPortfolioId,
  updatePortfolioContent,
  updateSection,
  publishPortfolioContent,
  unpublishPortfolioContent,
  getPublicPortfolioBySlug,
} from "./portfolio-content.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createPortfolioContentSchema,
  getPortfolioContentSchema,
  updatePortfolioContentSchema,
  updateSectionSchema,
  publishPortfolioContentSchema,
  getPublicPortfolioBySlugSchema,
} from "./portfolio-content.validation";

// ── Admin routes  /api/admin/portfolio-content ────────────────
export const portfolioContentAdminRouter = Router();

portfolioContentAdminRouter.post(
  "/:portfolioId",
  validateRequest(createPortfolioContentSchema),
  createPortfolioContent
);

portfolioContentAdminRouter.get(
  "/:portfolioId",
  validateRequest(getPortfolioContentSchema),
  getPortfolioContentByPortfolioId
);

portfolioContentAdminRouter.patch(
  "/:portfolioId",
  validateRequest(updatePortfolioContentSchema),
  updatePortfolioContent
);

portfolioContentAdminRouter.patch(
  "/:portfolioId/section/:section",
  validateRequest(updateSectionSchema),
  updateSection
);

portfolioContentAdminRouter.patch(
  "/:portfolioId/publish",
  validateRequest(publishPortfolioContentSchema),
  publishPortfolioContent
);

portfolioContentAdminRouter.patch(
  "/:portfolioId/unpublish",
  validateRequest(publishPortfolioContentSchema),
  unpublishPortfolioContent
);

// ── Public routes  /api/public/portfolios ─────────────────────
export const portfolioContentPublicRouter = Router();

portfolioContentPublicRouter.get(
  "/:slug",
  validateRequest(getPublicPortfolioBySlugSchema),
  getPublicPortfolioBySlug
);
