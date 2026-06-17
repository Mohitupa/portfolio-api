export interface IMedia {
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
  createdAt?: Date;
  updatedAt?: Date;
}