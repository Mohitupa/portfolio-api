import { Router } from "express";
import { PortfolioContentController } from "./portfolio-content.controller";
import { PortfolioContentValidation } from "./portfolio-content.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  validateRequest(
    PortfolioContentValidation.createPortfolioContentSchema
  ),
  PortfolioContentController.createPortfolioContent
);

router.get(
  "/:slug",
  PortfolioContentController.getPublicPortfolio
);

router.patch(
  "/:portfolioId",
  validateRequest(
    PortfolioContentValidation.updatePortfolioContentSchema
  ),
  PortfolioContentController.updatePortfolioContent
);

export const PortfolioContentRoutes = router;