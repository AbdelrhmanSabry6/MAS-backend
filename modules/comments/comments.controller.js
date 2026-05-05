import * as commentsService from "./comments.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

// public
export const create = asyncHandler(async (req, res, next) => {
    const comment = await commentsService.createComment(req.body);
    res.status(201).json({
        success: true,
        data: comment
    });
});

// admin
export const getAll = asyncHandler(async (req, res, next) => {
    const comments = await commentsService.getComments(req.query);
    res.status(200).json({
        success: true,
        data: comments
    });
});

export const changeStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    const comment = await commentsService.updateStatus(
        req.params.id,
        status
    );

    res.status(200).json({
        success: true,
        data: comment
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const comment = await commentsService.deleteComment(req.params.id);
    res.status(200).json({
        success: true,
        data: comment
    });
});