import * as PostsService from "./posts.service.js";
import Media from "../../databases/models/media.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createPost = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/posts");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.featuredImageAlt || req.file.originalname,
        });

        data.featuredImage = media._id;
    }

    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    if (req.body.tagIds) {
        data.tagIds =
            typeof req.body.tagIds === "string"
                ? JSON.parse(req.body.tagIds)
                : req.body.tagIds;
    }

    data.isPublished = data.isPublished === "true" || data.isPublished === true;

    if (data.isPublished && !data.publishedAt) {
        data.publishedAt = new Date();
    }

    const post = await PostsService.createPost(data);

    res.status(201).json({
        success: true,
        data: post
    });
});

export const deletePost = asyncHandler(async (req, res, next) => {
    const post = await PostsService.deletePost(req.params.id);
    res.status(200).json({
        success: true,
        data: post
    });
});

export const updatePost = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    // image upload to Media Library
    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/posts");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.featuredImageAlt || req.file.originalname,
        });

        data.featuredImage = media._id;
    }

    // seo
    if (req.body.seo) {
        data.seo =
            typeof req.body.seo === "string"
                ? JSON.parse(req.body.seo)
                : req.body.seo;
    }

    // tags
    if (req.body.tagIds) {
        data.tagIds =
            typeof req.body.tagIds === "string"
                ? JSON.parse(req.body.tagIds)
                : req.body.tagIds;
    }

    // boolean from form-data
    if (req.body.isPublished !== undefined) {
        data.isPublished =
            req.body.isPublished === "true" || req.body.isPublished === true;
    }

    // publish logic
    if (data.isPublished && !data.publishedAt) {
        data.publishedAt = new Date();
    }

    const post = await PostsService.updatePost(req.params.id, data);

    res.status(200).json({
        success: true,
        data: post
    });
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await PostsService.getAllPosts();
    res.status(200).json({
        success: true,
        data: posts
    });
});
