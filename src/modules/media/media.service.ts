import fs from "fs/promises";
import { MediaModel } from "./media.model";
import cloudinary from "../../config/cloudinary";

const createMedia = async (
    file: any
) => {

    return await MediaModel.create({
        originalName: file.originalname,
        fileName: file.filename,
        filePath: file.path,
        publicId: file.filename,
        mimeType: file.mimetype,
        size: file.size,
    });

};

const getAllMedia = async () => {

    return await MediaModel
        .find()
        .sort({
            createdAt: -1,
        });
};

const getMediaById = async (
    mediaId: string
) => {

    const media =
        await MediaModel.findById(
            mediaId
        );

    if (!media) {
        throw new Error(
            "Media not found"
        );
    }

    return media;
};

const deleteMedia = async (
    mediaId: string
) => {

    const media =
        await MediaModel.findById(
            mediaId
        );

    if (!media) {
        throw new Error(
            "Media not found"
        );
    }

    await cloudinary.uploader.destroy(
        media.publicId
    );

    await MediaModel.findByIdAndDelete(
        mediaId
    );

    return null;
};

export const MediaService = {
    createMedia,
    getAllMedia,
    getMediaById,
    deleteMedia,
};