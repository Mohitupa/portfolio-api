import { Document, Types } from "mongoose";

export interface IRolePermission
  extends Document {

  roleId: Types.ObjectId;

  permissionId: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}