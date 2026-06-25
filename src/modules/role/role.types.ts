import { Document } from "mongoose";

export interface IRole extends Document {

  name: string;

  displayName: string;

  description: string;

  isSystem: boolean;

  sortOrder: number;

  createdAt?: Date;

  updatedAt?: Date;
}