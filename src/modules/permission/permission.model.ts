import { Schema, model } from "mongoose";
import { IPermission } from "./permission.types";

const permissionSchema =
  new Schema<IPermission>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      displayName: {
        type: String,
        required: true,
        trim: true,
      },

      module: {
        type: String,
        required: true,
        trim: true,
      },

      action: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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

permissionSchema.index(
  {
    module: 1,
    action: 1,
  }
);

export const PermissionModel =
  model<IPermission>(
    "Permission",
    permissionSchema
  );