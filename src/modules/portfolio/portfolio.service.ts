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