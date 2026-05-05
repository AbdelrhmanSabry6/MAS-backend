import * as ServicesService from "./services.service.js";
import Media from "../../databases/models/media.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createService = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/services");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.coverImageAlt || req.file.originalname,
        });

        data.coverImage = media._id;
    }

    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    if (req.body.published !== undefined) {
        data.published =
            req.body.published === "true" || req.body.published === true;
    }

    if (req.body.featured !== undefined) {
        data.featured =
            req.body.featured === "true" || req.body.featured === true;
    }

    const service = await ServicesService.createService(data);

    res.status(201).json({
        success: true,
        data: service
    });
});

export const updateService = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/services");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.coverImageAlt || req.file.originalname,
        });

        data.coverImage = media._id;
    }

    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    if (req.body.published !== undefined) {
        data.published =
            req.body.published === "true" || req.body.published === true;
    }

    if (req.body.featured !== undefined) {
        data.featured =
            req.body.featured === "true" || req.body.featured === true;
    }

    const service = await ServicesService.updateService(req.params.id, data);

    res.status(200).json({
        success: true,
        data: service
    });
});

export const deleteService = asyncHandler(async (req, res, next) => {
    const service = await ServicesService.deleteService(req.params.id);

    res.status(200).json({
        success: true,
        data: service
    });
});

export const getAllServices = asyncHandler(async (req, res, next) => {
    const services = await ServicesService.getAllServices();

    res.status(200).json({
        success: true,
        data: services
    });
});