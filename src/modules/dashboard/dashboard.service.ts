
import { PortfolioContentModel } from "../portfolio-content/portfolio-content.model";
import { AdminUserModel } from "../admin-user/admin-user.model";
import Portfolio from "../portfolio/portfolio.model";


const getDashboardStats = async () => {

  const totalPortfolios =
    await Portfolio.countDocuments();

  const activePortfolios =
    await Portfolio.countDocuments({
      isActive: true,
    });

  const publishedPortfolios =
    await PortfolioContentModel.countDocuments({
      isPublished: true,
    });

  const draftPortfolios =
    await PortfolioContentModel.countDocuments({
      isPublished: false,
    });

  const totalAdmins =
    await AdminUserModel.countDocuments({
      isActive: true,
    });

  return {
    totalPortfolios,
    activePortfolios,
    publishedPortfolios,
    draftPortfolios,
    totalAdmins,
  };
};

export const DashboardService = {
  getDashboardStats,
};