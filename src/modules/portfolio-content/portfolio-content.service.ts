import { Types } from "mongoose";
import { PortfolioContentModel } from "./portfolio-content.model";
import { IPortfolioContent } from "./portfolio-content.types";
import Portfolio from "../portfolio/portfolio.model";

export class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}

export class ConflictException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConflictException";
    }
}

const createPortfolioContent = async (
    payload: Partial<IPortfolioContent>
) => {

    const portfolio = await Portfolio.findById(
        payload.portfolioId
    );

    if (!portfolio) {
        throw new NotFoundException(
            "Portfolio not found"
        );
    }

    const existingContent =
        await PortfolioContentModel.findOne({
            portfolioId: payload.portfolioId,
        });

    if (existingContent) {
        throw new ConflictException(
            "Portfolio content already exists"
        );
    }

    const result =
        await PortfolioContentModel.create(payload);

    return result;
};

const getPortfolioContentByPortfolioId =
    async (portfolioId: string) => {

        const result =
            await PortfolioContentModel.findOne({
                portfolioId,
            }).populate("portfolioId");

        if (!result) {
            throw new NotFoundException(
                "Portfolio content not found"
            );
        }

        return result;
    };


const updatePortfolioContent = async (
    portfolioId: string,
    payload: Partial<IPortfolioContent>
) => {

    const existingContent =
        await PortfolioContentModel.findOne({
            portfolioId,
        });

    if (!existingContent) {
        throw new NotFoundException(
            "Portfolio content not found"
        );
    }

    const result =
        await PortfolioContentModel.findOneAndUpdate(
            { portfolioId },
            payload,
            {
                new: true,
                runValidators: true,
            }
        );

    return result;
};

const getPublicPortfolioBySlug = async (
  slug: string
) => {

  const portfolio =
    await Portfolio.findOne({
      slug,
      isActive: true,
    });

  if (!portfolio) {
    throw new NotFoundException(
      "Portfolio not found"
    );
  }

  const content =
    await PortfolioContentModel.findOne({
      portfolioId: portfolio._id,
      isPublished: true,
    });

  if (!content) {
    throw new NotFoundException(
      "Portfolio content not published"
    );
  }

  return content;
};

const publishPortfolioContent = async (
  portfolioId: string
) => {

  const result =
    await PortfolioContentModel.findOneAndUpdate(
      { portfolioId },
      {
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        new: true,
      }
    );

  if (!result) {
    throw new NotFoundException(
      "Portfolio content not found"
    );
  }

  return result;
};

const unpublishPortfolioContent = async (
  portfolioId: string
) => {

  const result =
    await PortfolioContentModel.findOneAndUpdate(
      { portfolioId },
      {
        isPublished: false,
      },
      {
        new: true,
      }
    );

  if (!result) {
    throw new NotFoundException(
      "Portfolio content not found"
    );
  }

  return result;
};


export const PortfolioContentService = {
  createPortfolioContent,
  getPortfolioContentByPortfolioId,
  updatePortfolioContent,
  getPublicPortfolioBySlug,
  publishPortfolioContent,
  unpublishPortfolioContent
};