import { Router } from "express";

import { upload } from "../../config/multer";
import { auth } from "../../middlewares/auth";
import { MediaController } from "./media.controller";

const router = Router();

router.post(
  "/upload",
  auth("media.upload"),
  upload.single("file"),
  MediaController.uploadFile
);

router.get(
  "/",
  auth("media.read"),
  MediaController.getAllMedia
);

router.get(
  "/:id",
  auth("media.read"),
  MediaController.getMediaById
);

router.delete(
  "/:id",
  auth("media.delete"),
  MediaController.deleteMedia
);

export const MediaRoutes = router;