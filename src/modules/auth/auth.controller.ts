import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import config from "../../config";

const login = catchAsync(
  async (req, res) => {

    const { email, password } =
      req.body;

    const result =
      await AuthService.login(
        email,
        password
      );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,

        secure:
          config.nodeEnv ===
          "production",

        sameSite: "strict",

        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    res.status(200).json({
      success: true,

      message:
        "Login successful",

      data: {
        accessToken:
          result.accessToken,

        user:
          result.user,
      },
    });
  }
);

const refreshToken = catchAsync(
  async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message:
          "Refresh token not found",
      });
      return;
    }

    const result =
      await AuthService.refreshToken(
        refreshToken
      );

    res.status(200).json({
      success: true,
      message:
        "Token refreshed successfully",
      data: result,
    });
  }
);

const getMe = catchAsync(
  async (req, res) => {

    const result =
      await AuthService.getMe(
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  }
);

const logout = catchAsync(
  async (req, res) => {

    res.clearCookie(
      "refreshToken",
      {
        httpOnly: true,

        secure:
          config.nodeEnv ===
          "production",

        sameSite:
          "strict",
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });
  }
);

export const AuthController = {
  login,
  getMe,
  refreshToken,
  logout,
};