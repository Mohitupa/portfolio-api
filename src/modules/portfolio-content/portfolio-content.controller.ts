import { Request, Response } from "express";
import { PortfolioContentService } from "./portfolio-content.service";
import { catchAsync } from "../../utils/catchAsync";


const createPortfolioContent = catchAsync(
  async (req, res) => {
    const result =
      await PortfolioContentService.createPortfolioContent(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Portfolio content created successfully",
      data: result,
    });
  }
);

const getPortfolioContent = catchAsync(
  async (req, res) => {
     const portfolioId = req.params.portfolioId as string;

    const result =
      await PortfolioContentService.getPortfolioContentByPortfolioId(
        portfolioId
      );

    res.status(200).json({
      success: true,
      message: "Portfolio content retrieved successfully",
      data: result,
    });
  }
);

const updatePortfolioContent = catchAsync(
  async (req, res) => {
     const portfolioId = req.params.portfolioId as string;

    const result =
      await PortfolioContentService.updatePortfolioContent(
        portfolioId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Portfolio content updated successfully",
      data: result,
    });
  }
);

const getPublicPortfolio = catchAsync(
  async (req, res) => {

    const slug =
      req.params.slug as string;

    const result =
      await PortfolioContentService.getPublicPortfolioBySlug(
        slug
      );

    res.status(200).json({
      success: true,
      message:
        "Portfolio retrieved successfully",
      data: result,
    });
  }
);


export const PortfolioContentController = {
  createPortfolioContent,
  getPortfolioContent,
  updatePortfolioContent,
  getPublicPortfolio,
};