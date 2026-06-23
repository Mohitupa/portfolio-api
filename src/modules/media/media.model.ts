import { Schema, model } from "mongoose";
import { IMedia } from "./media.types";

const mediaSchema = new Schema<IMedia>(
  {
    originalName: String,
    fileName: String,
    filePath: String,
    publicId: String,
    mimeType: String,
    size: Number,
  },
  {
    timestamps: true,
  }
);

export const MediaModel =
  model<IMedia>(
    "Media",
    mediaSchema
  );