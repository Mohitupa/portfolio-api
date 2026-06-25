import { Schema, model } from "mongoose";
import { IAdminUser } from "./admin-user.types";

const adminUserSchema =
  new Schema<IAdminUser>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
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

      permissions: {
        type: [String],
        default: [],
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      lastLogin: {
        type: Date,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "AdminUser",
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