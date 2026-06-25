import { Document } from "mongoose";

export interface IPermission extends Document {
  name: string;

  displayName: string;

  module: string;

  action: string;

  description?: string;

  isSystem: boolean;

  sortOrder: number;

  createdAt?: Date;

  updatedAt?: Date;
}