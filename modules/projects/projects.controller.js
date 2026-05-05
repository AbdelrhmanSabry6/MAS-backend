import * as projectService from "./projects.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Media from "../../databases/models/media.model.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

const parseJsonField = (value) => {
    if (!value) return value;

    if (typeof value === "string") {
        return JSON.parse(value);
    }

    return value;
};

const createMediaFromFile = async (file, folder, altText) => {
    const uploaded = await uploadToCloudinary(file.buffer, folder, "image");

    const media = await Media.create({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        type: file.mimetype,
        size: file.size,
        width: uploaded.width,
        height: uploaded.height,
        alt: altText || file.originalname,
    });

    return {
        media,
        uploaded,
    };
};

export const createProject = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.files?.coverImage?.[0]) {
        const file = req.files.coverImage[0];

        const { media, uploaded } = await createMediaFromFile(
            file,
            "mas/projects",
            data.title || file.originalname
        );

        data.coverImageId = media._id;
        data.coverImage = uploaded.secure_url;
    }

    if (req.files?.gallery?.length) {
        const galleryIds = [];
        const galleryUrls = [];

        for (const file of req.files.gallery) {
            const { media, uploaded } = await createMediaFromFile(
                file,
                "mas/projects/gallery",
                data.title || file.originalname
            );

            galleryIds.push(media._id);
            galleryUrls.push(uploaded.secure_url);
        }

        data.galleryIds = galleryIds;
        data.gallery = galleryUrls;
    }

    if (req.body.gallery && !req.files?.gallery?.length) {
        data.gallery = parseJsonField(req.body.gallery);
    }

    if (req.body.galleryIds && !req.files?.gallery?.length) {
        data.galleryIds = parseJsonField(req.body.galleryIds);
    }

    if (req.body.seo) {
        data.seo = parseJsonField(req.body.seo);
    }

    const project = await projectService.createProject(data);

    res.status(201).json({
        success: true,
        data: project,
    });
});

export const updateProject = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.files?.coverImage?.[0]) {
        const file = req.files.coverImage[0];

        const { media, uploaded } = await createMediaFromFile(
            file,
            "mas/projects",
            data.title || file.originalname
        );

        data.coverImageId = media._id;
        data.coverImage = uploaded.secure_url;
    }

    if (req.files?.gallery?.length) {
        const galleryIds = [];
        const galleryUrls = [];

        for (const file of req.files.gallery) {
            const { media, uploaded } = await createMediaFromFile(
                file,
                "mas/projects/gallery",
                data.title || file.originalname
            );

            galleryIds.push(media._id);
            galleryUrls.push(uploaded.secure_url);
        }

        data.galleryIds = galleryIds;
        data.gallery = galleryUrls;
    }

    if (req.body.gallery && !req.files?.gallery?.length) {
        data.gallery = parseJsonField(req.body.gallery);
    }

    if (req.body.galleryIds && !req.files?.gallery?.length) {
        data.galleryIds = parseJsonField(req.body.galleryIds);
    }

    if (req.body.seo) {
        data.seo = parseJsonField(req.body.seo);
    }

    const project = await projectService.updateProject(req.params.id, data);

    res.status(200).json({
        success: true,
        data: project,
    });
});

export const getProjects = asyncHandler(async (req, res, next) => {
    const projects = await projectService.getProjects(req.query);

    res.status(200).json({
        success: true,
        data: projects,
    });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
    const project = await projectService.deleteProject(req.params.id);

    res.status(200).json({
        success: true,
        data: project,
    });
});