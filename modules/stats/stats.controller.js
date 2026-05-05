import * as statsService from "./stats.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

// CREATE
export const createStat = asyncHandler(async (req, res, next) => {
    const stat = await statsService.createStat(req.body);
    res.status(201).json({
        success: true,
        data: stat
    });
});

// GET ALL
export const getStats = asyncHandler(async (req, res, next) => {
    const stats = await statsService.getStats();
    res.status(200).json({
        success: true,
        data: stats
    });
});

// UPDATE
export const updateStat = asyncHandler(async (req, res, next) => {
    const stat = await statsService.updateStat(req.params.id, req.body);
    res.status(200).json({
        success: true,
        data: stat
    });
});

// DELETE
export const deleteStat = asyncHandler(async (req, res, next) => {
    const stat = await statsService.deleteStat(req.params.id);
    res.status(200).json({
        success: true,
        data: stat
    });
});