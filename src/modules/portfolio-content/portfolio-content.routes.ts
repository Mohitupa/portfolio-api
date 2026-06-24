import { Router } from "express";
import { PortfolioContentController } from "./portfolio-content.controller";
import { PortfolioContentValidation } from "./portfolio-content.validation";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth("SUPER_ADMIN"),
  validateRequest(
    PortfolioContentValidation.createPortfolioContentSchema
  ),
  PortfolioContentController.createPortfolioContent
);

router.get(
  "/:portfolioId/edit",
  PortfolioContentController.getPortfolioContent
);

router.get(
  "/:slug",
  PortfolioContentController.getPublicPortfolio
);

router.patch(
  "/:portfolioId",
  auth("SUPER_ADMIN"),
  validateRequest(
    PortfolioContentValidation.updatePortfolioContentSchema
  ),
  PortfolioContentController.updatePortfolioContent
);

router.patch(
  "/:portfolioId/publish",
  auth("SUPER_ADMIN"),
  PortfolioContentController.publishPortfolioContent
);

router.patch(
  "/:portfolioId/unpublish",
  auth("SUPER_ADMIN"),
  PortfolioContentController.unpublishPortfolioContent
);

export const PortfolioContentRoutes = router;