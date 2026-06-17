import { Router } from "express";

import { upload } from "../../config/multer";
import { auth } from "../../middlewares/auth";
import { MediaController } from "./media.controller";

const router = Router();

router.post(
  "/upload",
  auth("SUPER_ADMIN"),
  upload.single("file"),
  MediaController.uploadFile
);

router.get(
  "/",
  auth("SUPER_ADMIN"),
  MediaController.getAllMedia
);

router.get(
  "/:id",
  auth("SUPER_ADMIN"),
  MediaController.getMediaById
);

router.delete(
  "/:id",
  auth("SUPER_ADMIN"),
  MediaController.deleteMedia
);

export const MediaRoutes = router;