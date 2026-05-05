import * as appService from "./applications.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const apply = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "CV file is required",
        });
    }

    const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "mas/cvs",
        "raw"
    );

    data.cv = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        originalName: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    };

    const application = await appService.createApplication(data);

    res.status(201).json({
        success: true,
        data: application,
    });
});

export const getAll = asyncHandler(async (req, res, next) => {
    const apps = await appService.getApplications();
    res.status(200).json({
        success: true,
        data: apps
    });
});

export const getById = asyncHandler(async (req, res, next) => {
    const app = await appService.getApplicationById(req.params.id);
    res.status(200).json({
        success: true,
        data: app
    });
});

export const changeStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    const app = await appService.updateStatus(req.params.id, status);

    res.status(200).json({
        success: true,
        data: app
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const app = await appService.deleteApplication(req.params.id);
    res.status(200).json({
        success: true,
        data: app
    });
});