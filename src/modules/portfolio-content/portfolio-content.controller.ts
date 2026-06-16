import { Request, Response, NextFunction } from "express";
import { PortfolioContentService } from "./portfolio-content.service";
import {
  portfolioContentSectionSchemas,
} from "./portfolio-content.validation";

const service = new PortfolioContentService();

const ok       = (res: Response, data: unknown)         => res.status(200).json({ success: true, data });
const created  = (res: Response, data: unknown)         => res.status(201).json({ success: true, data });
const fail     = (next: NextFunction, err: unknown)     => next(err);

type SectionKey = keyof typeof portfolioContentSectionSchemas;

/**
 * POST /api/admin/portfolio-content/:portfolioId
 * Create a blank content document linked to a portfolio
 */
export async function createPortfolioContent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.createPortfolioContent(req.params.portfolioId);
    created(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * GET /api/admin/portfolio-content/:portfolioId
 * Fetch full content for a portfolio (admin)
 */
export async function getPortfolioContentByPortfolioId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.getPortfolioContentByPortfolioId(req.params.portfolioId);
    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * PATCH /api/admin/portfolio-content/:portfolioId
 * Bulk-update multiple fields at once (admin)
 */
export async function updatePortfolioContent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.updatePortfolioContent(req.params.portfolioId, req.body);
    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * PATCH /api/admin/portfolio-content/:portfolioId/section/:section
 * Update a single named section (admin)
 * Body must contain a top-level key matching :section
 *
 * e.g. PATCH /portfolio-content/abc123/section/hero
 *      Body: { "hero": { "name": "John", ... } }
 */
export async function updateSection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const section = req.params.section as SectionKey;
    const rawSectionData = req.body[section];

    if (rawSectionData === undefined) {
      res.status(400).json({
        success: false,
        message: `Request body must contain a "${section}" key`,
      });
      return;
    }

    const sectionData = portfolioContentSectionSchemas[section].parse(rawSectionData);

    const data = await service.updateSection(
      req.params.portfolioId,
      section,
      sectionData
    );

    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * PATCH /api/admin/portfolio-content/:portfolioId/publish
 * Publish a portfolio (sets isPublished = true)
 */
export async function publishPortfolioContent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.publishPortfolioContent(req.params.portfolioId);
    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * PATCH /api/admin/portfolio-content/:portfolioId/unpublish
 * Unpublish a portfolio (sets isPublished = false)
 */
export async function unpublishPortfolioContent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.unpublishPortfolioContent(req.params.portfolioId);
    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}

/**
 * GET /api/public/portfolios/:slug
 * Public endpoint — fetch published portfolio by slug
 */
export async function getPublicPortfolioBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await service.getPublicPortfolioBySlug(req.params.slug);
    ok(res, data);
  } catch (err) {
    fail(next, err);
  }
}
