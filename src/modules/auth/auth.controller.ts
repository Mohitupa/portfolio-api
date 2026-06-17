import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

const login = catchAsync(
  async (req, res) => {

    const { email, password } =
      req.body;

    const result =
      await AuthService.login(
        email,
        password
      );

    res.status(200).json({
      success: true,
      message:
        "Login successful",
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

export const AuthController = {
  login,
  getMe
};