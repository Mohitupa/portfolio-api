import { Schema, model } from "mongoose";
import { IUserRole } from "./user-role.types";

const userRoleSchema =
  new Schema<IUserRole>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "AdminUser",
        required: true,
      },

      roleId: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

userRoleSchema.index(
  {
    userId: 1,
    roleId: 1,
  },
  {
    unique: true,
  }
);

export const UserRoleModel =
  model<IUserRole>(
    "UserRole",
    userRoleSchema
  );