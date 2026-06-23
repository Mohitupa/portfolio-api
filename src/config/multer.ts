import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf =
      file.mimetype === "application/pdf";

    return {
      folder: "portfolio-cms",
      resource_type: isPdf
        ? "raw"
        : "image",
    };
  },
});

export const upload = multer({
  storage,
});