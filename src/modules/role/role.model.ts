import { Schema, model } from "mongoose";
import { IRole } from "./role.types";

const roleSchema =
  new Schema<IRole>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
      },

      displayName: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      isSystem: {
        type: Boolean,
        default: false,
      },

      sortOrder: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export const RoleModel =
  model<IRole>(
    "Role",
    roleSchema
  );