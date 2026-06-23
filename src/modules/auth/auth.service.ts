import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt";

import { AdminUserModel } from "../admin-user/admin-user.model";

const login = async (
  email: string,
  password: string
) => {

  const user =
    await AdminUserModel.findOne({
      email,
    }).select("+password");

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    createAccessToken(
      jwtPayload
    );

  const refreshToken =
    createRefreshToken(
      jwtPayload
    );

  return {
    accessToken,
    refreshToken,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshToken = async (
  token: string
) => {

  const decoded =
    verifyRefreshToken(
      token
    ) as {
      userId: string;
      email: string;
      role: string;
    };

  const user =
    await AdminUserModel.findById(
      decoded.userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const accessToken =
    createAccessToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

  return {
    accessToken,
  };
};

const getMe = async (
  userId: string
) => {

  const user =
    await AdminUserModel.findById(userId)
      .select("-password");

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return user;
};

const logout = async () => {
  return null;
};

export const AuthService = {
  login,
  getMe,
  refreshToken,
  logout,
};
