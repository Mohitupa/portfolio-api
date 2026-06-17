import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AdminUserModel } from "../admin-user/admin-user.model";
import config from "../../config";

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

  const token =
    jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
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

export const AuthService = {
  login,
  getMe,
};
