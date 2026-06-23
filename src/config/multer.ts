import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "portfolio-cms",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  }),
});

export const upload = multer({
  storage,
});