export interface IMedia {
  originalName: string;
  fileName: string;
  filePath: string;
  publicId: string;
  mimeType: string;
  size: number;
  createdAt?: Date;
  updatedAt?: Date;
}