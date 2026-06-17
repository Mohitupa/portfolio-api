import { Document } from "mongoose";

export type AdminRole =
  | "SUPER_ADMIN"
  | "ADMIN";

export interface IAdminUser extends Document {
  name: string;

  email: string;

  password: string;

  role: AdminRole;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}