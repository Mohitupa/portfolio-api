import { Document, Types } from "mongoose";

export type AdminRole =
  | "SUPER_ADMIN"
  | "ADMIN";

export interface IAdminUser extends Document {
  name: string;

  email: string;

  password: string;

  role: AdminRole;

  permissions: string[];

  isActive: boolean;

  lastLogin?: Date;

  createdBy?: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}