import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt";

import { AdminUserModel } from "../admin-user/admin-user.model";
import { getUserRolesAndPermissions } from "../../utils/auth.utils";

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

  const {

    roles,

    permissions

  } =
    await getUserRolesAndPermissions(
      user._id.toString()
    );

  const jwtPayload = {

    userId: user._id,

    email: user.email,

    roles,

    permissions,
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

      roles,

      permissions,
    }
  };
};

const refreshToken = async (
  token: string
) => {

  const decoded =
    verifyRefreshToken(token) as {
      userId: string;
      email: string;
      roles: string[];
      permissions: string[];
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

  const {
    roles,
    permissions,
  } =
    await getUserRolesAndPermissions(
      user._id.toString()
    );

  const accessToken =
    createAccessToken({
      userId: user._id,
      email: user.email,
      roles,
      permissions,
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

  const {
    roles,
    permissions,
  } =
    await getUserRolesAndPermissions(
      user._id.toString()
    );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    roles,
    permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
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
