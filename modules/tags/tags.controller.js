import * as tagService from "./tags.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createTag = asyncHandler(async (req, res, next) => {
    const tag = await tagService.createTag(req.body);
    res.status(201).json({
        success: true,
        data: tag
    });
});

export const getAllTags = asyncHandler(async (req, res, next) => {
    const tags = await tagService.getAllTags();
    res.status(200).json({
        success: true,
        data: tags
    });
});

export const updateTag = asyncHandler(async (req, res, next) => {
    const tag = await tagService.updateTag(req.params.id, req.body);
    res.status(200).json({
        success: true,
        data: tag
    });
});

export const deleteTag = asyncHandler(async (req, res, next) => {
    const tag = await tagService.deleteTag(req.params.id);
    res.status(200).json({
        success: true,
        data: tag
    });
});
