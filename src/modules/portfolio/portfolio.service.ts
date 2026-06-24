import { PortfolioContentModel } from "../portfolio-content/portfolio-content.model";
import Portfolio from "./portfolio.model";

export const createPortfolio = async (
  payload: {
    name: string;
    slug: string;
  }
) => {
  return Portfolio.create(payload);
};

export const getPortfolios = async () => {
  return Portfolio.find();
};

export const getPortfolioBySlug = async (
  slug: string
) => {
  return Portfolio.findOne({
    slug,
    isActive: true,
  });
};

export const deletePortfolio = async (
  portfolioId: string
) => {

  const portfolio =
    await Portfolio.findById(
      portfolioId
    );

  if (!portfolio) {
    throw new Error(
      "Portfolio not found"
    );
  }

  await PortfolioContentModel.deleteOne({
    portfolioId,
  });

  await Portfolio.findByIdAndDelete(
    portfolioId
  );

  return null;
};