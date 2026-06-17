import { Schema, model } from "mongoose";
import { IAdminUser } from "./admin-user.types";

const adminUserSchema =
  new Schema<IAdminUser>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      role: {
        type: String,
        enum: [
          "SUPER_ADMIN",
          "ADMIN",
        ],
        default: "ADMIN",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const AdminUserModel =
  model<IAdminUser>(
    "AdminUser",
    adminUserSchema
  );