import { DashboardService } from "./dashboard.service";
import { catchAsync } from "../../utils/catchAsync";

const getDashboardStats = catchAsync(
  async (req, res) => {

    const result =
      await DashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      message:
        "Dashboard statistics retrieved successfully",
      data: result,
    });
  }
);

export const DashboardController = {
  getDashboardStats,
};