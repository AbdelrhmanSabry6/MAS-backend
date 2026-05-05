import * as mediaService from "./media.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";

export const uploadMedia = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        throw new AppError("No image file provided", 400);
    }

    const media = await mediaService.createMedia(req.file, req.body.alt);

    res.status(201).json({
        success: true,
        data: media
    });
});

export const getAllMedia = asyncHandler(async (req, res, next) => {
    const media = await mediaService.getAllMedia(req.query.search);
    res.status(200).json({
        success: true,
        data: media
    });
});

export const deleteMedia = asyncHandler(async (req, res, next) => {
    const media = await mediaService.deleteMedia(req.params.id);
    res.status(200).json({
        success: true,
        message: "Media deleted",
        data: media
    });
});