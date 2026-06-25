import { Schema, model } from "mongoose";
import { IRolePermission } from "./role-permission.types";

const rolePermissionSchema =
  new Schema<IRolePermission>(
    {
      roleId: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },

      permissionId: {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

rolePermissionSchema.index(
  {
    roleId: 1,
    permissionId: 1,
  },
  {
    unique: true,
  }
);

export const RolePermissionModel =
  model<IRolePermission>(
    "RolePermission",
    rolePermissionSchema
  );