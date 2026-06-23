import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { MediaService } from "./media.service";

const uploadFile =
  catchAsync(async (req, res) => {
    console.log("------------");
    

    const result =
      await MediaService.createMedia(
        req.file!
      );

    res.status(201).json({
      success: true,
      message:
        "File uploaded successfully",
      data: result,
    });
  });

const getAllMedia =
  catchAsync(async (req, res) => {

    const result =
      await MediaService.getAllMedia();

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const getMediaById =
  catchAsync(async (req, res) => {

    const result =
      await MediaService.getMediaById(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const deleteMedia =
  catchAsync(async (req, res) => {

    await MediaService.deleteMedia(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message:
        "Media deleted successfully",
    });
  });

export const MediaController = {
  uploadFile,
  getAllMedia,
  getMediaById,
  deleteMedia,
};