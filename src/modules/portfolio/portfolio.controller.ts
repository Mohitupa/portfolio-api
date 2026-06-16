import { Request, Response } from "express";
import * as portfolioService from "./portfolio.service";
import { PortfolioParams } from "./portfolio.types";

export const createPortfolio = async (
  req: Request,
  res: Response
) => {
  const portfolio =
    await portfolioService.createPortfolio(
      req.body
    );

  res.status(201).json({
    success: true,
    data: portfolio,
  });
};

export const getPortfolios = async (
  req: Request,
  res: Response
) => {
  const portfolios =
    await portfolioService.getPortfolios();

  res.status(200).json({
    success: true,
    data: portfolios,
  });
};

export const getPortfolioBySlug = async (
  req: Request<PortfolioParams>,
  res: Response
) => {
  const { slug } = req.params;

  const portfolio =
    await portfolioService.getPortfolioBySlug(
      slug
    );

  if (!portfolio) {
    return res.status(404).json({
      success: false,
      message: "Portfolio not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: portfolio,
  });
};
