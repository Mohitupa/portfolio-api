import bcrypt from "bcrypt";
import { Types } from "mongoose";

import { AdminUserModel } from "./admin-user.model";
import { IAdminUser } from "./admin-user.types";

export class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ConflictException extends Error {
    constructor(message: string) {
        super(message);
    }
}

const createAdminUser = async (
    payload: Partial<IAdminUser>,
    currentUserId: string
) => {

    const existing =
        await AdminUserModel.findOne({
            email: payload.email,
        });

    if (existing) {
        throw new ConflictException(
            "Email already exists"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            payload.password!,
            10
        );

    return await AdminUserModel.create({
        ...payload,
        password: hashedPassword,
        createdBy: new Types.ObjectId(
            currentUserId
        ),
    });
};

const getAdminUsers = async () => {

    return await AdminUserModel
        .find()
        .select("-password")
        .sort({
            createdAt: -1,
        });

};

const getAdminUserById = async (
    id: string
) => {

    const user =
        await AdminUserModel
            .findById(id)
            .select("-password");

    if (!user) {
        throw new NotFoundException(
            "Admin user not found"
        );
    }

    return user;
};

const updateAdminUser = async (
    id: string,
    payload: Partial<IAdminUser>
) => {

    const existing =
        await AdminUserModel.findById(id);

    if (!existing) {
        throw new NotFoundException(
            "Admin user not found"
        );
    }

    if (
        payload.email &&
        payload.email !== existing.email
    ) {

        const emailExists =
            await AdminUserModel.findOne({
                email: payload.email,
            });

        if (emailExists) {
            throw new ConflictException(
                "Email already exists"
            );
        }
    }

    return await AdminUserModel
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true,
            }
        )
        .select("-password");

};

const updateAdminStatus = async (
    id: string,
    isActive: boolean,
    currentUserId: string
) => {

    if (id === currentUserId) {
        throw new Error(
            "You cannot deactivate yourself."
        );
    }

    return await updateAdminUser(
        id,
        {
            isActive,
        }
    );
};

const changePassword = async (
  id: string,
  password: string
) => {

  const user =
    await AdminUserModel.findById(id);

  if (!user) {
    throw new NotFoundException(
      "Admin user not found"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  user.password =
    hashedPassword;

  await user.save();

  return null;
};

const deleteAdminUser = async (
  id: string,
  currentUserId: string
) => {

  if (id === currentUserId) {
    throw new Error(
      "You cannot delete yourself."
    );
  }

  const user =
    await AdminUserModel.findById(id);

  if (!user) {
    throw new NotFoundException(
      "Admin user not found"
    );
  }

  if (
    user.role === "SUPER_ADMIN"
  ) {

    const count =
      await AdminUserModel.countDocuments({
        role: "SUPER_ADMIN",
      });

    if (count <= 1) {
      throw new Error(
        "At least one SUPER_ADMIN must exist."
      );
    }
  }

  await AdminUserModel.findByIdAndDelete(
    id
  );

  return null;
};

export const AdminUserService = {
  createAdminUser,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
  updateAdminStatus,
  changePassword,
  deleteAdminUser,
};