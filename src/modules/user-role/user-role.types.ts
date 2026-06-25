import { Document, Types } from "mongoose";

export interface IUserRole extends Document {

  userId: Types.ObjectId;

  roleId: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}