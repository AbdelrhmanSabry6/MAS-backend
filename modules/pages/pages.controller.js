import * as pageService from "./pages.service.js";
import Media from "../../databases/models/media.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createPage = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/media");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.heroImageAlt || req.file.originalname,
        });

        data.heroImage = media._id;
    }

    if (req.body.sections) {
        data.sections =
            typeof req.body.sections === "string"
                ? JSON.parse(req.body.sections)
                : req.body.sections;
    }

    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    const page = await pageService.createPage(data);

    res.status(201).json({
        success: true,
        data: page
    });
});


export const updatePage = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/media");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.heroImageAlt || req.file.originalname,
        });

        data.heroImage = media._id;
    }

    if (req.body.sections) {
        data.sections =
            typeof req.body.sections === "string"
                ? JSON.parse(req.body.sections)
                : req.body.sections;
    }

    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    const page = await pageService.updatePage(req.params.id, data);

    res.status(200).json({
        success: true,
        data: page
    });
});

export const deletePage = asyncHandler(async (req, res, next) => {
    const page = await pageService.deletePage(req.params.id);
    res.status(200).json({
        success: true,
        data: page
    });
});

export const getPage = asyncHandler(async (req, res, next) => {
    const page = await pageService.getPage(req.params.id);
    res.status(200).json({
        success: true,
        data: page
    });
});

export const getAllPages = asyncHandler(async (req, res, next) => {
    const pages = await pageService.getAllPages();
    res.status(200).json({
        success: true,
        data: pages
    });
});

